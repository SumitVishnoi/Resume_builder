import { connectDb } from "@/lib/db";
import { generateToken } from "@/lib/generateToken";
import userModel from "@/models/User.model";
import { ApiResponse } from "@/types/api.types";
import { RegisterBody } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb()

        const body: RegisterBody = await req.json()

        const {name, email, password, mobile} = body

        if(!name || !email || !password) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "All fields are required"
            }, {
                status: 400
            })
        }

        const isExisted = await userModel.findOne({email})

        if(isExisted) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "User already exists"
            }, {
                status: 409
            })
        }

        const newUser = await userModel.create({
            name,
            email,
            password,
            mobile
        })

        const token = generateToken({userId: newUser._id.toString()})

        const response = NextResponse.json({
            success: true,
            message: "User Registered successfully",
            data: {
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email
                }
            }
        }, {
            status: 201
        })

        response.cookies.set("token", token, {
            httpOnly: true,
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