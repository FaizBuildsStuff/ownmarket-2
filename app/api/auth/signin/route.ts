import { NextResponse } from "next/server"
import { signInWithEmail } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    const user = await signInWithEmail(email, password)

    return NextResponse.json(
      {
        user,
      },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error?.message || "Invalid credentials",
      },
      { status: 401 },
    )
  }
}

