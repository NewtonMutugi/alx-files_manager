// eslint-disable-next-line import/no-extraneous-dependencies
import { uuid } from 'uuidv4';
import sha1 from 'sha1';
import redisClient from '../utils/redis';

const AuthController = {
  async getConnect(res, req) {
    const { authorization } = req.headers;
    if (!authorization) {
      res.code(401).json({ error: 'Unauthorized' });
    }
    const token = uuid();
    const hash = sha1(token);
    await redisClient.set(`auth_${hash}`, authorization, 24 * 60 * 60);
    res.status(200).json({ token });
  },

  async getDisconnect(req, res) {
    const token = req.headers['x-token'];
    if (!token) {
      res.code(401).json({ error: 'Unauthorized' });
    }
    await redisClient.del(`auth_${token}`);
    res.status(204).send();
  },
};
export default AuthController;
