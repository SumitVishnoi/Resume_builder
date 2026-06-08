import { connectDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import resumeModel from "@/models/Resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        await connectDb()

        const userId = await getCurrentUser()

        const resume = await resumeModel.create({
            user_id: userId,
            title: "",
            summary: "",
            personalInfo: {},
            education: [],
            projects: [],
            workExperience: [],
            skills: [],
            certification: []
        })

        return NextResponse.json<ApiResponse>({
            success: false,
            message: "Resume created successfully",
            data: {
                resume
            }
        }, {
            status: 201
        })
    } catch (error) {
        console.log("error in create resume api", error);
        return NextResponse.json<ApiResponse>(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}