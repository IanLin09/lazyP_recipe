import Redis from "ioredis"

let redisClient: Redis | null = null;

function connectToRedis(): Redis {
    if (!redisClient) {
      redisClient = new Redis({
        host: process.env.REDIS_HOST, 
        port: parseInt(process.env.REDIS_PORT),
        password: "ian123",
      });
      console.log("Connected to Redis!");
    }
    return redisClient;
  }

export async function storeData<T> (key: string,value: T,ex:number = 300){
    const redisConnection :Redis = connectToRedis()
    await redisConnection.set(key, JSON.stringify(value),"EX", ex);
}

export async function getData<T> (key: string): Promise<string>{
    const redisConnection :Redis = connectToRedis()
    const storedValue = await redisConnection.get(key);
    return storedValue;
}

export async function exists (key: string): Promise<number>{
    const redisConnection :Redis = connectToRedis()
    const exists: number = await redisConnection.exists(key);
    return exists;
}