import { Collection, MongoClient, MongoClientOptions, ObjectId } from 'mongodb';

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
    console.log(!MongoLib.connection);
    try {
      if (!MongoLib.connection) {
        MongoLib.connection = await this.client.connect();
        console.log(!MongoLib.connection);
        console.log('Connected to db...');
      }
    } catch (err) {
      console.error(err);
    }
    return MongoLib.connection;
  }

  async getAll(collection: string) {
    try {
      const db = (await this.connect()).db(this.dbName);
      return await db.collection(collection).find({}).toArray();
    } catch (err) {
      console.error(err);
    }
  }

  // get(collection, id) {
  //   return this.connect().then((db) => {
  //     return db.collection(collection).findOne({ _id: ObjectId(id) });
  //   });
  // }

  async create(collection: string, data: User) {
    try {
      const db = (await this.connect()).db(this.dbName);
      return await db.collection(collection).insertOne(data);
    } catch (err) {
      console.error(err);
    }
  }

  // update(collection, id, data) {
  //   return this.connect()
  //     .then((db) => {
  //       return db
  //         .collection(collection)
  //         .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
  //     })
  //     .then((result) => result.upsertedId || id);
  // }

  // delete(collection, id) {
  //   return this.connect()
  //     .then((db) => {
  //       return db.collection(collection).deleteOne({ _id: ObjectId(id) });
  //     })
  //     .then(() => id);
  // }
  async close() {
    try {
      if (this.client) await this.client.close();
      console.log('Conexion is closed...');
    } catch (err) {
      console.error(err);
    }
  }
}
