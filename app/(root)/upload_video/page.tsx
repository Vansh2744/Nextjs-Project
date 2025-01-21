"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function UploadVideo() {
  const [video, setVideo] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const MaxFileSize = 80 * 1024 * 1024;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    if (!video) {
      return;
    }

    if (video.size > MaxFileSize) {
      toast.error("File size is too large");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);
    formData.append("thumbnail", thumbnail!);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const result = await axios.post("/api/uploads", formData);
      console.log(result);
      toast.success("Video uploaded successfully");
      setLoading(false);
      setTitle("");
      setDescription("");
      setVideo(null);
      setThumbnail(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="text-3xl font-bold flex justify-center items-center mt-[300px] text-orange-600">
        Uploading...
      </div>
    );
  }
  return (
    <div className="px-40 mt-20">
      <div className="h-[600px] shadow-lg shadow-orange-600">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-10 items-center py-10 px-10"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-bold text-lg">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="text-black px-4 py-2 w-[600px] rounded-lg focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="font-bold text-lg">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="text-black px-4 py-2 w-[600px] rounded-lg focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="thumbnail" className="font-bold text-lg">
              Upload Thumnail
            </label>
            <input
              type="file"
              name="thumbnail"
              accept="thumbnail/*"
              onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
              className="mr-[300px] bg-gray-700 px-5 py-2 rounded-lg w-[300px] hover:bg-orange-500 font-bold cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="video" className="font-bold text-lg">
              Upload Video
            </label>
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files?.[0] || null)}
              className="mr-[300px] bg-gray-700 px-5 py-2 rounded-lg w-[300px] hover:bg-orange-500 font-bold cursor-pointer"
            />
          </div>
          <button
            type="submit"
            className="bg-orange-600 px-4 py-2 rounded-lg w-[300px] hover:bg-orange-500 font-bold"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadVideo;
