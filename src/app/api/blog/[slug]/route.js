import { Post } from "../../../../../lib/models";
import { NextResponse } from "next/server";
import { connectToDB } from "../../../../../lib/utils";

//making apis in nextJs using NextResponse
export const GET = async (req, { params }) => {
  const { slug } = params;
  try {
    connectToDB();
    const post = await Post.findOne({ slug });

    return NextResponse.json(post);
  } catch (err) {
    console.log(err);
    throw new Error("failed to fetch data");
  }
};
export const DELETE = async (req, { params }) => {
  const { slug } = params;
  try {
    connectToDB();
    const post = await Post.findOneAndDelete({ slug });

    return NextResponse.json('post deleted successfully');
  } catch (err) {
    console.log(err);
    throw new Error("failed to fetch data");
  }
};
