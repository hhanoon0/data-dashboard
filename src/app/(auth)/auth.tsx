"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f5f5f5" }}>
      {!jwt ? (
        <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", width: "300px" }}>
          <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Login</h1>
          <input
            type="text"
            placeholder="Username or Email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "0.5rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
          {error && <p style={{ color: "red", marginTop: "1rem", textAlign: "center" }}>{error}</p>}
        </div>
      ) : null}
    </div>
  );
};

export default AuthPage;