import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  username: String,
  password: String, // should already be hashed from Excel upload
});

export const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
