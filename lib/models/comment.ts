import mongoose from "mongoose"
import { Schema } from "mongoose"

export interface IComment {
  content: string
  user: mongoose.Types.ObjectId
  gist: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const CommentSchema = new Schema<IComment>(
  {
    content: {
      type: String,
      required: [true, "Comment content is required"],
      maxlength: [1000, "Comment cannot be more than 1000 characters"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gist: {
      type: Schema.Types.ObjectId,
      ref: "Gist",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema)

