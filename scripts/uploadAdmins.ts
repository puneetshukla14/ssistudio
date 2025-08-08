import mongoose from 'mongoose';
import * as XLSX from 'xlsx';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin';

dotenv.config();

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI!);
}

async function upload() {
  await connectDB();
  const workbook = XLSX.readFile('admins.xlsx');
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet) as { username: string; password: string }[];

  for (const user of data) {
    const existing = await Admin.findOne({ username: user.username });
    if (existing) continue;

    const hashedPassword = await bcrypt.hash(user.password, 10);
    await Admin.create({ username: user.username, password: hashedPassword });
  }

  console.log('Admins uploaded');
  process.exit(0);
}

upload();
