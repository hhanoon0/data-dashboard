"use client";

import React, { useEffect, useState } from "react";
import { fetchUserId } from "../../lib/api";
import ChartComponent from "../components/audit";
import { XPBarChart } from "../components/xp";
import { SkillsRadarChart } from "../components/skills";
import {TotalXP} from "../components/totalxp"; // Import the TotalXP component}
import { Level } from "../components/level"; // Import the Level component
import { CodingSkillsRadarChart } from "../components/codingSkills";
import { TotalAudit } from "../components/totalaudits"; // Import the TotalAudit component


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
    return  <div>Error: {error}</div>;
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
        <h6 style={{ fontSize: "20px", fontWeight: "bold" }}>Talent Info</h6>
      </div>

      {userData && (


<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
<div
  style={{
    padding: "1rem",
    backgroundColor: "#2c2c2c",
    borderRadius: "8px",
  }}
>
  <h6 style={{ marginBottom: "1rem", fontSize: "18px", fontWeight: "bold" }}>Personal Info</h6>
  <p><strong>Username:</strong> {userData.id}</p>
          <p><strong>First Name:</strong> {userData.firstname}</p>
          <p><strong>Last Name:</strong> {userData.lastname}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>First game date:</strong> {userData.joinedAt}</p>
</div>
<div
  style={{
    padding: "1rem",
    backgroundColor: "#2c2c2c",
    borderRadius: "8px",  // Stack children vertically
    alignItems: "center" 
  }}
>
  <h6 style={{marginBottom: "1rem", fontSize: "18px", fontWeight: "bold" }}>Talent level</h6>


  <Level />
</div>
</div>


      )}

      <h6 style={{marginTop: "3rem"  ,fontSize: "20px", fontWeight: "bold" }}>Talent Data</h6>

      {/* Tab Navigation */}
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button
          onClick={(e) =>{ setActiveTab("skills");
            e.preventDefault();
            e.stopPropagation();
          }}
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
          onClick={(e) => {setActiveTab("xp");
            e.preventDefault();
            e.stopPropagation();
          }}
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
          onClick={(e) => {setActiveTab("audit");
            e.stopPropagation();
            e.preventDefault();
          }}
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
          backgroundColor: "",
          borderRadius: "8px",
        }}
      >
        {activeTab === "skills" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div
              style={{
                padding: "1rem",
                backgroundColor: "#2c2c2c",
                borderRadius: "8px",
              }}
            >
              <h6 style={{ marginBottom: "1rem", fontSize: "18px", fontWeight: "bold" }}>Technical Skills Progress</h6>
              <SkillsRadarChart />
            </div>
            <div
              style={{
                padding: "1rem",
                backgroundColor: "#2c2c2c",
                borderRadius: "8px",
              }}
            >
              <h6 style={{ marginBottom: "1rem", fontSize: "18px", fontWeight: "bold" }}>Coding Skills Progress</h6>
              <CodingSkillsRadarChart />
            </div>
          </div>
        )}
        {activeTab === "xp" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div
              style={{
                padding: "1rem",
                backgroundColor: "#2c2c2c",
                borderRadius: "8px",
              }}
            >
              <h6 style={{ marginBottom: "1rem", fontSize: "18px", fontWeight: "bold" }}>Projects XPs during 01</h6>
              <XPBarChart />
            </div>
            <div
              style={{
                padding: "1rem",
                backgroundColor: "#2c2c2c",
                borderRadius: "8px",
              }}
            >
              <h6 style={{ marginBottom: "1rem", fontSize: "18px", fontWeight: "bold" }}>Total XP</h6>
              <TotalXP />
            </div>
          </div>
        )}
        {activeTab === "audit" && (

<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
<div
  style={{
    padding: "1rem",
    backgroundColor: "#2c2c2c",
    borderRadius: "8px",
  }}
>
  <h6 style={{ marginBottom: "1rem", fontSize: "18px", fontWeight: "bold" }}>Audit Credit ratio</h6>
  <ChartComponent />
</div>
<div
  style={{
    padding: "1rem",
    backgroundColor: "#2c2c2c",
    borderRadius: "8px",
  }}
>
  <h6 style={{ marginBottom: "1rem", fontSize: "18px", fontWeight: "bold" }}>Total Audit transactions</h6>
  <TotalAudit />
</div>
</div>

        )}
      </div>
    </div>
  );
};

export default DashboardPage;



