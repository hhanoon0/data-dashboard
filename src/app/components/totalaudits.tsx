import React, { useEffect, useState } from "react";
import {TotalAudits} from "../../lib/api"; // Import the TotalAudits function


export const TotalAudit: React.FC = () => {
  const [totalAd, setTotal] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const sum = await TotalAudits(); // Call the updated XPsum function
        setTotal(sum); // Set the total XP in state
      } catch (err) {
        console.error("Error fetching total XP:", err);
        setError("Failed to fetch total XP");
      }
    };

    fetchTotal();
  }, []);
    console.log("totalxp:", totalAd); // Log the total XP
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%", // Ensures the content is vertically centered within the parent container
      }}
    >
      {totalAd !== null ? (
        <p style={{ fontSize: "100px", margin: 0, fontWeight: "bold", color: "#FF2056" }}>
          {(totalAd)}
          <span style={{ fontSize: "40px", fontWeight: "lighter", marginLeft: "5px" }}>Audits</span>
        </p>
      ) : (
        <p style={{ fontSize: "100px", margin: 0, fontWeight: "bold" }}>Loading...</p>
      )}
    </div>
  );
};

export default TotalAudit;