import { prisma } from "@/libs/prismaCli";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { tag } = await req.json();
    const deleted = await prisma.company.deleteMany({});
    revalidateTag(tag);
    return NextResponse.json(
      {
        message: "All companies have been reset successfully",
        deletedCount: deleted.count,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error resetting companies:", error);
    return NextResponse.json(
      { error: "Failed to reset companies" },
      { status: 500 }
    );
  }
}
