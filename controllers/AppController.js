// controllers/AppController.js

// eslint-disable-next-line import/no-named-as-default
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

const AppController = {
  async getStatus(req, res) {
    try {
      const redisStatus = await redisClient.isAlive();
      const dbStatus = await dbClient.isAlive();

      res.status(200).json({ redis: redisStatus, db: dbStatus });
    } catch (error) {
      console.error('Error in getStatus:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  async getStats(req, res) {
    try {
      const usersCount = await dbClient.nbUsers();
      const filesCount = await dbClient.nbFiles();

      res.status(200).json({ users: usersCount, files: filesCount });
    } catch (error) {
      console.error('Error in getStats:', error);
      res.status(500).send('Internal Server Error');
    }
  },
};

export default AppController;
