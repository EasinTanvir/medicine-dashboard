import { prisma } from "@/libs/prismaCli";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { companyId, medicines } = body;

    if (!companyId) {
      return NextResponse.json(
        { error: "Company ID is required" },
        { status: 400 }
      );
    }

    const companyExists = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!companyExists) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    const newMedicines = await prisma.stockMedicine.createMany({
      data: medicines.map((m) => ({
        name: m.name,
        quantity: Number(m.quantity) || 1,
        price: Number(m.price) || 0,
        subTotal: (Number(m.quantity) || 0) * (Number(m.price) || 0),
        companyId,
      })),
    });

    return NextResponse.json(
      { message: "Medicines added successfully", newMedicines },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating medicines:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * ✅ GET: Fetch all medicines OR filter by companyId
 * Usage:
 *   - GET /api/medicine               → all medicines (with company info)
 *   - GET /api/medicine?companyId=xxx → medicines for one company
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("companyId");

    // Filter by company if provided
    const where = companyId ? { companyId } : {};

    const medicines = await prisma.stockMedicine.findMany({
      where,
      include: {
        company: {
          select: {
            id: true,
            companyName: true,
            representativeName: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!medicines.length) {
      return NextResponse.json(
        { message: "No medicines found" },
        { status: 200 }
      );
    }

    // ✅ Compute totals
    const totalQuantity = medicines.reduce(
      (acc, m) => acc + (m.quantity || 0),
      0
    );
    const totalValue = medicines.reduce((acc, m) => acc + (m.subTotal || 0), 0);

    return NextResponse.json(
      {
        totalRecords: medicines.length,
        totalQuantity,
        totalValue,
        medicines,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error fetching medicines:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
