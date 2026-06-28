import { verifyToken } from "@/lib/generateToken";
import { connectDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/User.model";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token");

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const decoded = verifyToken(token.value);

    if (!decoded || typeof decoded === "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    await connectDb();

    const user = await userModel.findById(decoded.userId).select("-password");
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        user,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
