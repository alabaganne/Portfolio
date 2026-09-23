import { NextResponse } from "next/server";

import { disabledPages } from "@/lib/disabled-pages";
import { privatePages } from "@/lib/private-pages";

const isPrivatePath = (pathname) =>
  privatePages.some((page) => pathname === page || pathname.startsWith(`${page}/`));

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (disabledPages.includes(pathname)) {
    return new NextResponse(null, { status: 404 });
  }

  const response = NextResponse.next();

  if (isPrivatePath(pathname)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, noimageindex");
  }

  return response;
}
