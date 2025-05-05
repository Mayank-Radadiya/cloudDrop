import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";
import { auth } from "@clerk/nextjs/server";

const imageKit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

export async function GET(params: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorize User request" },
        { status: 401 }
      );
    }

    const authParams = imageKit.getAuthenticationParameters();

    return NextResponse.json(authParams);
  } catch (error) {
    console.log("Error from imageKit-auth", error);
    return NextResponse.json(
      {
        error: "Failed to generate a imageKit auth parameters",
      },
      { status: 500 }
    );
  }
}
