import { IResume } from "@/types/resume.types"
import mongoose from "mongoose"

const resumeSchema = new mongoose.Schema<IResume> ({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        default: ""
    },
    summary: {
        type: String,
        default: ""
    },
    personalInfo: {
        type: {
            fullname: String,
            email: String,
            mobile: String,
            location: String,
            githubUrl: String,
            linkedIn: String,
            portfolio: String
        },
        default: {}
    },
    workExperience: {
        type: [
            {
                company: String,
                position: String,
                startDate: String,
                endDate: String,
                description: String
            }
        ],
        default: []
    },
    projects: {
        type: [
            {
                title: String,
                description: String,
                githubUrl: String,
                liveUrl: String,
                techStack: [String]
            }
        ],
        default: []
    },
    skills: {
        type: [String],
        default: []
    },
    education: {
        type: [
             {
                institute: String,
                degree: String,
                field: String,
                gpa: Number,
                startDate: String,
                endDate: String
             }
        ],
        default: []
    },
    certification: {
        type: [
            {
                name: String,
                issuer: String,
                year: String
            }
        ],
        default: []
    }
}, {
    timestamps: true
})

const resumeModel = mongoose.models.resume || mongoose.model("resume", resumeSchema)

export default resumeModel