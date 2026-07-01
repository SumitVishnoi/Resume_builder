import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import userModel from "@/models/User.model";
import { generateToken } from "@/lib/generateToken";

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const { name, email } = await req.json();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Google account email is required.",
        },
        {
          status: 400,
        },
      );
    }

    // Check if user already exists
    let user = await userModel.findOne({ email });

    // Create user if not exists
    if (!user) {
      user = await userModel.create({
        name,
        email,
        isVerified: true,
        authProvider: "google",
      });
    }

    // Generate your JWT
    const token = generateToken({
      userId: user._id.toString(),
    });

    // Response
    const response = NextResponse.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

    // Store JWT in cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      {
        status: 500,
      },
    );
  }
}
