import { ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId;
  avatarImage: string;
  email: string;
  name: string;
  userImage: string;
  username: string;
  // schedule: [];
}
