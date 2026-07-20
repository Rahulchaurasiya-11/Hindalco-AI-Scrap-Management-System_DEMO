require("dotenv").config();
const path = require('path');
const express = require("express");

const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const departmentRoutes =require("./routes/departmentRoutes");
const app = express();
const scrapRoutes =require("./routes/scrapRoutes");
const recyclingRoutes =require("./routes/recyclingRoutes");
const dashboardRoutes =require("./routes/dashboardRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const predictionRoutes = require("./routes/predictionRoutes");
// console.log("Reports Route Loaded");
const reportsRoutes = require("./routes/reportsRoutes");


connectDB();
app.use(cors());

app.use(express.static(path.join(__dirname, '../frontend'))); 

// app.use("/api/scrap",scrapRoutes);
app.use(express.json());

app.use("/api/auth", authRoutes); //.........
app.use("/api/departments",departmentRoutes);
app.use("/api/scrap", scrapRoutes);
 app.use("/api/recycling",recyclingRoutes);

app.use("/api/dashboard",dashboardRoutes);
app.use("/api/inventory",inventoryRoutes);
app.use("/api/predictions",predictionRoutes);
app.use("/api/reports",reportsRoutes);

app.use(express.static(path.join(__dirname, '../frontend')));

// app.get("/", (req, res) => {
  //   res.send("Hindalco AI Scrap Management API Running");
  // });
  // const path = require('path');
  
  // app.get("/test-report", (req,res)=>{
    //    res.send("TEST REPORT WORKING");
    // });
    // app.get("/", (req, res) => {
      //   res.send(" RAHUL TEST SERVER");
      // });
      
      // app.get('/', (req, res) => {
        //   res.sendFile(path.join(__dirname, '../frontend', '../frontend/pages/login.html'));
        // });
        
        
        
        app.get('/*any', (req, res) => {
          res.sendFile(path.join(__dirname, '../frontend', 'login.html'));
        });
        
        // app.use(express.static(path.join(__dirname, '../frontend')));
        // app.get('*', (req, res) => {
          //   res.sendFile(path.join(__dirname, '../frontend', '../frontend/pages/login.html'));
          // });
          
          const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});


console.log("AUTH ROUTE LOADED");
console.log("REPORT ROUTE LOADED");