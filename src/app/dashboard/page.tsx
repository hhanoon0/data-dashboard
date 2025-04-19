"use client";

import React, { useEffect, useState } from "react";
import { fetchUserId } from "../../lib/api";
import ChartComponent from "../components/audit";
import { XPBarChart } from "../components/xp";
import { SkillsRadarChart } from "../components/skills";
import Header from "../components/header";

const DashboardPage = () => {
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("skills"); // State for active tab

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        paddingTop: "8rem",
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <Header />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h6 style={{ fontSize: "20px", fontWeight: "bold" }}>Talent Personal Info</h6>
      </div>

      {userData && (
        <div
          style={{
            marginBottom: "2rem",
            padding: "1rem",
            backgroundColor: "#2c2c2c",
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

      <h6 style={{ fontSize: "20px", fontWeight: "bold" }}>Talent Data</h6>

      {/* Tab Navigation */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button
          onClick={() => setActiveTab("skills")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: activeTab === "skills" ? "white" : "",
            color: activeTab === "skills" ? "black" : "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Skills
        </button>
        <button
          onClick={() => setActiveTab("xp")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: activeTab === "xp" ? "white" : "",
            color: activeTab === "xp" ? "black" : "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          XP
        </button>
        <button
          onClick={() => setActiveTab("audit")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: activeTab === "audit" ? "white" : "",
            color: activeTab === "audit" ? "black" : "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Audit
        </button>
      </div>

      {/* Conditionally Render Components */}
      <div
        style={{
          padding: "1rem",
          backgroundColor: "#2c2c2c",
          borderRadius: "8px",
        }}
      >
        {activeTab === "skills" && <SkillsRadarChart />}
        {activeTab === "xp" && <XPBarChart />}
        {activeTab === "audit" && <ChartComponent />}
      </div>
    </div>
  );
};

export default DashboardPage;



