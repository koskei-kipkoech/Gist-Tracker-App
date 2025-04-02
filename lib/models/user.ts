import mongoose from "mongoose"
import { Schema } from "mongoose"

export interface IUser {
  name: string
  email: string
  password: string
  githubUsername?: string
  bio?: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      maxlength: [60, "Name cannot be more than 60 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    githubUsername: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: [200, "Bio cannot be more than 200 characters"],
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)

