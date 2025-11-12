import { prisma } from "@/libs/prismaCli";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

// ✅ Create new customer
export async function POST(req) {
  try {
    const body = await req.json();
    const { customerName, customerPhone, customerAddress, medicines } = body;

    if (!customerName) {
      return NextResponse.json(
        { error: "Customer name is required" },
        { status: 400 }
      );
    }

    const newCustomer = await prisma.customer.create({
      data: {
        customerName,
        customerPhone: customerPhone || null,
        customerAddress: customerAddress || null,
        status: "pending", // ✅ default
        medicines: {
          create: medicines.map((m) => {
            const medicineData = {
              medicineName: m.medicineName,
              quantity: Number(m.quantity) || 1,
            };
            if (m.companyId) {
              medicineData.company = { connect: { id: m.companyId } };
            }
            return medicineData;
          }),
        },
      },
      include: { medicines: { include: { company: true } } },
    });

    revalidateTag("customer");

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating customer:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ✅ Get all customers
export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      include: { medicines: { include: { company: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching customers:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ✅ Update customer status
export async function PUT(req) {
  try {
    const { id, status } = await req.json();
    if (!id || !status)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const updated = await prisma.customer.update({
      where: { id },
      data: { status },
    });
    revalidateTag("customer");
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("❌ Error updating status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ✅ Delete customer
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id)
      return NextResponse.json(
        { error: "Customer ID required" },
        { status: 400 }
      );

    await prisma.customer.delete({ where: { id } });
    revalidateTag("customer");
    return NextResponse.json(
      { message: "Customer deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error deleting customer:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
