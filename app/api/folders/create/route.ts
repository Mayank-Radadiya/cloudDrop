import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
  } catch (error) {
    console.log("Error in create folder route", error);
    return new Response("Error creating folder", { status: 500 });
  }
}
