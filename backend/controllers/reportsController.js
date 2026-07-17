const PDFDocument = require("pdfkit");

const path = require("path");

exports.exportPDF = async (req, res) => {
    try {
 // Testing ke liye Dummy Data (Jab DB connect ho jaye, to ise delete kar dena)
 const reportData = [
    { id: "001", item: "Aluminum Scrap", qty: "1,200 Kg", status: "Recycled" },
    { id: "002", item: "Copper Wire", qty: "450 Kg", status: "Pending" },
    { id: "003", item: "Iron Slag", qty: "3,100 Kg", status: "Processed" }
  ];







        const doc = new PDFDocument({ margin: 50 });

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=hindalco-report.pdf"
        );

        doc.pipe(res);

// ==========================================
    // HEADER: HINDALCO NAME & DEFAULT ADDRESS
    // ==========================================
    doc.fillColor("#002B49").fontSize(20).text("HINDALCO INDUSTRIES LIMITED", { align: "center" });
    doc.fillColor("#555555").fontSize(10).text("Renukoot Plant, Uttar Pradesh, India - 231217", { align: "center" });
    doc.text("Email: Rahulchaurasiya2612@gmail.com", { align: "center" });
    
    doc.moveDown(1);
    doc.strokeColor("#cccccc").lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke(); // Horizontal Line
    doc.moveDown(1.5);

    // ==========================================
    // DEFAULT EMPLOYEE & DEPARTMENT INFO
    // ==========================================
    doc.fillColor("#000000").fontSize(14).text("AI SCRAP MANAGEMENT REPORT", { underline: true });
    doc.moveDown(0.5);
    
    doc.fontSize(11).fillColor("#333333");
    doc.text(`Employee ID: EMP-2026-09`);
    doc.text(`Department: Scrap & Recycling Division`);
    doc.text(`Date & Time: ${new Date().toLocaleString()}`); // Auto Current Date & Time
    
    doc.moveDown(2);


 // ==========================================
    // AUTOMATIC TABLE DATA
    // ==========================================
    doc.fontSize(12).fillColor("#002B49").text("Scrap Inventory Log Details:", { bold: true });
    doc.moveDown(0.5);

    // Table Columns ki Position (X-axis)
    const tableTop = doc.y;
    const itemX = 50;
    const qtyX = 250;
    const statusX = 400;

    // Table Header Text
    doc.fontSize(11).fillColor("#000000");
    doc.text("Item Description", itemX, tableTop, { bold: true });
    doc.text("Quantity", qtyX, tableTop, { bold: true });
    doc.text("Status", statusX, tableTop, { bold: true });

    // Header ke niche thick line
    doc.strokeColor("#002B49").lineWidth(1.5).moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();
    
    let currentY = tableTop + 25;

 // Loop chalakar sara modification data automatic table me add hoga
 reportData.forEach((row) => {
    doc.text(row.item, itemX, currentY);
    doc.text(row.qty, qtyX, currentY);
    doc.text(row.status, statusX, currentY);
    
    // Har row ke niche ek patli divider line
    doc.strokeColor("#dddddd").lineWidth(0.5).moveTo(50, currentY + 15).lineTo(550, currentY + 15).stroke();
    currentY += 25;
  });



 // ==========================================
    // DEFAULT STAMP & SIGNATURE AREA
    // ==========================================
    const footerY = 650; // Page ke bottom me fixed location

    // 1. Hindalco Official Stamp (Auto Image Paste)
    try {
      const stampPath = path.join(__dirname, "../assets/hindalco-stamp.png");
      doc.image(stampPath, 70, footerY - 40, { width: 90 }); 
    } catch (err) {
      // Agar stamp image nahi mili to ye text backup dikhega error se bachne ke liye
      doc.fontSize(9).fillColor("red").text("[ Hindalco Official Stamp Area ]", 60, footerY);
    }

    // 2. Digital Signature Line
    doc.strokeColor("#333333").lineWidth(1).moveTo(400, footerY).lineTo(530, footerY).stroke();
    doc.fontSize(10).fillColor("#333333");
    doc.text("Authorized Signature", 410, footerY + 5);
    doc.fontSize(9).fillColor("#777777").text("AI Verification System", 415, footerY + 18);

    doc.end();

  } catch (error) {
    console.error("PDF Generate karne me error aayi:", error);
    res.status(500).send("Internal Server Error");
  }
};




















    //     const myGmail = "your.email@gmail.com";
    //     doc.fontSize(22)
    //         .text("HINDALCO - AI SCRAP MANAGEMENT SYSTEM", 50, 20, { align: "center" });


    //     doc.moveDown();
    //     doc.text("Generated Successfully");
    //     doc.text("Rahulchaurasiya2612@gmail.com");



    //     doc.end();
    // };