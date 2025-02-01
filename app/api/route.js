import { ConnectDB } from "@/lib/config/db";
import NoteModel from "@/lib/models/NoteModel";
import { NextResponse } from "next/server"; // Import NextResponse

// Ensure DB connection is established before handling requests
await ConnectDB();

// GET method - Fetch all notes
export const GET = async (req) => {
  try {
    const notes = await NoteModel.find();
    return NextResponse.json(notes, { status: 200 }); // Use NextResponse for JSON response
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", error },
      { status: 500 }
    );
  }
};

// POST method - Create a new note
export const POST = async (req) => {
  try {
    const { title, description } = await req.json(); // Use .json() to parse body
    if (!title || !description) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    const newNote = new NoteModel({ title, description });
    await newNote.save();
    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", error },
      { status: 500 }
    );
  }
};

// PUT method - Update a note by ID
export const PUT = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // Correct way to get query params in Next.js

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const { title, description } = await req.json();
    const updatedNote = await NoteModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updatedNote) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
};

// DELETE method - Delete a note by ID
export const DELETE = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // Correct way to get query params

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const deletedNote = await NoteModel.findByIdAndDelete(id);

    if (!deletedNote) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
};

// For unsupported HTTP methods, return Method Not Allowed
export const methodNotAllowed = () => {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
};
