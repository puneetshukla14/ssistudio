import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  username: String,
  password: String, // already hashed from Excel
});

export const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
