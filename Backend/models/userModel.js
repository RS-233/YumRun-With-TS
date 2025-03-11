import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData:{type:Object,default:{}},
    isAdmin: { type:Boolean, required: true, default: false}
}, { minimize: false })

const userModel = mongoose.models.user || mongoose.model("user",userSchema);

export default userModel;