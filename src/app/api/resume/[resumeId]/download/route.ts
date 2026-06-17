import { connectDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { generateResumeHTML } from "@/lib/resume/template";
import resumeModel from "@/models/Resume.model";

import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> },
) {
  try {
    await connectDb();

    const { resumeId } = await params;
    const userId = await getCurrentUser();

    const resume = await resumeModel.findOne({
      _id: resumeId,
      user_id: userId,
    });

    if (!resume) {
      return NextResponse.json(
        { success: false, message: "Resume not found" },
        { status: 404 },
      );
    }

    const html = generateResumeHTML(resume);

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "load",
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "48px",
        right: "52px",
        bottom: "48px",
        left: "52px",
      },
    });

    await browser.close();

    const filename =
      (resume.personalInfo?.fullname || resume.title || "resume")
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "") + ".pdf";

    return new NextResponse(Buffer.from(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate PDF",
      },
      {
        status: 500,
      },
    );
  }
}
