export const config = { runtime: 'edge' };

export default async function handler(req) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') return new Response(null, { status: 200, headers: cors });
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  const ip = (req.headers.get('x-forwarded-for')?.split(',')[0] || '').trim() || 'unknown';
  const country = req.headers.get('x-vercel-ip-country') || '';
  const city = req.headers.get('x-vercel-ip-city') || '';
  const ua = req.headers.get('user-agent') || '';

  if (/bot|crawler|spider|headless|preview|lighthouse|pingdom/i.test(ua)) {
    return new Response(JSON.stringify({ ok: true, skipped: true }), { status: 200, headers: cors });
  }

  let page = '/';
  let referrer = '';
  try {
    const body = await req.json();
    page = body.page || '/';
    referrer = body.referrer || '';
  } catch {}

  const dbUrl = new URL(process.env.DATABASE_URL);

  await fetch(`https://${dbUrl.hostname}/sql`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${dbUrl.password}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `INSERT INTO visits (ts, ip, country, city, page, referrer, ua)
              VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      params: [Date.now(), ip, country, decodeURIComponent(city), page, referrer, ua],
    }),
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...cors },
  });
}
