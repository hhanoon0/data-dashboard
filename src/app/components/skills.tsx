import React, { useEffect, useState } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from "recharts";
import { Mke } from "../../lib/api";

export function SkillsRadarChart () {
  const [skillsData, setSkillsData] = useState<{ type: string; amount: number }[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await Mke();
        if (Array.isArray(data.transaction)) {
          setSkillsData(data.transaction);
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
    <div style={{ maxWidth: "500px", margin: "0 auto", textAlign: "center", color: "#ffffff" }}>
      <h2>Skills Radar Chart</h2>
      <p>Visualizing skill levels</p>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" width={400} height={400} data={skillsData}>
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
      <div style={{ marginTop: "20px", fontSize: "14px" }}>
        <p style={{ color: "#aaaaaa" }}>Skill data overview</p>
      </div>
    </div>
  );
};

export default SkillsRadarChart;





