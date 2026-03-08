import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireCurrentUser } from "@/lib/auth"

type Params = {
  params: { id: string }
}

export async function GET(_req: Request, { params }: Params) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        seller: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    })

    if (!product) {
      return NextResponse.json({ message: "Not found" }, { status: 404 })
    }

    return NextResponse.json({ product })
  } catch (error) {
    console.error("[product.GET]", error)
    return NextResponse.json({ message: "Failed to load product" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const user = await requireCurrentUser()
    const body = await request.json().catch(() => ({}))

    const existing = await prisma.product.findUnique({
      where: { id: params.id },
    })

    if (!existing) {
      return NextResponse.json({ message: "Not found" }, { status: 404 })
    }

    if (existing.sellerId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json({ message: "Not allowed" }, { status: 403 })
    }

    const { title, description, price, category, image } = body

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        title,
        description,
        price,
        category,
        image,
      },
    })

    return NextResponse.json({ product })
  } catch (error) {
    console.error("[product.PATCH]", error)
    return NextResponse.json({ message: "Could not update product" }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const user = await requireCurrentUser()

    const existing = await prisma.product.findUnique({
      where: { id: params.id },
    })

    if (!existing) {
      return NextResponse.json({ message: "Not found" }, { status: 404 })
    }

    if (existing.sellerId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json({ message: "Not allowed" }, { status: 403 })
    }

    await prisma.product.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[product.DELETE]", error)
    return NextResponse.json({ message: "Could not delete product" }, { status: 500 })
  }
}

