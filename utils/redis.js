import { promisify } from 'util';
import { createClient } from 'redis';

/**
 * Redis client
 *
 */
class RedisClient {
  /**
   * RedisClient constructor
   */
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log(`Redis client not connected to the server: ${err.message}`));
  }

  /**
   * Check if server is active
   * @returns {boolean}
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   *
   * @param {String} key
   * @returns {String | Object}
   */
  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    const value = await getAsync(key);
    return value;
  }

  /**
   *
   * @param {String} key
   * @param {String} value
   * @param {number} duration
   */
  async set(key, value, duration) {
    this.client.setex(key, duration, value);
  }

  /**
   *
   * @param {String} key
   */
  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
