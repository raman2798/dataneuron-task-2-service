import { model, Schema } from 'mongoose';
import { assign } from 'lodash';
import { paginationAndDownload, toJSON } from './plugins';
import { IUser, IUserModel } from '../interfaces/users';

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    name: {
      first: {
        type: String,
        trim: true,
        required: true,
      },
      last: {
        type: String,
        trim: true,
        required: true,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    isActive: { type: Boolean, default: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  {
    timestamps: true,
  },
);

// add plugin pagination and download for populate
userSchema.plugin(paginationAndDownload);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);

// Check if email is taken
userSchema.statics.isEmailTaken = async function (email: string, excludeUserId?: string): Promise<boolean> {
  const user = this as IUserModel;

  const query = { email };

  if (excludeUserId) {
    assign(query, { _id: { $ne: excludeUserId } });
  }

  const userInfo = await user.findOne(query);

  return !!userInfo;
};

export default model<IUser, IUserModel>('users', userSchema);
