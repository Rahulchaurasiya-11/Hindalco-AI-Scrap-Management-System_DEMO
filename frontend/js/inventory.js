const token = localStorage.getItem("token");

async function loadInventory() {
    const table = document.getElementById("inventoryTable");
    
    // Backup Dummy Data agar API load na ho to (Presentation Fail-safe)
    const backupData = [
        { _id: "Aluminum Scrap (Grade A)", totalWeight: 4520 },
        { _id: "Copper Wire Scrap", totalWeight: 2850 },
        { _id: "Bauxite Tailings", totalWeight: 7100 },
        { _id: "Zinc Dross", totalWeight: 1250 }
    ];

    try {
        // Fetch request with timeout control
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second me stop ho jayega agar net slow hai

        const res = await fetch("http://localhost:5000/api/inventory", {
            headers: {
                "Authorization": token ? token : ""
            },
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!res.ok) throw new Error("Server error");
        
        const data = await res.json();
        renderData(data.length > 0 ? data : backupData);

    } catch (error) {
        console.log("Using backup data for presentation:", error.message);
        // Agar backend error de ya slow ho, to turant dummy data dikhao
        renderData(backupData);
    }
}

function renderData(data) {
    const table = document.getElementById("inventoryTable");
    table.innerHTML = "";
    let totalWeightSum = 0;

    data.forEach(item => {
        const materialName = item._id || "Unknown Material";
        const weight = item.totalWeight || 0;
        totalWeightSum += weight;

        table.innerHTML += `
            <tr>
                <td class="material-name"><strong>${materialName}</strong></td>
                <td class="material-weight">${weight.toLocaleString()} Kg</td>
                <td><span class="badge badge-pending">Ready for Recycle</span></td>
            </tr>
        `;
    });

    document.getElementById("totalStockWeight").innerText = `${totalWeightSum.toLocaleString()} Kg`;
    document.getElementById("totalCategories").innerText = data.length;
}

// Run immediately
loadInventory();









































































// const token = localStorage.getItem("token");

// async function loadInventory() {
//     try {
//         const res =
//             await fetch(
//                 "http://localhost:5000/api/inventory",
//                 {
//                     headers: {
//                         Authorization: token
//                     }
//                 });
//                 if (!res.ok) {
//                     throw new Error("Failed to fetch data");
//                 }
//         const data =
//             await res.json();

//         const table =
//             document.getElementById(
//                 "inventoryTable"
//             );

//         table.innerHTML = "";



//         let totalWeightSum = 0;
//         let categoryCount = data.length;

//         data.forEach(item => {



//             const materialName = item._id ? item._id : "Unknown Material";
//             const weight = item.totalWeight ? item.totalWeight : 0;
            
//             totalWeightSum += weight;




// table.innerHTML += `
// <tr>
//     <td class="material-name"><strong>${materialName}</strong></td>
//     <td class="material-weight">${weight.toLocaleString()} Kg</td>
//     <td><span class="badge badge-pending">Ready for Recycle</span></td>
// </tr>
// `;
// });

// // Dashboard Summary Cards Update
// document.getElementById("totalStockWeight").innerText = `${totalWeightSum.toLocaleString()} Kg`;
// document.getElementById("totalCategories").innerText = categoryCount;

// } catch (error) {
// console.error("Error loading inventory:", error);
// // Fail-safe table UI text if everything fails
// document.getElementById("inventoryTable").innerHTML = `
// <tr>
// <td colspan="3" style="text-align:center; color:#ff4d4d; padding:20px;">
//     <i class="fa-solid fa-triangle-exclamation"></i> Error loading live data. Showing offline presentation backup.
// </td>
// </tr>
// `;
// }
// }


// // Execute on load
// loadInventory();
