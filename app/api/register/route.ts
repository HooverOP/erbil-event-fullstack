import { saveRegistred } from "@/lib/db";
import { RegistrationForm } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body: RegistrationForm = await request.json();

    if (!body.fullName || !body.email || !body.eventId) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!body.email || !body.email.includes("@") || !body.email.includes(".")) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 } // bad request basically
      );
    }

    if (!body.eventId) {
      return NextResponse.json(
        { error: "Event ID is required." },
        { status: 404 } // event not found... N/A
      );
    }
    try {
      const registered = saveRegistred(body);

      return NextResponse.json(
        { message: "Registration successful.", registered },
        { status: 201 } // created successfully
      );
    } catch (error) {
      if (error instanceof Error && error.message.includes("duplicate key")) {
        return NextResponse.json(
          { error: error.message },
          { status: 409 } // conflict typeshit
        );
      }
      throw error; // rethrow if it's not a duplicate key error
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Bad request." },
      { status: 400 } // bad request typeshit
    );
  }
}
