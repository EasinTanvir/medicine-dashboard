import { prisma } from "@/libs/prismaCli";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "Medicine ID and status are required" },
        { status: 400 }
      );
    }

    const updatedMedicine = await prisma.stockMedicine.update({
      where: { id },
      data: { status },
    });

    revalidateTag("medicine", "max");

    return NextResponse.json(
      { message: "Status updated successfully", updatedMedicine },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error updating medicine status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
