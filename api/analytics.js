export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);
  const token = req.headers.get('x-admin-token') || url.searchParams.get('token');

  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return new Response('Unauthorized', { status: 401 });
  }

  const db = process.env.DATABASE_URL;
  const dbUrl = new URL(db);

  const res = await fetch(`https://${dbUrl.hostname}/sql`, {
    method: 'POST',
    headers: {
      'Neon-Connection-String': db,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `SELECT ts, ip, country, city, page, referrer, ua
              FROM visits ORDER BY ts DESC LIMIT 5000`,
      params: [],
    }),
  });

  const data = await res.json();
  const visits = (data.rows || []).map(r => ({
    ts: Number(r.ts),
    ip: r.ip, country: r.country, city: r.city,
    page: r.page, referrer: r.referrer, ua: r.ua,
  }));

  return new Response(JSON.stringify({ visits }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}
