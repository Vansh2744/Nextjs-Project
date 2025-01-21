import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/app/db";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const eventType = evt.type;
  console.log(evt.data);
  
  if (eventType === "user.created") {
    const { id, username, email_addresses, first_name, last_name, image_url} =
      evt.data;
    const newUser = await prisma.user.create({
      data: {
        clerkId: id,
        email: email_addresses[0].email_address,
        username: username as string,
        firstname: first_name as string,
        lastname: last_name as string,
        image: image_url,
      },
    });

    if(newUser){
      const client = await clerkClient();
      await client.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser.id
        }
      })
    }
  }

  return new Response("Webhook received", { status: 200 });
}
