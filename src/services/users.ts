import { ObjectId } from 'mongodb';
import { User } from '../interfaces';
import { MongoLib } from '../lib/mongo';

export class UsersService {
  private collection: string;
  private mongoDB: MongoLib;

  constructor() {
    this.collection = 'Users';
    this.mongoDB = new MongoLib();
  }

  async createUser(data: User) {
    return await this.mongoDB.create(this.collection, data);
  }

  async createMany(data: User[]) {
    return await this.mongoDB.createMany(this.collection, data);
  }

  async deleteMany(data: User[]) {
    const willDelete = await this.mongoDB.deleteMany(this.collection, data);
    return willDelete;
  }

  async deleteUser(username: string) {
    const user = await this.mongoDB.delete(this.collection, username);
    return user || {};
  }

  async get(username: string) {
    const user = await this.mongoDB.get(this.collection, username);
    return user || {};
  }

  async getUsers() {
    const users = await this.mongoDB.getAll(this.collection);
    return users || [];
  }
}
