import React, { useEffect, useState } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, ResponsiveContainer } from "recharts";
import { Mke } from "../../lib/api";

export function SkillsRadarChart () {
  const [skillsData, setSkillsData] = useState<{ type: string; amount: number }[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await Mke();
        if (Array.isArray(data.transaction)) {
          // Replace underscores with spaces in the type field
          const formattedData = data.transaction.map((item) => ({
            ...item,
            type: item.type.replace(/_/g, " "),
          }));
          setSkillsData(formattedData);
        } else {
          console.error("Unexpected data format:", data);
          setSkillsData([]);
        }
      } catch (error) {
        console.error("Error fetching skills data:", error);
        setSkillsData([]);
      }
    };

    fetchSkills();
  }, []);

  if (skillsData.length === 0) {
    return <p style={{ color: "#ffffff", textAlign: "center" }}>No skill data available</p>;
  }

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto", textAlign: "center", color: "#ffffff", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <ResponsiveContainer width="100%" aspect={1.2}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillsData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="type" stroke="#ffffff" />
          <Radar
            name="Skill Levels"
            dataKey="amount"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
      <div style={{ marginTop: "20px", fontSize: "14px" }}>
      </div>
    </div>
  );
};

export default SkillsRadarChart;





