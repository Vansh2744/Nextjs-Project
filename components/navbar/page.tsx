import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { IoCloudUploadOutline } from "react-icons/io5";

function Navbar() {
  return (
    <div>
      <div className="fixed top-5 right-0 w-full">
        <div className="flex justify-end mx-10 gap-40">
          <div className="flex gap-5 py-4 px-4 font-bold text-xl">
            <a href="/" className="relative group">
              <span className="group-hover:underline-offset-4 transition-all duration-300">
                Home
              </span>
              <span className="absolute left-0 bottom-0 h-[3px] w-0 bg-white transition-all duration-300 group-hover:w-full rounded-lg"></span>
            </a>

            <a href="/explore" className="relative group">
              <span className="group-hover:underline-offset-4 transition-all duration-300">
                Explore
              </span>
              <span className="absolute left-0 bottom-0 h-[3px] w-0 bg-white transition-all duration-300 group-hover:w-full rounded-lg"></span>
            </a>
            <a href="/dashboard" className="relative group">
              <span className="group-hover:underline-offset-4 transition-all duration-300">
                Dashboard
              </span>
              <span className="absolute left-0 bottom-0 h-[3px] w-0 bg-white transition-all duration-300 group-hover:w-full rounded-lg"></span>
            </a>
            <a
              href="/upload_video"
              className="bg-orange-600 px-4 py-1 flex gap-1 items-center rounded-full ml-5"
            >
              <IoCloudUploadOutline />
              Upload
            </a>
          </div>
          <div className="font-bold text-xl">
            <SignedOut>
              <div className="flex gap-5">
                <span className="bg-orange-600 px-4 py-1 rounded-2xl hover:bg-orange-500 cursor-pointer">
                  <SignInButton />
                </span>
                <span className="bg-orange-600 px-4 py-1 rounded-2xl hover:bg-orange-500 cursor-pointer">
                  <SignUpButton />
                </span>
              </div>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: "40px",
                      height: "40px",
                    },
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
