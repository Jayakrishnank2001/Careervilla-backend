import mongoose, { Schema,Document,ObjectId } from 'mongoose'

export interface AdminInterface extends Document{
    _id:ObjectId,
    username:string,
    password:string
}

const adminSchema:Schema=new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const AdminModel=mongoose.model<AdminInterface>('Admin',adminSchema)
export default AdminModel