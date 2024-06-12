import connectMongoDB from "@/lib/mongodb";
import TestModel from "@/models/test";
import { NextResponse } from "next/server";

// returns all
export async function GET(request) {
  console.log(request);
  await connectMongoDB();
  await new Promise((resolve) => setTimeout(resolve, 3000)); // added for testing purposes
  const topics = await TestModel.find();
  return NextResponse.json({ topics });
}

// adds new
// export async function POST(request) {
//   const { title, description } = await request.json();
//   await connectMongoDB();
//   await TestModel.create({ title, description });
//   return NextResponse.json({ message: "Topic Created" }, { status: 201 });
// }

// Adds new entries
export async function POST(request) {
  const data = await request.json();

  await connectMongoDB();

  try {
    if (Array.isArray(data)) {
      // Handle array of objects
      await TestModel.insertMany(data);
    } else if (typeof data === "object" && data !== null) {
      // Handle single object
      await TestModel.create(data);
    } else {
      return NextResponse.json(
        { message: "Invalid data format. Expected an array or an object." },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: "Topic(s) Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create topic(s)", error: error.message },
      { status: 500 }
    );
  }
}
