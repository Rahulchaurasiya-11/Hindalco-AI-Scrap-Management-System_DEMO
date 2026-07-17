const token =localStorage.getItem("token");
const API_URL = "http://localhost:5000/api/recycling";


async function recycleScrap() {

    const scrapId =
        document.getElementById("scrapId").value.trim();

    const material =
        document.getElementById("material").valu.trim();

    const quantity =
        document.getElementById("quantity").value.trim();

        if (!scrapId || !material || !quantity) {
            alert("Please fill all the fields before submitting.");
            return;
        }
    
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Added Bearer prefix for standard auth
                },
                body: JSON.stringify({ scrapId, recycledMaterial: material, quantity })
            });
            if (res.ok) {
                alert("Scrap Recycled Successfully!");
                // Clear input fields after successful submission
                document.getElementById("scrapId").value = "";
                document.getElementById("material").value = "";
                document.getElementById("quantity").value = "";
                loadLogs();
            } else {
                const errData = await res.json();
                alert("Error: " + (errData.message || "Failed to recycle scrap"));
            }
        } catch (err) {
            console.error(err);
            alert("Server connection failed.");
        }
    }

    






//     await fetch(
//         "http://localhost:5000/api/recycling",
//         {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: token
//             },
//             body: JSON.stringify({
//                 scrapId,
//                 recycledMaterial: material,
//                 quantity
//             })
//         });

//     alert("Recycled Successfully");

//     loadLogs();

// }

async function loadLogs() {
    try {
    const res =
        await fetch(
            "http://localhost:5000/api/recycling",
            {
                headers: {
                    Authorization: token
                }
            });
            if (!res.ok) throw new Error("Failed to fetch logs");
    const data =
        await res.json();

    const table =
        document.getElementById(
            "recyclingTable"
        );

    table.innerHTML = "";

    if (data.length === 0) {
        table.innerHTML = `<tr><td colspan="2" style="text-align:center; color:#888;">No recycling logs found.</td></tr>`;
        return;
    }



    data.forEach(item => {
        // Safe check: agar recycledMaterial undefined hai toh fallback text dikhaye
        const materialText = item.recycledMaterial ? item.recycledMaterial : "Unknown Material";
        const quantityText = item.quantity !== undefined ? item.quantity : "0";

        table.innerHTML += `
            <tr>
                <td><span class="status-dot"></span> ${materialText}</td>
                <td class="bold-quantity">${quantityText} MT</td>
            </tr>
        `;
    });
} catch (err) {
    console.error("Error loading logs:", err);
}
}

// Initial load
loadLogs();





















//     data.forEach(item => {

//         table.innerHTML += `
//  <tr>
//  <td>${item.recycledMaterial}</td>
//  <td>${item.quantity}</td>
//  </tr>
//  `;

//     });

// }

// loadLogs();