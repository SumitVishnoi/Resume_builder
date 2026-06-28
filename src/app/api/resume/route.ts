
import { connectDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import resumeModel from "@/models/Resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, res: NextResponse) {
    try {
        await connectDb()
        const userId = await getCurrentUser()
        const resumes = await resumeModel.find({
            user_id: userId
        })

        return NextResponse.json<ApiResponse>({
            success: true,
            message: "all resumes fetched successfully",
            data: {
                resumes
            }
        }, {
            status: 200
        })
        } catch (error) {
        console.log("error in get all resumes", error) 
        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Something went wrong"
        }, {
            status: 500
        })
    }
}