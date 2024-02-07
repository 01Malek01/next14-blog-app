import { Post } from "../../../../lib/models";
import { connectToDB } from "../../../../lib/utils";
import { NextResponse } from "next/server";


//making apis in nextJs using NextResponse
export const GET = async (req, res) => {
  try {
    connectToDB();
    const posts = await Post.find();

    return NextResponse.json(posts); 
  } catch (err) {
    console.log(err);
    throw new Error("failed to fetch data");
  }
};
