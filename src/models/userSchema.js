import mongoose from "mongoose";
import AuthRoles from "../utils/AuthRoles.js";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true,"Name is required"],
        trim : true,
        maxLength:[50,"Name should not exceed 50 characters"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,],
        minLength:[8,"Password should contain atleast 8 characters"],
        select:false
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true,
        maxLength:[120,"Address should not exceed 120 characters"],
        trim:true
    },
    role:{
        type:String,
        enum:Object.values.AuthRoles,
        default:AuthRoles.USER
    }
}, {timestamps:true})

export default mongoose.model("User", userSchema)