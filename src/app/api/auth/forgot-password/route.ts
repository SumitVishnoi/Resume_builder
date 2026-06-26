import { connectDb } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import otpModel from "@/models/Otp.model";
import userModel from "@/models/User.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: NextResponse) {
    try {
        await connectDb()

        const body = await req.json()

        const {email} = body

        const user = await userModel.findOne({email})

        if(!user) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "User doesn't exist"
            }, {
                status: 404
            })
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        await otpModel.create({
            email,
            otp
        })

        await sendEmail({
            to: email,
            subject: "OTP for password reset",
            text: `Your OTP for password reset is ${otp}. It will expire in 10 minutes.`,
        })

        console.log(email, otp)

        const response = NextResponse.json<ApiResponse>({
            success: true,
            message: "OTP sent to your email",
        }, {
            status: 200
        })

        return response
    } catch (error) {
        console.log("error in otp send", error)
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Something went wrong"
        }, {
            status: 500
        })
    }
}

