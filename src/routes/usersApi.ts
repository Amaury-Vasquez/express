import express, { Express } from 'express';
import { User } from '../interfaces';

import { UsersService } from '../services/users';

export const usersApi = (app: Express) => {
  const router = express.Router();
  app.use('/api/users', router);

  const userService = new UsersService();

  router.delete('/', async (req, res, next) => {
    try {
      const willDelete = req.body;
      const data =
        willDelete instanceof Array
          ? await userService.deleteMany(willDelete)
          : await userService.deleteUser(willDelete);
      res.status(200).json({
        data,
        message: 'user deleted',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/', async (req, res, next) => {
    try {
      const data = await userService.getUsers();
      res.status(200).json({
        data,
        message: 'users list',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:username', async (req, res, next) => {
    const username = req.params.username;
    console.log(username);
    const data = await userService.get(username);
    res.status(200).json({
      data,
      message: `user: ${username}`,
    });
  });

  router.post('/', async (req, res, next) => {
    try {
      const data = req.body;
      const createdStudent =
        data instanceof Array
          ? await userService.createMany(data)
          : await userService.createUser(data);
      res.status(201).json({
        data: createdStudent,
        message: 'created succesfully',
      });
    } catch (err) {
      next(err);
    }
  });
};
