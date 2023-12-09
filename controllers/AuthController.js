// eslint-disable-next-line import/no-extraneous-dependencies
import { uuid } from 'uuidv4';
// import sha1 from 'sha1';
import redisClient from '../utils/redis';

class AuthController {
  static async getConnect(res, req) {
    const { user } = req;
    const token = uuid();

    await redisClient.set(`auth_${token}`, user._id.toString(), 24 * 60 * 60);
    res.status(200).json({ token });
  }

  static async getDisconnect(req, res) {
    const token = req.headers['x-token'];
    if (!token) {
      res.code(401).json({ error: 'Unauthorized' });
    }
    await redisClient.del(`auth_${token}`);
    res.status(204).send();
  }
}
export default AuthController;
