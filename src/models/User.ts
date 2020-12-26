import {model, Schema, Types, Document} from "mongoose";

import { IProduct } from "./Product";

const UserSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  status: {type: String, default: "Hello"},
  products: [{
    type: Types.ObjectId,
    ref: "Post"
  }]
});

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  name: string;
  status: string;
  products: IProduct[];
}



export default model<IUser>('User', UserSchema);
