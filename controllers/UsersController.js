// eslint-disable-next-line import/no-named-as-default
import sha1 from 'sha1';
// eslint-disable-next-line import/no-named-as-default
import dbClient from '../utils/db';

const UsersController = {
  async postNew(req, res) {
    const email = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;

    if (!email) {
      res.status(400).json({ error: 'Missing email' });
      return;
    }
    if (!password) {
      res.status(400).json({ error: 'Missing password' });
      return;
    }
    const checkEmail = await (
      await dbClient.usersCollection()
    ).findOne({ email });
    if (checkEmail) {
      res.status(400).json({ error: 'Already exist' });
    }
    const data = await (
      await dbClient.usersCollection()
    ).insertOne({
      email,
      password: sha1(password),
    });
    if (data) {
      res.status(201).json({ email, id: data.insertedId.toString() });
    }
  },
};

export default UsersController;
