// eslint-disable-next-line import/no-named-as-default
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL || '');
export default redis;
