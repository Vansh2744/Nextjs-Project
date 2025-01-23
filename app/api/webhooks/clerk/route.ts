import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    console.error("SIGNING_SECRET is not defined in the environment variables.");
    return new Response("Error: Missing SIGNING_SECRET", {
      status: 500,
    });
  }

  // Create new Svix instance with the secret
  const webhook = new Webhook(SIGNING_SECRET);

  // Retrieve headers
  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  // Validate the presence of required headers
  if (!svixId || !svixTimestamp || !svixSignature) {
    console.error("Missing Svix headers in the request.");
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  try {
    // Retrieve and verify the payload
    const payload = await req.json();
    const body = JSON.stringify(payload);

    const evt = webhook.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;

    // Process the webhook event
    if (evt.type === "user.created") {
      const {
        id,
        username,
        email_addresses: emailAddresses,
        first_name: firstName,
        last_name: lastName,
        image_url: imageUrl,
      } = evt.data;

      // Ensure email addresses are available
      if (!emailAddresses || emailAddresses.length === 0) {
        console.error("User created event has no email addresses.");
        return new Response("Error: Missing email addresses", {
          status: 400,
        });
      }

      // Create user in Prisma
      const newUser = await prisma.user.create({
        data: {
          clerkId: id,
          email: emailAddresses[0]?.email_address || "",
          username: username || "",
          firstname: firstName || "",
          lastname: lastName || "",
          image: imageUrl || "",
        },
      });

      // If user is created, update Clerk user metadata
      if (newUser) {
        const client = await clerkClient();
        await client.users.updateUserMetadata(id, {
          publicMetadata: {
            userId: newUser.id
          }
        })
      }

      console.log("User created and saved in the database:", newUser);
    }

    return new Response("Webhook processed successfully", { status: 200 });
  } catch (err) {
    console.error("Error processing webhook:", err);
    return new Response("Error: Verification or processing error", {
      status: 400,
    });
  }
}
