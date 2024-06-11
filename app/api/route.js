import connectMongoDB from "@/lib/mongodb";
import TestModel from "@/models/test";
import { NextResponse } from "next/server";

export async function GET(request) {
  console.log(request);
  await connectMongoDB();
  await new Promise((resolve) => setTimeout(resolve, 3000)); // added for testing purposes
  const topics = await TestModel.find();
  return NextResponse.json({ topics });
}

export async function POST(request) {
  const { title, description } = await request.json();
  await connectMongoDB();
  await TestModel.create({ title, description });
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}
