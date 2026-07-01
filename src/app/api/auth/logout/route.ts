import { verifyToken } from "@/lib/generateToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = await req.cookies.get("token");

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "User is not logged in",
      },
      {
        status: 401,
      },
    );
  }

  const decoded = verifyToken(token.value);

  if (!decoded) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const response = NextResponse.json(
    {
      success: true,
      message: "User logged out successfully",
    },
    {
      status: 200,
    },
  );

  response.cookies.delete("token");

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return response;
}
