import { type NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import connectDB from "@/lib/db";
import Comment from "@/lib/models/comment";

// Get all comments for a gist
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const comments = await Comment.find({ gist: params.id })
      .sort({ createdAt: -1 })
      .populate("user", "name githubUsername");

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

// Add a comment to a gist
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json({ message: "Comment content is required" }, { status: 400 });
    }

    await connectDB();

    const comment = new Comment({
      content,
      user: user._id,
      gist: params.id,
    });

    await comment.save();

    // Populate user info for the response
    const populatedComment = await Comment.findById(comment._id).populate(
      "user",
      "name githubUsername"
    );

    return NextResponse.json(populatedComment, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}