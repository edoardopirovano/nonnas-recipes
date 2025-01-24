import Redis from "ioredis";

interface Stats {
  totalRecipes: number;
  totalViews: number;
  visitorCount: number;
}

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

export const getCachedStats = async (): Promise<Stats | null> => {
  const cachedStats = await redis.get("stats-" + process.env.NODE_ENV);
  return cachedStats ? JSON.parse(cachedStats) : null;
};

export const setCachedStats = async (stats: Stats) => {
  await redis.set(
    "stats-" + process.env.NODE_ENV,
    JSON.stringify(stats),
    "EX",
    60 * 60 * 24
  );
};

export default redis;
