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

  // Skip obvious bots
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

  const visit = JSON.stringify({
    ts: Date.now(),
    ip,
    country,
    city: decodeURIComponent(city),
    page,
    referrer,
    ua,
  });

  const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
  const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (REDIS_URL && REDIS_TOKEN) {
    await fetch(`${REDIS_URL}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        ['LPUSH', 'ld:visits', visit],
        ['LTRIM', 'ld:visits', '0', '4999'],
      ]),
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...cors },
  });
}
