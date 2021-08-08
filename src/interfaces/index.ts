import { ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  // schedule: [];
}
