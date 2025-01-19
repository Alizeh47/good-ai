import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: "You must be logged in." }),
      {
        status: 401,
      }
    );
  }

  return NextResponse.json({
    content:
      "This is protected content. You can access this content because you are signed in.",
    user: session.user,
  });
} 