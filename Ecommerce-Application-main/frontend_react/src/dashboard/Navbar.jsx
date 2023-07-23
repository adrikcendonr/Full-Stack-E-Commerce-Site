import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <a href="/dashboard" className="text-white font-semibold text-xl">
            Dashboard
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
