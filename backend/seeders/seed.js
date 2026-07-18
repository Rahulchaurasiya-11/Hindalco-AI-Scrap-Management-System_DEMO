require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Department = require("../models/Department");
const User = require("../models/user");

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {

    await Department.deleteMany();
    await User.deleteMany();

    const departments = await Department.insertMany([
      { departmentName: "Rolling Mill" },
      { departmentName: "Casting Unit" },
      { departmentName: "Extrusion Plant" },
      { departmentName: "Smelting Unit" },
      { departmentName: "Quality Control" }
    ]);

    const hashedPassword =
      await bcrypt.hash("admin123", 10);

    await User.insertMany([
      {
        username: "admin",
        email: "admin@hindalco.com",
        password: hashedPassword,
        role: "ADMIN"
      },
      {
        username: "manager",
        email: "manager@hindalco.com",
        password: await bcrypt.hash("manager123",10),
        role: "MANAGER",
        departmentId: departments[0]._id
      },
      {
        username: "user",
        email: "user@hindalco.com",
        password: await bcrypt.hash("user123",10),
        role: "USER",
        departmentId: departments[1]._id
      }
,
      {
        username: "rahul",
        password: await bcrypt.hash("rahul123", 10),
        email: "rahul@hindalco.com",
        role: "ADMIN"
      }
,
      {
        username: "shivam",
        password: await bcrypt.hash("hello", 10),
        email: "shivam@hindalco.com",
        role: "USER"
      }


     
    ]);

    console.log("Seed Data Inserted Successfully");

    process.exit();

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedData();