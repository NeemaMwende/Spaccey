import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing credentials" },
        { status: 400 },
      );
    }

    const users = await sql`
      SELECT id, email, password_hash
      FROM users
      WHERE email = ${email}
      LIMIT 1
    `;

    if (users.length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const user = users[0];

    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // 👉 Later: set cookie / JWT / session here
    return NextResponse.json({
      success: true,
      userId: user.id,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
