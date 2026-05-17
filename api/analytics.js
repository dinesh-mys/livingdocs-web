export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);
  const token = req.headers.get('x-admin-token') || url.searchParams.get('token');

  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return new Response('Unauthorized', { status: 401 });
  }

  const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
  const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!REDIS_URL || !REDIS_TOKEN) {
    return new Response(JSON.stringify({ visits: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const res = await fetch(`${REDIS_URL}/lrange/ld:visits/0/4999`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
  const data = await res.json();

  const visits = (data.result || [])
    .map(v => { try { return JSON.parse(v); } catch { return null; } })
    .filter(Boolean);

  return new Response(JSON.stringify({ visits }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}
