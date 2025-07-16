import { getRegistered } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const registered = getRegistered();
    return NextResponse.json(registered);
  } catch (error) {
    console.error("Error fetching registered users:", error);
    return NextResponse.json(
      { error: "Failed to fetch registered users." },
      { status: 500 } // server error or smth idk its internally
    );
  }
}
