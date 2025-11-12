import { prisma } from "@/libs/prismaCli";
import { NextResponse } from "next/server";

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

    // ✅ Create customer and connect medicines (with companyId if exists)
    const newCustomer = await prisma.customer.create({
      data: {
        customerName,
        customerPhone: customerPhone || null,
        customerAddress: customerAddress || null,
        medicines: {
          create: medicines.map((m) => {
            const medicineData = {
              medicineName: m.medicineName,
              quantity: Number(m.quantity) || 1,
            };

            // If companyId is provided, connect it
            if (m.companyId) {
              medicineData.company = {
                connect: { id: m.companyId },
              };
            }

            return medicineData;
          }),
        },
      },
      include: {
        medicines: {
          include: { company: true },
        },
      },
    });

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating customer:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        medicines: {
          include: { company: true },
        },
      },
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
