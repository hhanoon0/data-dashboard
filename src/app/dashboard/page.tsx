"use client";

import React, { useEffect, useState } from "react";
import { fetchUserId } from "../../lib/api"; // Import the fetchUserId function
import ChartComponent from "../components/audit"; 
import { XPBarChart } from "../components/xp"; // Import the XPBarChart component
import { SkillsRadarChart } from "../components/skills"; // Import the default export

const DashboardPage = () => {
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user ID using the imported function
        const data = await fetchUserId();

        const user = {
          id: data[1],
          firstname: data[2],
          lastname: data[3],
          email: data[4],
          joinedAt: new Date(data[5]).toLocaleDateString(),
        };
        setUserData(user);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
  }

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#1e1e1e", // Dark background color
        color: "#ffffff", // Light text color for contrast
        minHeight: "100vh",
      }}
    >
      <h6 style={{ fontSize: "20px", fontWeight: "bold" }}>Talent Personal Info</h6>

      {userData && (
        <div
          style={{
            marginBottom: "2rem",
            padding: "1rem",
            backgroundColor: "#2c2c2c", // Slightly lighter dark background for cards
            borderRadius: "8px",
          }}
        >
          <p><strong>ID:</strong> {userData.id}</p>
          <p><strong>First Name:</strong> {userData.firstname}</p>
          <p><strong>Last Name:</strong> {userData.lastname}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Joined Date:</strong> {userData.joinedAt}</p>
        </div>
      )}

      <h6 style={{ fontSize: "20px", fontWeight: "bold" }}> Talent Data</h6>

      {/* Grid Layout for Charts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#2c2c2c", // Slightly lighter dark background for cards
            borderRadius: "8px",

          }}
        >
          <p><strong>Audit Ratio</strong> </p>

          <ChartComponent />
        </div>

        <div
          style={{
            padding: "1rem",
            backgroundColor: "#2c2c2c", // Slightly lighter dark background for cards
            borderRadius: "8px",

          }}
        >
          <p><strong>BH-Module XP</strong> </p>
          <XPBarChart />
        </div>
      </div>
      <SkillsRadarChart/>
    </div>
  );
};

export default DashboardPage;



