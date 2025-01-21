"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Video {
  url: string;
  title: string;
  description: string;
  thumbnail: string;
  user: {
    image: string;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    videos: Video[];
  };
}

function Explore() {
  const [videos, setVideos] = useState<Video[]>([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("/api/getvideos");
        console.log(res.data.videos);
        setVideos(res.data.videos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideos();
  }, []);

  if (videos.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div>
      <div>
        {videos && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
            {videos.map((video, index) => (
              <div key={index} className="shadow-lg shadow-gray-600 py-5">
                <video
                  controls
                  className="w-[355px] h-[200px]"
                  poster={video.thumbnail}
                >
                  <source src={video.url} type="video/mp4" />
                </video>
                <div className="flex justify-around items-center">
                  <Link
                    href={{
                      pathname: "/profile",
                      query: {
                        username: video.user.username,
                        email: video.user.email,
                        image: video.user.image,
                        firstname: video.user.firstname,
                        lastname: video.user.lastname,
                        videos: JSON.stringify(video.user.videos),
                      },
                    }}
                  >
                    <div>
                      <img
                        src={video.user.image}
                        className="w-14 h-14 rounded-full"
                      />
                    </div>
                  </Link>
                  <div className="p-5 flex flex-col gap-3">
                    <h1 className="font-extrabold text-lg text-gray-300">
                      {video.title}
                    </h1>
                    <p className="text-gray-600">{video.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore;
