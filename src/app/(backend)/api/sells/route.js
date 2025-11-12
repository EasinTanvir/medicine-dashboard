import { prisma } from "@/libs/prismaCli";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { sales } = body;

    if (!sales || !Array.isArray(sales) || sales.length === 0) {
      return NextResponse.json(
        { error: "Sales data is required" },
        { status: 400 }
      );
    }

    // Validate all company IDs (if provided)
    for (const s of sales) {
      if (s.companyId) {
        const exists = await prisma.company.findUnique({
          where: { id: s.companyId },
        });
        if (!exists) {
          return NextResponse.json(
            { error: `Company not found for sale: ${s.medicineName}` },
            { status: 404 }
          );
        }
      }
    }

    // Insert all sales
    const created = await prisma.sale.createMany({
      data: sales.map((s) => ({
        medicineName: s.medicineName,
        quantity: Number(s.quantity) || 1,
        price: Number(s.price) || 0,
        subTotal: (Number(s.quantity) || 0) * (Number(s.price) || 0),
        date: s.date ? new Date(s.date) : new Date(),
        companyId: s.companyId || null,
      })),
    });

    revalidateTag("sells");

    return NextResponse.json(
      { message: "Sales recorded successfully", count: created.count },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating sales:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const sales = await prisma.sale.findMany({
      include: {
        company: {
          select: {
            id: true,
            companyName: true,
          },
        },
      },
      orderBy: { date: "desc" },
    });

    const totalQuantity = sales.reduce((sum, s) => sum + s.quantity, 0);
    const totalValue = sales.reduce((sum, s) => sum + s.subTotal, 0);

    return NextResponse.json(
      {
        totalRecords: sales.length,
        totalQuantity,
        totalValue,
        sales,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error fetching sales:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
