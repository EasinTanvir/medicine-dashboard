import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismaCli";
import { revalidateTag } from "next/cache";

export async function POST(req) {
  try {
    const { tag } = await req.json();
    const deleted = await prisma.customer.deleteMany({});

    revalidateTag(tag);
    return NextResponse.json(
      {
        message: "All customers have been reset successfully",
        deletedCount: deleted.count,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error resetting customers:", error);
    return NextResponse.json(
      { error: "Failed to reset customers" },
      { status: 500 }
    );
  }
}
