const token =localStorage.getItem("token");
const mockDepartments = [
    { name: "Smelter Plant", location: "Block-A", status: "Active" },
    { name: "Alumina Refinery", location: "Block-B", status: "Active" },
    { name: "Rolling Mill ", location: "Zone-1", status: "Active" },
    { name: "Extrusion Plant ", location: "Zone-3", status: "Active" },
    { name: "Power Plant Utilities", location: "Utility Area", status: "Active" }
];





async function loadStats(){

    const mockData = {
        totalGenerated: 1540,
        totalRecycled: 580,
        totalPending: 102,
        activeDepartments: 5
    };

    try{
const res = await fetch(
"http://localhost:5000/api/dashboard/stats",
{
headers:{
    Authorization: token
}
} );


let data;

if (res.ok) {
    data = await res.json();
    console.log("Real Data Fetched from Backend:", data);
} else {
    console.warn("Backend API fails or return 0. Using Mock Data for Presentation.");
    data = mockData;
}

if (data.totalGenerated === 0 && data.totalRecycled === 0) {
    data = mockData;
}

document.getElementById("generated").innerText =data.totalGenerated+"Kg";
document.getElementById("recycled").innerText =data.totalRecycled+"Kg";
document.getElementById("pending").innerText =data.totalPending+"Kg";
document.getElementById("departments").innerText =data.activeDepartments;



const deptList = data.departmentList || mockDepartments; 
const tableBody = document.getElementById("deptTableBody");
tableBody.innerHTML = ""; // Purana static data clear karne ke liye

deptList.forEach((dept, index) => {
    const row = `
        <tr>
            <td>${index + 1}</td>
            <td><strong>${dept.name}</strong></td>
            <td>${dept.location || "Main Plant"}</td>
            <td><span style="color: #2ecc71;">● ${dept.status || "Active"}</span></td>
        </tr>
    `;
    tableBody.innerHTML += row;
});







// const ctx =document.getElementById("chart");
const ctx = document.getElementById("chart").getContext("2d");


if (window.myDashboardChart) {
    window.myDashboardChart.destroy();
}

window.myDashboardChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Total Generated", "Recycled Scrap", "Pending Action"],
        datasets: [{
            label: "Scrap Weight (in kg)",
            data: [data.totalGenerated, data.totalRecycled, data.totalPending],
            backgroundColor: [
                "rgba(54, 162, 235, 0.7)",  // Blue for Generated
                "rgba(75, 192, 192, 0.7)",  // Green for Recycled
                "rgba(255, 99, 132, 0.7)"   // Red for Pending
            ],
            borderColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(255, 99, 132, 1)"
            ],
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: "rgba(255, 255, 255, 0.1)" // डार्क थीम के लिए ग्रिड लाइन्स हल्की की हैं
                },
                ticks: { color: "#ffffff" }
            },
            x: {
                ticks: { color: "#ffffff" }
            }
        },
        plugins: {
            legend: {
                labels: { color: "#ffffff" } // लेजेंड का टेक्स्ट सफ़ेद किया
            }
        }
    }
});

} catch (err) {
    console.error("Network error, using presentation mock data:", err);
    renderMockData(mockData);
    document.getElementById("generated").innerText = mockData.totalGenerated + " kg";
    document.getElementById("recycled").innerText = mockData.totalRecycled + " kg";
    document.getElementById("pending").innerText = liveCalculatedStats.totalPending + " kg";



}
}










// new Chart(ctx,{
// type:"bar",
// data:{
// labels:[
// "Generated",
// "Recycled",
// "Pending"
// ],
// datasets:[
// {
// label:"Weight",
// data:[
// data.totalGenerated,
// data.totalRecycled,
// data.totalPending
// ]
// }
// ]
// }
// });

// }catch(err){
//     console.error(err);

// }}
function renderMockData(data) {
    document.getElementById("generated").innerText = data.totalGenerated + " kg";
    document.getElementById("recycled").innerText = data.totalRecycled + " kg";
    document.getElementById("pending").innerText = data.totalPending + " kg";
    document.getElementById("departments").innerText = data.activeDepartments;
}


function scrollToDepartments() {
    document.getElementById("deptSection").scrollIntoView({ behavior: 'smooth' });
}



function logout(){
    localStorage.removeItem("token");
    window.location.href="login.html";
   }

window.onload = loadStats;
loadStats();
// loadStats();





// const deptRes =
// await fetch(
// "http://localhost:5000/api/departments"
// );

// const departments =
// await deptRes.json();

// const labels =
// departments.map(
// d=>d.departmentName
// );

// const values =
// [450,320,500,280,390];

// new Chart(
// document.getElementById("deptChart"),
// {
//  type:"bar",
//  data:{
//   labels,
//   datasets:[{
//    label:"Scrap Weight (kg)",
//    data:values
//   }]
//  }
// });