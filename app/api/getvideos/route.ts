import prisma from "@/app/db";
import { NextResponse } from "next/server";

export async function GET (){
    try {
        const videos = await prisma.video.findMany({
            include:{
                user:{
                    select:{
                        email:true,
                        username:true,
                        image:true,
                        firstname:true,
                        lastname:true,
                        videos:true
                    }
                }
            }
        });

        if(!videos){
            return NextResponse.json({message:"No Video available"},{status:401})
        }

        return NextResponse.json({videos},{status:200})
    } catch (error) {
        return NextResponse.json({error},{status:401})
    }
}