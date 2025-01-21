"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/navbar/page";

const images = ["/social1.jpg", "/social2.jpg", "/social3.jpg", "/social4.jpg"];
const scroll = [
  "/scroll1.jpg",
  "/scroll2.jpg",
  "/scroll3.jpg",
  "/scroll4.jpg",
  "/scroll5.jpg",
];

function Home() {
  return (
    <div className="px-40">
      <Navbar />
      <div className="mt-[200px] flex justify-between">
        <div className="flex flex-col gap-5 text-5xl font-extrabold bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent animate-rainbow">
          <span>Create Your Videos</span>
          <span>And Share With The World</span>
          <span>
            With <span className="text-6xl text-shadow">VibeVid</span>
          </span>
        </div>
        <div className="grid grid-flow-row grid-cols-2 gap-10">
          {images.map((image, index) => (
            <div key={index}>
              <Image
                src={image}
                width={200}
                height={200}
                alt="not available"
                className="h-[150px] w-[150px] shadow-2xl shadow-orange-600 rounded-lg"
              ></Image>
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-hidden w-full mt-28">
        <div className="animate-scrollText flex">
          {scroll.map((image, index) => (
            <span key={index} className="mr-20">
              <Image
                src={image}
                width={100}
                height={100}
                alt="not available"
                className="h-[100px] w-[150px] rounded-lg "
              ></Image>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
