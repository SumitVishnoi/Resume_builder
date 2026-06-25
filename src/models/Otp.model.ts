import { Otp } from "@/types/otp.types";
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema<Otp>({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "10m"
    }
}, {
    timestamps: true
})

const otpModel = mongoose.model("otp", otpSchema)

export default otpModel