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

        const otp = Math.floor(100000 + Math.random() * 999999)

        const newOtp = new otpModel({
            email,
            otp
        })

        newOtp.save()

        await sendEmail({
            to: email,
            subject: "OTP for password reset",
            text: `Your OTP for password reset is ${otp}. It will expire in 10 minutes.`,
        })

        const response = NextResponse.json<ApiResponse>({
            success: true,
            message: "OTP sent to your email"
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

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        await connectDb()

        const body = await req.json()

        const {email, otp} = body

        

        const otpRecord = await otpModel.findOne({
            email, 
            otp
        })

        

        if(!otpRecord || (Date.now() - otpRecord.createdAt.getTime()) > 10 * 60 * 1000) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "Invalid or expired OTP"
            }, {
                status: 400
            })
        }

        const response = NextResponse.json<ApiResponse>({
            success: true,
            message: "OTP verified successfully"
        }, {
            status: 200
        })

        return response
    } catch (error) {
        console.log("error in verification", error)
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Something went wrong"
        }, {
            status: 500
        })
    }
}