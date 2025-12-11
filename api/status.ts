import type { VercelRequest, VercelResponse } from '@vercel/node';

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

async function getUnlockStatus(): Promise<{ unlocked: boolean; expiresAt: number | null }> {
  if (!KV_URL || !KV_TOKEN) {
    return { unlocked: false, expiresAt: null };
  }

  try {
    const response = await fetch(`${KV_URL}/get/app_unlocked`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
    });
    const data = await response.json();

    if (data.result) {
      const parsed = JSON.parse(data.result);
      if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
        return { unlocked: false, expiresAt: null };
      }
      return { unlocked: true, expiresAt: parsed.expiresAt };
    }
    return { unlocked: false, expiresAt: null };
  } catch {
    return { unlocked: false, expiresAt: null };
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const status = await getUnlockStatus();
  return res.status(200).json(status);
}
