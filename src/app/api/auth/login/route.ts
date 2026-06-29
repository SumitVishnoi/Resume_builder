import { connectDb } from "@/lib/db";
import { generateToken } from "@/lib/generateToken";
import userModel from "@/models/User.model";
import { ApiResponse } from "@/types/api.types";
import { LoginBody } from "@/types/user.types"
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
    try {
    
    await connectDb()

    const body: LoginBody = await req.json()

    const {email, password} = body;

    if(!email || !password) {
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "All fields are required"
        },{
            status: 400
        })
    }

    const user = await userModel.findOne({email})

    if(!user) {
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "User not found"
        }, {
            status: 404
        })
    }

    const isMatch = user.comparePass(password)

    if(!isMatch) {
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Invalid credentials"
        }, {
            status: 401
        })
    }

    const token = generateToken({userId: user._id.toString()})

    const response = NextResponse.json<ApiResponse>({
        success: true,
        message: "User loggedIn successfully",
        data: {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        }
    })

    response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 1000
    })

    return response
    } catch (error) {
         console.log("error in register api", error)
        return NextResponse.json<ApiResponse>({
            success: false, message: "Something went wrong", error: {
                error
            }
        }, { status: 500 })
    }
}