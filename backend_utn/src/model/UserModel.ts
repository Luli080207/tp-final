import { model, Model, Schema } from "mongoose"
import IUser from "../interfaces/IUser"

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" } 
}, {
  versionKey: false
})

const User: Model<IUser> = model("User", userSchema)

export default User