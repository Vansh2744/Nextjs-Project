"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

interface Video {
  url: string;
  title: string;
  description: string;
  thumbnail: string;
}
interface User {
  image: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  videos: Video[];
}

function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/getProfile");
        setUser(res.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="px-40">
      <div className="mt-10 flex">
        {user && (
          <Image
            src={
              user?.image ||
              "https://res.cloudinary.com/djkqpnoks/image/upload/v1734583859/pek6axvgyifougyfqzmc.jpg"
            }
            width={200}
            height={200}
            alt="User profile"
            className="w-[200px] h-[200px] rounded-full shadow-lg shadow-orange-600"
          />
        )}
        <div className="ml-10 flex flex-col gap-3 justify-center text-xl text-orange-600">
          <h1 className="text-3xl font-bold">{user?.username}</h1>
          <h1>{user?.email}</h1>
          <h1>
            {user?.firstname} {user?.lastname}
          </h1>
        </div>
      </div>
      <hr className="mt-10" />
      <div className="my-20 flex gap-10 flex-wrap">
        {user &&
          user?.videos.map((video, index) => (
            <div key={index} className="shadow-lg shadow-gray-600 ">
              <video
                controls
                className="w-[355px] h-[200px]"
                poster={video.thumbnail}
              >
                <source src={video.url} type="video/mp4" />
              </video>
              <div className="p-5 flex flex-col gap-3">
                <h1 className="font-extrabold text-lg text-gray-300">
                  {video.title}
                </h1>
                <p className="text-gray-600">{video.description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
