"use client"

import * as React from "react"
import { Userlevel } from "@/lib/api"
import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"

export const Level: React.FC = () => {
  const [totalLevel, setLevel] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const fetchTotalLevel = async () => {
      try {
        const sum = await Userlevel()
        setLevel(sum)
      } catch (err) {
        console.error("Error fetching total XP:", err)
        setError("Failed to fetch total XP")
      }
    }

    fetchTotalLevel()
  }, [])

  console.log("total-level", totalLevel)

  useEffect(() => {
    if (totalLevel !== null) {
      const timer = setTimeout(() => setProgress(totalLevel), 500)
      return () => clearTimeout(timer)
    }
  }, [totalLevel])

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div  style={{alignItems: "center", justifyContent: "center"}}>
<div style={{fontSize: "60px", fontWeight: "bold", color:"#FF2056", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
  {progress}
</div>    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
    <div style={{fontSize: "18px", fontWeight: "bold"}}>0</div>
    <div style={{fontSize: "18px", fontWeight: "bold"}}>128</div>
    </div>
  <Progress value={progress} className="w-[100%]" />
  </div>
)
}

export default Level




// export function Level() {
//   const [progress, setProgress] = React.useState(0)

//   React.useEffect(() => {
//     const timer = setTimeout(() => setProgress(66), 500)
//     return () => clearTimeout(timer)
//   }, [])

//   return <Progress value={progress} className="w-[100%]" />
// }

// export default Level;