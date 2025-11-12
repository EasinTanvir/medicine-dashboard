import { prisma } from "@/libs/prismaCli";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

// ✅ CREATE medicines (bulk)
export async function POST(req) {
  try {
    const body = await req.json();
    const { companyId, medicines } = body;

    if (!companyId)
      return NextResponse.json(
        { error: "Company ID is required" },
        { status: 400 }
      );

    const companyExists = await prisma.company.findUnique({
      where: { id: companyId },
    });
    if (!companyExists)
      return NextResponse.json({ error: "Company not found" }, { status: 404 });

    const newMedicines = await prisma.stockMedicine.createMany({
      data: medicines.map((m) => ({
        name: m.name,
        quantity: Number(m.quantity) || 1,
        price: Number(m.price) || 0,
        subTotal: (Number(m.quantity) || 0) * (Number(m.price) || 0),
        companyId,
      })),
    });

    revalidateTag("medicine");

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

// ✅ READ all medicines
export async function GET() {
  try {
    const medicines = await prisma.stockMedicine.findMany({
      include: { company: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(medicines, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching medicines:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ✅ UPDATE single medicine
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, name, quantity, price } = body;

    if (!id)
      return NextResponse.json(
        { error: "Medicine ID is required" },
        { status: 400 }
      );

    const updatedMedicine = await prisma.stockMedicine.update({
      where: { id },
      data: {
        name,
        quantity: Number(quantity) || 1,
        price: Number(price) || 0,
        subTotal: (Number(quantity) || 0) * (Number(price) || 0),
      },
    });
    revalidateTag("medicine");
    return NextResponse.json(updatedMedicine, { status: 200 });
  } catch (error) {
    console.error("❌ Error updating medicine:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ✅ DELETE single medicine
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id)
      return NextResponse.json(
        { error: "Medicine ID is required" },
        { status: 400 }
      );

    await prisma.stockMedicine.delete({ where: { id } });
    revalidateTag("medicine");
    return NextResponse.json(
      { message: "Medicine deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error deleting medicine:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
