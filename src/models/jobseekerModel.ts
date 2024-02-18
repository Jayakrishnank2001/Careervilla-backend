import mongoose ,{Schema,Document,ObjectId} from "mongoose";

export interface JobseekerInterface extends Document{
    _id:ObjectId,
    firstName:string,
    lastName:string,
    password:string,
    email:string,
    phoneNumber:string,
    isBlocked:boolean,
    gender:string,
    role:string | null,
    image:string |null,
    resume:string |null,
    location:string|null
}

const jobseekerSchema:Schema=new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    gender:{
        type:String
    },
    role:{
        type:String
    },
    image:{
        type:String
    },
    resume:{
        type:String
    },
    location:{
        type:String
    }
})

const JobseekerModel=mongoose.model<JobseekerInterface>('Jobseeker',jobseekerSchema)
export default JobseekerModel