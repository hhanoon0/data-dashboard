"use client"
import Image from "next/image";


export default function Showerror() {
    return (

              <div className="logo flex items-center">
                <Image
                  src="/V1.svg"
                  alt="Logo"
                  width={200}
                  height={200}
                  className="logo-image"
                />
                <br/>
                <h1 style={{ textAlign: "center", marginBottom: "0rem", fontSize: "2rem", fontWeight: "600", color: "white" }}>
                  Oops! Something went wrong.
                </h1>
              </div>
    )
};