import connectMongoDB from "@/lib/mongodb";
import TestModel from "@/models/test";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// returns one
export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  await new Promise((resolve) => setTimeout(resolve, 3000)); // added for testing purposes
  const topics = await TestModel.findById(id);
  return NextResponse.json({ topics });
}

// deletes one
export async function DELETE(request, { params }) {
  const { id } = params;
  await connectMongoDB();

  await new Promise((resolve) => setTimeout(resolve, 3000)); // added for testing purposes

  // Check if the provided id is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }
  const deletedTopic = await TestModel.findByIdAndDelete(id);
  if (!deletedTopic) {
    return NextResponse.json({ message: "Topic not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Topic Deleted" }, { status: 200 });
}

// updates one
export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json();

  await new Promise((resolve) => setTimeout(resolve, 3000)); // added for testing purposes

  await connectMongoDB();
  await TestModel.findByIdAndUpdate(id, { title, description });
  return NextResponse.json({ message: "Topic Updated" }, { status: 200 });
}
