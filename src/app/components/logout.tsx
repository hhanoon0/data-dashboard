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
    <button onClick={handleLogout} className="logout-button cursor-pointer flex items-center justify-center text-center gap-2 w-28 h-10 p-2.5 bg-white rounded-[10px] text-black">
      <FiLogOut size={20} /> {/* Logout icon */}
      Logout
    </button>
  );
}