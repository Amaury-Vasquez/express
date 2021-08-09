import { Db, MongoClient, ObjectId } from 'mongodb';

import { config } from '../config';
import { User } from '../interfaces';

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

export class MongoLib {
  static connection: MongoClient;
  private client: MongoClient;
  private readonly dbName: string;

  constructor() {
    this.client = new MongoClient(MONGO_URI);
    this.dbName = DB_NAME;
  }

  async connect() {
    try {
      if (!MongoLib.connection) {
        MongoLib.connection = await this.client.connect();
        console.log('Connected to db...');
      }
    } catch (err) {
      console.error(err);
    }
    return MongoLib.connection;
  }

  async create(collection: string, query: User) {
    try {
      const db = await this.getDB();
      return await db.collection(collection).insertOne(query);
    } catch (err) {
      console.error(err);
    }
  }

  async createMany(collection: string, query: User[]) {
    try {
      const db = await this.getDB();
      return await (await this.getCollection(db, collection)).insertMany(query);
    } catch (err) {
      console.error(err);
    }
  }

  async delete(collection: string, username: string) {
    try {
      const db = await this.getDB();
      return await db.collection(collection).deleteOne({ username });
    } catch (err) {
      console.error(err);
    }
  }

  async deleteMany(collection: string, query: User[]) {
    try {
      const db = await this.getDB();
      return await db.collection(collection).deleteMany(query);
    } catch (err) {
      console.error(err);
    }
  }

  async get(collection: string, username: string) {
    try {
      const db = await this.getDB();
      return await db.collection(collection).findOne({ username });
    } catch (err) {
      console.error(err);
    }
  }

  async getAll(collection: string) {
    try {
      const db = await this.getDB();
      return await db.collection(collection).find({}).toArray();
    } catch (err) {
      console.error(err);
    }
  }

  private async getCollection(db: Db, collection: string) {
    return await db.collection(collection);
  }

  private async getDB() {
    return (await this.connect()).db(this.dbName);
  }

  async close() {
    try {
      if (this.client) await this.client.close();
      console.log('Conexion is closed...');
    } catch (err) {
      console.error(err);
    }
  }
}
