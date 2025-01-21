import {v2 as cloudinary} from 'cloudinary';
import { NextResponse } from "next/server";
import { prisma } from '@/app/db';
import { currentUser } from '@clerk/nextjs/server';

interface CloudinaryUploadResult {
    url: string;
  }

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function POST(req:Request){
    try {
        const formData = await req.formData();


        const title = formData.get("title") as string | null
        const description = formData.get("description") as string | null
        const thumbnail = formData.get("thumbnail") as File | null;
        const file = formData.get("video") as File | null;

        if(!file){
            return NextResponse.json({error:"No file uploaded"},{status:400})
        }

        if(!thumbnail){
            return NextResponse.json({error:"No thumbnail uploaded"},{status:400})
        }

        const videoBytes = await file.arrayBuffer();
        const videoBuffer = Buffer.from(videoBytes);

        const thumbnailBytes = await thumbnail.arrayBuffer();
        const thumbnailBuffer = Buffer.from(thumbnailBytes)

        const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            cloudinary.uploader.upload_stream({resource_type:"video",folder:"videos_upload"}, (error, result) => {
                if(error){
                    return reject(error);
                }
                resolve(result as CloudinaryUploadResult);
            }).end(videoBuffer);
        })

        const thumbnailRes = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            cloudinary.uploader.upload_stream({resource_type:"image",folder:"thumbnail_upload"}, (error, result) => {
                if(error){
                    return reject(error);
                }
                resolve(result as CloudinaryUploadResult);
            }).end(thumbnailBuffer);
        })

       const currUser = await currentUser();

       const user = await prisma.user.findFirst({
        where:{email:currUser?.emailAddresses[0].emailAddress}
       })

        const video = await prisma.video.create({
            data: {
              title: title || "",
              description: description || "",
              url: result?.url || "",
              thumbnail: thumbnailRes?.url || "",
              user:{
                connect:{
                    id: user?.id
                }
              }
            },
          });

        return NextResponse.json({message:"Video Uploaded Succesfully",video}, {status:200})
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}