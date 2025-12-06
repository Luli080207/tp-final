import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../model/UserModel";

const JWT_SECRET = process.env.JWT_SECRET || "secretdev";

export const registerUser = async (email: string, password: string) => {
  const exists = await UserModel.findOne({ email }).exec();
  if (exists) throw new Error("Email ya registrado");
  const hashed = await bcrypt.hash(password, 10);
  const user = new UserModel({ email, password: hashed});
  await user.save();
  return { id: user._id, email: user.email, role: user.role};
};

export const loginUser= async (email: string, password: string) => {
  const user = await UserModel.findOne({ email }).exec();
  if (!user) throw new Error("Datos incorrectos");
  const ok = await bcrypt.compare(password, user.password);
  if(!ok) throw new Error("Datos incorrectos");
  const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "8h"}); 
  return { token};
}