"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface Video {
  url: string;
  thumbnail: string;
  title: string;
  description: string;
}

function ProfilePage() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const firstname = searchParams.get("firstname");
  const lastname = searchParams.get("lastname");
  const image = searchParams.get("image");
  const videos = searchParams.get("videos");
  const parsedVideos: Video[] = videos ? JSON.parse(videos) : [];
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="px-40">
        <div className="mt-10 flex">
          <img
            src={
              image ||
              "https://res.cloudinary.com/djkqpnoks/image/upload/v1734583859/pek6axvgyifougyfqzmc.jpg"
            }
            width={200}
            height={200}
            alt="User profile"
            className="w-[200px] h-[200px] rounded-full shadow-lg shadow-orange-600"
          />
          <div className="ml-10 flex flex-col gap-3 justify-center text-xl text-orange-600">
            <h1 className="text-3xl font-bold">{username}</h1>
            <h1>
              {firstname} {lastname}
            </h1>
          </div>
        </div>
        <hr className="mt-10" />
        <div className="my-20 flex gap-10 flex-wrap">
          {parsedVideos?.map((video, index) => (
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
    </Suspense>
  );
}

export default ProfilePage;
