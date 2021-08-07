import express, { Express } from 'express';
import { User } from '../interfaces';

import { students } from '../mocks/MOCK_DATA';
import { UsersService } from '../services/users';

export const usersApi = (app: Express) => {
  const router = express.Router();
  app.use('/api/users', router);

  const userService = new UsersService();

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

  router.get('/:studentId', async (req, res, next) => {
    try {
      const data = await Promise.resolve(
        students[parseInt(req.params.studentId)]
      );

      res.status(200).json({
        data,
        message: 'student list',
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const data: User = req.body;
      const createdStudent = await userService.createUser(data);
      res.status(201).json({
        data: createdStudent,
        message: 'user created',
      });
    } catch (err) {
      next(err);
    }
  });
};
