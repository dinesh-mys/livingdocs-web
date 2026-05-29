export const config = { runtime: 'edge' };

async function neonQuery(connectionString, query) {
  const url = new URL(connectionString);
  const res = await fetch(`https://${url.hostname}/sql`, {
    method: 'POST',
    headers: {
      'Neon-Connection-String': connectionString,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, params: [] }),
  });
  return res.json();
}

export default async function handler(req) {
  const url = new URL(req.url);
  const token = req.headers.get('x-admin-token') || url.searchParams.get('token');

  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return new Response('Unauthorized', { status: 401 });
  }

  const connectionString = process.env.DATABASE_URL;

  const data = await neonQuery(connectionString,
    `SELECT ts, ip, country, city, page, referrer, ua
     FROM visits
     ORDER BY ts DESC
     LIMIT 5000`);

  const visits = (data.rows || []).map(r => ({
    ts: Number(r.ts),
    ip: r.ip,
    country: r.country,
    city: r.city,
    page: r.page,
    referrer: r.referrer,
    ua: r.ua,
  }));

  // Product funnel: distinct installs per event. Tolerates a missing events table.
  let funnel = { first_run: 0, mcp_started: 0, index_success: 0, upsell_shown: 0 };
  try {
    const funnelData = await neonQuery(connectionString,
      `SELECT event, COUNT(DISTINCT install_id) AS installs
       FROM events
       GROUP BY event`);
    for (const r of funnelData.rows || []) {
      if (r.event in funnel) funnel[r.event] = Number(r.installs);
    }
  } catch {}

  return new Response(JSON.stringify({ visits, funnel }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}
