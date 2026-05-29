export const config = { runtime: 'edge' };

const KNOWN_EVENTS = new Set([
  'first_run',
  'mcp_started',
  'index_success',
  'upsell_shown',
]);

async function neonQuery(hostname, password, query, params = []) {
  const res = await fetch(`https://${hostname}/sql`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${password}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, params }),
  });
  return res.json();
}

export default async function handler(req) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') return new Response(null, { status: 200, headers: cors });
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  const ua = req.headers.get('user-agent') || '';
  if (/bot|crawler|spider|headless|preview|lighthouse|pingdom/i.test(ua)) {
    return new Response(JSON.stringify({ ok: true, skipped: true }), { status: 200, headers: cors });
  }

  let body = {};
  try { body = await req.json(); } catch {}

  const event = body.event;
  if (!KNOWN_EVENTS.has(event)) {
    return new Response(JSON.stringify({ ok: true, skipped: true }), { status: 200, headers: cors });
  }

  const country = req.headers.get('x-vercel-ip-country') || '';
  const city = req.headers.get('x-vercel-ip-city') || '';
  const installId = typeof body.installId === 'string' ? body.installId.slice(0, 64) : '';
  const version = typeof body.version === 'string' ? body.version.slice(0, 32) : '';
  const os = typeof body.os === 'string' ? body.os.slice(0, 16) : '';
  const ts = Number.isFinite(body.ts) ? body.ts : Date.now();
  const props = body.props && typeof body.props === 'object' ? body.props : {};

  const dbUrl = new URL(process.env.DATABASE_URL);
  const hostname = dbUrl.hostname;
  const password = decodeURIComponent(dbUrl.password);

  await neonQuery(hostname, password, `
    CREATE TABLE IF NOT EXISTS events (
      id bigserial PRIMARY KEY,
      ts bigint NOT NULL,
      event text NOT NULL,
      install_id text,
      version text,
      os text,
      props jsonb,
      country text,
      city text,
      ua text,
      created_at timestamptz DEFAULT now()
    )
  `);

  await neonQuery(hostname, password,
    `INSERT INTO events (ts, event, install_id, version, os, props, country, city, ua)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [ts, event, installId, version, os, JSON.stringify(props), country, decodeURIComponent(city), ua]
  );

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...cors },
  });
}
