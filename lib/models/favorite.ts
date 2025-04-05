import mongoose from "mongoose"
import { Schema } from "mongoose"

export interface IFavorite {
  user: mongoose.Types.ObjectId
  gist: mongoose.Types.ObjectId
  createdAt: Date
}

const FavoriteSchema = new Schema<IFavorite>(
  {
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

// Create a compound index to ensure a user can only favorite a gist once
FavoriteSchema.index({ user: 1, gist: 1 }, { unique: true })

export default mongoose.models.Favorite || mongoose.model<IFavorite>("Favorite", FavoriteSchema)

