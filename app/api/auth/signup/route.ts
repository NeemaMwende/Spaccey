import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sql } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }

    // Check if user already exists
    const existing = await sql`
      SELECT id FROM users WHERE email = ${email} LIMIT 1
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await sql`
      INSERT INTO users (name, email, password_hash)
      VALUES (${name}, ${email}, ${passwordHash})
    `;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
