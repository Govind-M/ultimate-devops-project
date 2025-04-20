// import type { NextApiRequest, NextApiResponse } from 'next'
// import Redis from 'ioredis'

// const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const count = await redis.incr('page_visits')
//   res.status(200).json({ visits: count })
// }


import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const client = createClient({
  url: redisUrl,
});

client.connect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const key = 'page_visits';

  try {
    const count = await client.incr(key);
    res.status(200).json({ count });
  } catch (err) {
    console.error('Redis error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
