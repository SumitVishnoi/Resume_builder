import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const connectDb = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        console.log("DB connected")
    } catch (error) {
        console.log("mongoDB error", error)
        NextResponse.json(error)
    }
}