"use client";

import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

function Menubar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div
        className="h-8 w-12 bg-orange-600 rounded-full flex items-center justify-center ml-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <GiHamburgerMenu className="text-2xl" />
        {isOpen && (
          <div className="flex flex-col mt-48">
            <a
              href="/"
              className="bg-orange-600 hover:bg-orange-500 px-10 py-2"
            >
              Home
            </a>
            <a
              href="#"
              className="bg-orange-600 hover:bg-orange-500 px-10 py-2"
            >
              Explore
            </a>
            <a
              href="/upload_video"
              className="bg-orange-600 hover:bg-orange-500 px-10 py-2"
            >
              Upload
            </a>
            <a
              href="/dashboard"
              className="bg-orange-600 hover:bg-orange-500 px-10 py-2"
            >
              Dashboard
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menubar;
