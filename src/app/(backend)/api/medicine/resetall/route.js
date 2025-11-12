import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismaCli";
import { revalidateTag } from "next/cache";

export async function POST(req) {
  try {
    const { tag } = await req.json();
    const deleted = await prisma.stockMedicine.deleteMany({});
    revalidateTag(tag);
    return NextResponse.json(
      {
        message: "All medicines have been reset successfully",
        deletedCount: deleted.count,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error resetting medicines:", error);
    return NextResponse.json(
      { error: "Failed to reset medicines" },
      { status: 500 }
    );
  }
}
