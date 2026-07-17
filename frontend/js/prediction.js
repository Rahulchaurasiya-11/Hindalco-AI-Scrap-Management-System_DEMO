// const token =
// localStorage.getItem("token");

// async function loadPrediction(){

//  const res =
//  await fetch(
//  "http://localhost:5000/api/predictions",
//  {
//   headers:{
//    Authorization:token
//   }
//  });

//  const data =
//  await res.json();

//  const labels =
//  data.map(x=>"Month "+x.month);

//  const values =
//  data.map(x=>x.predictedWeight);

//  const ctx =
//  document.getElementById(
//  "predictionChart"
//  );

//  new Chart(ctx,{
//   type:"line",
//   data:{
//    labels,
//    datasets:[
//    {
//     label:"Forecast",
//     data:values
//    }
//    ]
//   }
//  });

// }

// loadPrediction();
document.addEventListener("DOMContentLoaded", async () => {
    // LocalStorage se Auth Token nikalna (Kyunki backend me 'auth' middleware hai)
    const token = localStorage.getItem("token");
    const mainContainer = document.querySelector(".main");

    try {
        // Apne Backend ke sateh API call coordinate karna
        const response = await fetch("http://localhost:5000/api/predictions", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Agar auth token standard Bearer use karta hai
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch prediction data");
        }

        const forecastData = await response.json();

        // Data arrays extract karna
        const labels = forecastData.map(item => item.month);
        const values = forecastData.map(item => item.predictedWeight);

        // Dynamic Chart rendering modern dark styling ke sath
        const ctx = document.getElementById("predictionChart").getContext("2d");
        new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Forecasted Scrap (kg)",
                    data: values,
                    borderColor: "#38bdf8", // Glowing cyan line
                    backgroundColor: "rgba(56, 189, 248, 0.1)", // Smooth gradient area under line
                    borderWidth: 3,
                    tension: 0.3, // Smoother line curving
                    pointBackgroundColor: "#38bdf8",
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        labels: { color: '#f8fafc' } // Legend text bright white
                    }
                },
                scales: {
                    x: {
                        grid: { color: '#334155' }, // Slate gray grid grids
                        ticks: { color: '#94a3b8' }
                    },
                    y: {
                        grid: { color: '#334155' },
                        ticks: { color: '#94a3b8' }
                    }
                }
            }
        });

    } catch (error) {
        console.error("Error rendering prediction chart:", error);


        mainContainer.innerHTML += `<p style="color: #ef4444; margin-top: 20px;">Error loading prediction charts. Please ensure backend is running or login again.</p>`;

        // Error notification UI par handle karne ke liye fallback alert
        // document.querySelector(".chart-container").innerHTML = `<p style="color: #ef4444;">Error loading prediction charts. Please ensure backend is running or login again.</p>`;
    }
});
// const labels = [
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec"
// ];

// const values = [
//     520,
//     560,
//     610,
//     670,
//     730,
//     790
// ];

// new Chart(
//     document.getElementById("predictionChart"),
//     {
//         type: "line",
//         data: {
//             labels,
//             datasets: [{
//                 label: "Forecasted Scrap (kg)",
//                 data: values
//             }]
//         }
//     });