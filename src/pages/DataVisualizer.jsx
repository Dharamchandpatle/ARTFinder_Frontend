import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

const DataVisualizer = ({ hashtags }) => {
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      if (!hashtags) return;

      try {
        const response = await fetch(
          `https://art-finder-server-khaki.vercel.app/analyse-posts`
        );
        if (!response.ok) {
          throw new Error("Error fetching analysis data.");
        }
        const data = await response.json();
        setAnalysisData(data.response); // Set analysis data to state
      } catch (error) {
        console.error("Error fetching analysis data:", error);
      }
    };

    fetchAnalysisData();
  }, [hashtags]);

  // Prepare Bar graph data with varied colors and reduced width
  const chartData = {
    labels: [
      "Quick and Precise Analysis",
      "Competitor Data",
      "Recommendations",
      "Best Links",
    ],
    datasets: [
      {
        label: "Analysis Breakdown",
        data: analysisData
          ? [
              analysisData.quickAnalysis || 30,
              analysisData.competitorData || 40,
              analysisData.recommendations || 50,
              analysisData.bestLinks || 60,
            ]
          : [30, 40, 50, 60],
        backgroundColor: [
          "#FF5733", // Red
          "#33FF57", // Green
          "#3357FF", // Blue
          "#FF33A8", // Pink
        ],
        borderColor: "#2C3E50", // Border color for bars
        borderWidth: 2,
        hoverBackgroundColor: "#2980B9", // Hover color
        hoverBorderColor: "#1C2833", // Hover border color
        barThickness: 25, // Further reduce bar width
        categoryPercentage: 0.7, // Reduced category width for better spacing
        barPercentage: 0.9, // Adjust the width of each individual bar
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Analysis Breakdown",
        font: {
          size: 18,
          weight: "bold",
          family: "Arial, sans-serif",
        },
        color: "#333",
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false, // Remove grid lines
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Light grid lines
        },
        ticks: {
          stepSize: 10, // Step size for Y-axis ticks
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="mt-6 flex justify-center">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
        <h3 className="text-2xl font-semibold text-center mb-4 text-gray-700">
          Analysis Visualization
        </h3>
        {analysisData ? (
          <div className="relative w-full h-80">
            <Bar data={chartData} options={chartOptions} />
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading analysis data...</p>
        )}
      </div>
    </div>
  );
};

export default DataVisualizer;
