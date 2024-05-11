import { createClient } from "redis";

export abstract class RedisCache {
  private client: any;
  private cacheName: "BITCOIN_PRICE";

  protected constructor(cacheName: RedisCache["cacheName"]) {
    this.client = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });
    this.cacheName = cacheName;
  }

  async setData<T>(data: T): Promise<void> {
    try {
      await this.client.connect();
      await this.client.set(this.cacheName, JSON.stringify(data));
    } catch (error) {
      throw error;
    }
  }

  async getData<T>(): Promise<T> {
    try {
      await this.client.connect();
      const data = await this.client.get(this.cacheName);
      return JSON.parse(data);
    } catch (error) {
      throw error;
    }
  }
}
