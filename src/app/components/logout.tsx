"use client";

import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi"; // Importing a logout icon from react-icons

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove the token (example: from localStorage)
    localStorage.removeItem("token");

    // Redirect to the main page
    router.push("/");
  };

  return (
    <button  onClick={handleLogout} className="logout-button flex items-center gap-2 w-28 h-10 p-2.5 bg-black rounded-[10px] border border-stone-50/40">
      <FiLogOut size={20} /> {/* Logout icon */}
      Logout
    </button>
  );
}