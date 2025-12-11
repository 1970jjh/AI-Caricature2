import type { VercelRequest, VercelResponse } from '@vercel/node';

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '6749467';

async function setUnlockStatus(hours: number = 8): Promise<boolean> {
  if (!KV_URL || !KV_TOKEN) {
    return false;
  }

  try {
    const value = JSON.stringify({
      unlocked: true,
      expiresAt: Date.now() + hours * 60 * 60 * 1000
    });

    const response = await fetch(`${KV_URL}/set/app_unlocked/${encodeURIComponent(value)}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
    });

    return response.ok;
  } catch {
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password, hours = 8 } = req.body || {};

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const success = await setUnlockStatus(hours);

  if (success) {
    return res.status(200).json({ success: true, message: `Unlocked for ${hours} hours` });
  } else {
    return res.status(500).json({ error: 'KV not configured' });
  }
}
