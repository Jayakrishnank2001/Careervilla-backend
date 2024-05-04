import { Date, ObjectId } from "mongoose";

interface Jobseeker {
    id?: string,
    firstName?: string,
    lastName?: string,
    password?: string,
    email?: string,
    phoneNumber?: string,
    isBlocked?: boolean,
    gender?: string,
    role?: string,
    image?: string,
    resume?: string,
    location?: string
    savedJobs?: SavedJob[];
    appliedJobs?: AppliedJob[];
    jobPreferences?: JobPreferences
    qualifications?: Qualifications
}
export default Jobseeker

export interface SavedJob {
    jobId: ObjectId;
    savedAt: Date;
}

export interface AppliedJob {
    jobId: ObjectId;
    appliedAt: Date;
}

export interface JobPreferences {
    jobTitles?: [string]
    jobTypes?: [string]
    minimumSalary?: string
}

export interface Qualifications {
    recentExperience?: string
    highestEducation?: string
    skills?: [string]
    languages?: [string]
}
