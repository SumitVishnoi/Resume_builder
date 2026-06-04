import { cookies } from "next/headers";
import { verifyToken } from "./generateToken";

export async function getCurrentUser() {
    const cookieStore = await cookies()

    const token = cookieStore.get('token')?.value

    if(!token) return new Error("token not found")

    const decode = verifyToken(token)

    if(!decode) return new Error("Unauthorize")

    if (typeof decode === "string") {
        throw new Error("Invalid token payload");
    }

    return decode.userId
}