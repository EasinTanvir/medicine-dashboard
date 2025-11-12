import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismaCli";
import { revalidateTag } from "next/cache";
// 🟢 Create a new company
export async function POST(req) {
  try {
    const body = await req.json();
    const { companyName, address, representativeName, representativePhone } =
      body;

    if (!companyName) {
      return NextResponse.json(
        { error: "Company name is required" },
        { status: 400 }
      );
    }

    const newCompany = await prisma.company.create({
      data: {
        companyName,
        address: address || null,
        representativeName: representativeName || null,
        representativePhone: representativePhone || null,
      },
    });

    revalidateTag("company");

    return NextResponse.json(newCompany, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating company:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// 🔵 Get all companies
export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(companies, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching companies:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
// 🔴 Delete a company by ID
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "Company ID is required" },
        { status: 400 }
      );
    }

    await prisma.company.delete({
      where: { id },
    });
    revalidateTag("company");
    return NextResponse.json(
      { message: "Company deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error deleting company:", error);
    return NextResponse.json(
      { error: "Failed to delete company" },
      { status: 500 }
    );
  }
}
