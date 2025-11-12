import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismaCli";
import { revalidateTag } from "next/cache";

export async function POST(req) {
  try {
    const { tag } = await req.json();

    const deleted = await prisma.sale.deleteMany({});
    revalidateTag(tag);
    return NextResponse.json(
      {
        message: "All sales have been reset successfully",
        deletedCount: deleted.count,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error resetting sales:", error);
    return NextResponse.json(
      { error: "Failed to reset sales" },
      { status: 500 }
    );
  }
}
