import {Document, model, Schema, Types} from "mongoose";

import {IUser} from "./User";

const ProductSchema = new Schema({
  title: {type: String, required: true},
  price: {type: Number, required: true},
  description: {type: String, required: true},
  creator: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {timestamps: true});

export interface IProduct extends Document {
  _id: string;
  title: string;
  price: number;
  description: string;
  creator: IUser;
}

export default model<IProduct>('Product', ProductSchema);
