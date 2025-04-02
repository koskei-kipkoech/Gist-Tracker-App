import mongoose from "mongoose"
import { Schema } from "mongoose"

export interface IGist {
  title: string
  description?: string
  content: string
  language: string
  isPublic: boolean
  user: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const GistSchema = new Schema<IGist>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
    },
    language: {
      type: String,
      required: [true, "Please provide a language"],
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Gist || mongoose.model<IGist>("Gist", GistSchema)

