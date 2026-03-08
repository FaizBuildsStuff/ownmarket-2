import { NextResponse } from "next/server"
import { createUserWithPassword } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    let body: { email?: string; password?: string; username?: string } = {}
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { message: "Invalid JSON body" },
        { status: 400 }
      )
    }
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      )
    }

    const email = typeof body.email === "string" ? body.email.trim() : ""
    const password = typeof body.password === "string" ? body.password : ""
    const username = typeof body.username === "string" ? body.username.trim() || undefined : undefined

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      )
    }

    const user = await createUserWithPassword({ email, password, username })

    return NextResponse.json({ user }, { status: 201 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unable to sign up"

    if (message === "Email already in use") {
      return NextResponse.json({ message }, { status: 409 })
    }

    // Only treat explicit validation messages as 400
    if (message === "Email and password are required") {
      return NextResponse.json({ message }, { status: 400 })
    }

    // Log and return 500 for DB/server errors (e.g. Prisma)
    console.error("[signup] error:", error)
    return NextResponse.json(
      { message: "Something went wrong. Try again later." },
      { status: 500 }
    )
  }
}

