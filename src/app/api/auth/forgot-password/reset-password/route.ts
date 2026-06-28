import { connectDb } from "@/lib/db";
import otpModel from "@/models/Otp.model";
import userModel from "@/models/User.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectDb();

    const body = await req.json();

    const { email, otp, newPassword } = body;

    const otpRecord = await otpModel.findOne({
      email,
      otp,
    });

    if (
      !otpRecord ||
      Date.now() - otpRecord.createdAt!.getTime() > 10 * 60 * 1000
    ) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Invalid or expired OTP",
        },
        {
          status: 400,
        },
      );
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "User doesn't exist",
        },
        {
          status: 404,
        },
      );
    }

    user.password = newPassword;

    await user.save();
    await otpModel.deleteMany({ email });

    const response = NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Reset password successfully",
      },
      {
        status: 200,
      },
    );

    return response;
  } catch (error) {
    console.log("error in reset password", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
