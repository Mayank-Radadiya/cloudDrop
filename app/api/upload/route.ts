import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { imageKit, userId: bodyUserId } = body;

    if (bodyUserId !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!imageKit || !imageKit.url) {
      return new Response("Invalid imageKit data", { status: 400 });
    }

    const fileData = {
      name: imageKit.name || "file",
      path: imageKit.path || `/dropbox/${userId}/${imageKit.name || "file"}`,
      size: imageKit.size || 0,
      type: imageKit.type || "image",
      fileUrl: imageKit.url,
      thumbnailUrl: imageKit.thumbnailUrl || "",
      userId: userId,
      parentId: null,
      isFolder: false,
      isStarred: false,
      isTrash: false,
    };

    const [newFile] = await db.insert(files).values(fileData).returning();

    return NextResponse.json(newFile);
  } catch (error) {
    console.log("Error uploading file:", error);
    return new Response("Error uploading file", { status: 500 });
  }
}
