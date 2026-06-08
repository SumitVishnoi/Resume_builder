import { connectDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import resumeModel from "@/models/Resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> },
) {
  try {
    await connectDb();

    const { resumeId } = await params;
    console.log(resumeId);

    const userId = await getCurrentUser();

    const resume = await resumeModel.findOne({
      _id: resumeId,
      user_id: userId,
    });

    if (!resume) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "resume not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "resume fetched successfully",
        data: {
          resume,
        },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("error in resume fetched", error);
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> },
) {
  try {
    await connectDb();

    const { resumeId } = await params;

    const body = await req.json();

    const userId = await getCurrentUser();

    const updateResume = await resumeModel.findOneAndUpdate(
      {
        _id: resumeId,
        user_id: userId,
      },
      {
        $set: body,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateResume) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Resume updatation failed",
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Resume updated successfully",
        data: {
          updateResume,
        },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("error in resume updation", error);
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  try {
    const { resumeId } = await params;

    const userId = await getCurrentUser();

    const deletedResume = await resumeModel.findOneAndDelete({
      _id: resumeId,
      user_id: userId,
    });

    if (!deletedResume) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Resume not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Resume deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in delete resume:", error);

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}