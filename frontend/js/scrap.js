const token = localStorage.getItem("token");

// Presentation Mock Data (Initial 3-4 entries jo screen par hamesha dikhengi)
let defaultScrap = [
    { _id: "mock1", scrapName: "Aluminum Sheet Offcuts", scrapType: "Aluminum", weight: 500, departmentId: { departmentName: "Rolling Mill" }, status: "RECYCLED" },
    { _id: "mock2", scrapName: "Burnt Copper Cable", scrapType: "Copper", weight: 350, departmentId: { departmentName: "Smelter Plant" }, status: "RECYCLED" },
    { _id: "mock3", scrapName: "Heavy Steel Structural Scrap", scrapType: "Steel", weight: 450, departmentId: { departmentName: "Fabrication" }, status: "PENDING" },
    { _id: "mock4", scrapName: "Slag Waste", scrapType: "Hazardous", weight: 240, departmentId: { departmentName: "Boiler" }, status: "PENDING" }
];

const mockDepartments = [
    { _id: "dept1", departmentName: "Rolling Mill" },
    { _id: "dept2", departmentName: "Smelter Plant" },
    { _id: "dept3", departmentName: "Fabrication" },
    { _id: "dept4", departmentName: "Boiler" }
];

let scrapData = JSON.parse(localStorage.getItem("permanentScrapData")) || defaultScrap;
// Agar pehli baar run ho raha hai, toh localStorage set kar do
if(!localStorage.getItem("permanentScrapData")){
    localStorage.setItem("permanentScrapData", JSON.stringify(defaultScrap));
}
















// 1. Dropdown Me Departments Load Karna

async function loadDepartments() {
    const dropdown = document.getElementById("department");
    try {
        const res = await fetch("http://localhost:5000/api/departments", {
            headers: { "Authorization": token ? `Bearer ${token}` : "" }
        });

        if (res.ok) {
            const departments = await res.json();
            if (departments.length > 0) {
                dropdown.innerHTML = "";
                departments.forEach(dep => {
                    dropdown.innerHTML += `<option value="${dep._id}">${dep.departmentName}</option>`;
                });
                return;
            }
        }
    } catch (err) {
        console.warn("Backend unavailable. Loading plant departments in dropdown.");
    }

    // Fallback if backend fails
    dropdown.innerHTML = "";
    mockDepartments.forEach(dep => {
        dropdown.innerHTML += `<option value="${dep._id}">${dep.departmentName}</option>`;
    });
}




// 2. Data Table Me Show Karna
function renderTable(data) {
    const table = document.getElementById("scrapTable");
    table.innerHTML = "";

    if (data.length === 0) {
        table.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#aaa;">No scrap records found.</td></tr>`;
        return;
    }

    data.forEach(item => {
        // Status color dynamic karne ke liye logic
        const statusColor = item.status === "RECYCLED" ? "#2ecc71" : "#f1c40f";

        table.innerHTML += `
            <tr>
                <td><strong>${item.scrapName}</strong></td>
                <td>${item.scrapType}</td>
                <td>${item.weight} KG</td>
                <td>${item.departmentId?.departmentName || "Main Plant"}</td>
                <td><span style="color: ${statusColor}; font-weight:bold;">● ${item.status}</span></td>
                <td>
                    <button class="delete-btn" onclick="deleteScrap('${item._id}')">🗑️ Delete</button>
                </td>
            </tr>
        `;
    });
}










// async function loadDepartments() {

//     const res = await fetch(
//         "http://localhost:5000/api/departments",
//         {
//             headers: {
//                 Authorization: token
//             }
//         });

//     const departments =
//         await res.json();

//     const dropdown =
//         document.getElementById(
//             "department"
//         );

//     dropdown.innerHTML = "";

//     departments.forEach(dep => {

//         dropdown.innerHTML += `
//      <option value="${dep._id}">
//       ${dep.departmentName}
//      </option>
//      `;

//     });

// }


// 3. Backend aur Local Se Records Load Karna
async function loadScrap() {
    try {
        const res = await fetch("http://localhost:5000/api/scrap", {
            headers: { "Authorization": token ? `Bearer ${token}` : "" }
        });
        if (res.ok) {
            const backendData = await res.json();
            if (backendData.length > 0) {
                scrapData = backendData;
            }
        }
    } catch (err) {
        console.warn("Backend unavailable. Using local mock array for presentation.");
    }
    renderTable(scrapData);
}









// 4. Naya Scrap Data Create Karna
// 4. Naya Scrap Data Create Karna
async function addScrap() {
    const scrapName = document.getElementById("scrapName").value;
    const scrapType = document.getElementById("scrapType").value;
    const weight = document.getElementById("weight").value;
    const departmentSelect = document.getElementById("department");
    const departmentId = departmentSelect.value;
    const departmentName = departmentSelect.options[departmentSelect.selectedIndex].text;

    if (!scrapName || !weight || !departmentId) {
        alert("Please fill all the fields!");
        return;
    }

    const newScrapObj = {
        scrapName,
        scrapType,
        weight: Number(weight),
        departmentId: departmentId,
        status: "PENDING" // Strict Uppercase taaki dashboard queries directly access kar sakein
    };
    try {
        const res = await fetch("http://localhost:5000/api/scrap", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? `Bearer ${token}` : ""
            },
            body: JSON.stringify(newScrapObj)
        });

        if (res.ok) {
            alert("Scrap Added Successfully to Database!");
            loadScrap();
        } else {
            throw new Error("API error");
        }
    } catch (err) {
        console.warn("Backend post failed. Simulating local UI insert for demo.");
        

 // 🆕 Permanent Local Storage Insert
 const localMockEntry = {
    _id: "local_" + Date.now(),
    scrapName,
    scrapType,
    weight: Number(weight),
    departmentId: { departmentName: departmentName },
    status: "PENDING"
};


        scrapData.unshift(localMockEntry); // Sabse upar add hoga
        localStorage.setItem("permanentScrapData", JSON.stringify(scrapData)); // Storage update

        renderTable(scrapData);
        alert("Today's Scrap Added to Log successfully!");
    
        document.getElementById("scrapName").value = "";
        document.getElementById("weight").value = "";
    }
}
// 5. Data Records Delete Karna
async function deleteScrap(id) {
    if (!confirm("Are you sure you want to delete this scrap record?")) return;

    try {
        const res = await fetch(`http://localhost:5000/api/scrap/${id}`, {
            method: "DELETE",
            headers: { "Authorization": token ? `Bearer ${token}` : "" }
        });

        if (res.ok) {
            alert("Record Deleted Successfully from DB!");
            loadScrap();
            return;
        }
    } catch (err) {
        console.warn("Backend delete failed. Slicing local entry for presentation.");
    }

    // Local array filter mechanism (fallback)
    scrapData = scrapData.filter(item => item._id !== id);
    localStorage.setItem("permanentScrapData", JSON.stringify(scrapData)); // Update storage

    renderTable(scrapData);
}

// 6. Search Bar Filter Rule
function filterTable() {
    const value = document.getElementById("search").value.toLowerCase();
    const filtered = scrapData.filter(item => 
        item.scrapName.toLowerCase().includes(value) || 
        item.scrapType.toLowerCase().includes(value)
    );
    renderTable(filtered);
}

// App Initialization
loadDepartments();
loadScrap();
















// async function addScrap() {

//     const scrapName =
//         document.getElementById(
//             "scrapName"
//         ).value;

//     const scrapType =
//         document.getElementById(
//             "scrapType"
//         ).value;

//     const weight =
//         document.getElementById(
//             "weight"
//         ).value;

//     const departmentId =
//         document.getElementById(
//             "department"
//         ).value;

//     const res = await fetch(
//         "http://localhost:5000/api/scrap",
//         {
//             method: "POST",
//             headers: {
//                 "Content-Type":
//                     "application/json",
//                 Authorization: token
//             },
//             body: JSON.stringify({
//                 scrapName,
//                 scrapType,
//                 weight,
//                 departmentId,
//                 status: "PENDING"
//             })
//         });

//     if (res.ok) {

//         alert("Scrap Added");

//         loadScrap();

//     } else {

//         alert("Error Adding Scrap");

//     }

// }












// async function loadScrap() {

//     const res =
//         await fetch(
//             "http://localhost:5000/api/scrap",
//             {
//                 headers: {
//                     Authorization: token
//                 }
//             });

//     scrapData =
//         await res.json();

//     renderTable(scrapData);

// }

// function renderTable(data) {

//     const table =
//         document.getElementById(
//             "scrapTable"
//         );

//     table.innerHTML = "";

//     data.forEach(item => {

//         table.innerHTML += `
//  <tr>
//  <td>${item.scrapName}</td>
//  <td>${item.scrapType}</td>
//  <td>${item.weight}</td>
 
//  <td>${item.departmentId?.departmentName || "N/A"}</td>   
//  <td>${item.status}</td>
// <td>

// <button onclick="deleteScrap('${item._id}')">
// Delete
// </button>

//  </tr>
//  `;

//     });

// }

// function filterTable() {

//     const value =
//         document
//             .getElementById("search")
//             .value
//             .toLowerCase();

//     const filtered =
//         scrapData.filter(item =>

//             item.scrapName
//                 .toLowerCase()
//                 .includes(value)

//         );

//     renderTable(filtered);

// }

// async function deleteScrap(id) {

//     if (!confirm("Delete Scrap?"))
//         return;

//     await fetch(
//         `http://localhost:5000/api/scrap/${id}`,
//         {
//             method: "DELETE",
//             headers: {
//                 Authorization: token
//             }
//         }
//     );

//     loadScrap();

// }
// loadDepartments();
// loadScrap();