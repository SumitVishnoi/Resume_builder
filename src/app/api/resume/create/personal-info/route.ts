import resumeModel from "@/models/Resume.model";
import { ApiResponse } from "@/types/api.types"
import { IPersonalInfo } from "@/types/resume.types"
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body: IPersonalInfo = await req.json()

        const {fullname, email, mobile, location, githubUrl, linkedIn, portfolio} = body;

        if(!fullname || !email || !mobile || !location || !githubUrl || !linkedIn) {
            return NextResponse.json<ApiResponse>({
                success: false,
                message: "All fields are required"
            }, {
                status: 400
            })
        }

        const personalInfo = await resumeModel.create({
            fullname,
            email,
            mobile,
            location,
            githubUrl,
            linkedIn,
            portfolio
        })

        return NextResponse.json<ApiResponse>({
            success: false,
            message: "personal-info completed successfully",
            data: {
                personalInfo
            }
        }, {
            status: 201
        })

    } catch (error) {
        console.log("error in personal-info", error)
        return NextResponse.json<ApiResponse> ({
            success: false,
            message: "Something went wrong"
        }, {
            status: 500
        })
    }
}
