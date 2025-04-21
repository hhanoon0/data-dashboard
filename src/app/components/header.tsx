"use client";

import Image from "next/image";
import Logout from "./logout";

export default function Header() {
  return (
    <header className="header fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4  h-20 p-2.5 bg-stone-950/60 backdrop-blur-xl  z-50 border-b border-white/10">
      {/* Logo */}
      <div className="logo flex items-center">
        <Image
          src="/V1.svg"
          alt="Logo"
          width={50}
          height={50}
          className="logo-image"
        />
      </div>

      {/* Logout Button */}
      <Logout />
    </header>
  );
}