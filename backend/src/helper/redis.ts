import Redis from "ioredis"

let redisClient: Redis | null = null;

function connectToRedis(): Redis {
    if (!redisClient) {
      redisClient = new Redis({
        host: process.env.REDIS_HOST, 
        port: parseInt(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      });
      console.log("Connected to Redis!");
    }
    return redisClient;
  }

export async function storeData<T> (key: string,value: T,ex:number = 3600){
    const redisConnection :Redis = connectToRedis()
    await redisConnection.set(key, JSON.stringify(value),"EX", ex);
}

export async function getData<T> (key: string): Promise<string>{
    const redisConnection :Redis = connectToRedis()
    const storedValue = await redisConnection.get(key);
    return storedValue;
}

export async function forgetData<T> (key: string): Promise<void>{
  const redisConnection :Redis = connectToRedis();
  redisConnection.unlink(key);
}

export async function extend(key:string): Promise<void>{
  const redisConnection :Redis = connectToRedis();
  redisConnection.expire(key,3600);
}

export async function exists (key: string): Promise<number>{
    const redisConnection :Redis = connectToRedis()
    const exists: number = await redisConnection.exists(key);
    return exists;
}