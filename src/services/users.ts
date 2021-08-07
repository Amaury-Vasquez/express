import { User } from '../interfaces';
import { MongoLib } from '../lib/mongo';

export class UsersService {
  private collection: string;
  private mongoDB: MongoLib;

  constructor() {
    this.collection = 'Users';
    this.mongoDB = new MongoLib();
  }

  async getUsers() {
    const users = await this.mongoDB.getAll(this.collection);
    return users || [];
  }

  async createUser(data: User) {
    return await this.mongoDB.create(this.collection, data);
  }
}
