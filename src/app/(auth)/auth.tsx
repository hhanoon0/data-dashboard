"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./auth.css";
import Image from "next/image";

const AuthPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [jwt, setJwt] = useState<string | null>(null);
  const router = useRouter(); // Use Next.js router for navigation

  const handleLogin = async () => {
    setError(""); // Clear previous errors
    const credentials = btoa(`${usernameOrEmail}:${password}`);
    try {
      const response = await fetch("https://learn.reboot01.com/api/auth/signin", {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      setJwt(data.token); // Assuming the JWT is returned as `token`
      localStorage.setItem("jwt", data); // Store JWT in localStorage
      console.log("JWT:", data); // Log the JWT for debugging

      // Redirect to the dashboard after successful login
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="lava-lamp-container" style={{ zIndex:"50" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          zIndex: 1,
          position: "relative",
          backgroundColor: "#1e1e1e", // Dark background color
        }}
      >
        <div className="logo flex items-center">
                <Image
                  src="/V1.svg"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="logo-image"
                />
              </div>
        <br />
        <h1 style={{ textAlign: "center", marginBottom: "0rem", fontSize: "2rem", fontWeight: "600", color: "white" }}>
          Welcome to v1 dash
        </h1>
        <h1 style={{ textAlign: "center", marginBottom: "1rem", fontSize: "1rem", color: "white" }}>
          From data enthusiasts to data masters, we got you covered! 
        </h1>
        <br />
        {!jwt ? (
          <div
            style={{
              backgroundColor: "#1e1e1e",
              padding: "2rem",
              borderRadius: "8px",
              width: "400px",
              border: "1px solid #414141",
            }}
          >
            <h1 style={{ textAlign: "center", marginBottom: "1rem", color:"white" }}>Login to your account</h1>
            <br />
            <input
              type="text"
              placeholder="Username or Email"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()} // Trigger login on Enter
              style={{
                width: "100%",
                padding: "0.5rem",
                marginBottom: "1rem",
                borderRadius: "4px",
                backgroundColor: "#414141",
                color: "#8A8A8A",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()} // Trigger login on Enter
              style={{
                width: "100%",
                padding: "0.5rem",
                marginBottom: "1rem",
                borderRadius: "4px",
                backgroundColor: "#414141",
                color: "#8A8A8A",
              }}
            />

            <button
              onClick={handleLogin}
              style={{
                width: "100%",
                padding: "0.5rem",
                backgroundColor: "white",
                color: "black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
            {error && (
              <p style={{ color: "red", marginTop: "1rem", textAlign: "center" }}>
                {error}
              </p>
            )}
          </div>
        ) : null}
      </div>
      <div className="lava-lamp-background">
        <div className="lava-blob"></div>
        <div className="lava-blob"></div>
        <div className="lava-blob"></div>
        <div className="lava-blob"></div>
      </div>
    </div>
  );
};

export default AuthPage;