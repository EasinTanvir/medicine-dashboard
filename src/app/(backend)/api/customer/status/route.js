import { prisma } from "@/libs/prismaCli";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

// ✅ Update customer status only
export async function PUT(req) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "Customer ID and status are required" },
        { status: 400 }
      );
    }

    // 🔍 Validate status type
    if (!["pending", "done"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value. Must be 'pending' or 'done'." },
        { status: 400 }
      );
    }

    const customerExists = await prisma.customer.findUnique({ where: { id } });
    if (!customerExists) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: { status },
    });

    // ✅ Revalidate for cache consistency
    revalidateTag("customer");

    return NextResponse.json(updatedCustomer, { status: 200 });
  } catch (error) {
    console.error("❌ Error updating status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
