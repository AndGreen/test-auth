import { type NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = [
	"/signin",
	"/signup",
	"/reset-password",
	"/update-password",
	"/_next/",
	"/favicon.ico",
	"/public/",
	"/api/",
];

function isPublicPath(path: string) {
	return PUBLIC_PATHS.some((p) => path.startsWith(p));
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Allow public paths
	if (isPublicPath(pathname)) {
		return NextResponse.next();
	}

	// Check for Better Auth session cookie (commonly named 'better-auth.session' or similar)
	// You may need to adjust the cookie name based on your Better Auth config
	const session = request.cookies.get("better-auth.session");

	// If no session, redirect to /signin
	if (!session) {
		const signInUrl = request.nextUrl.clone();
		signInUrl.pathname = "/signin";
		signInUrl.searchParams.set("redirect", pathname);
		return NextResponse.redirect(signInUrl);
	}

	// If trying to access /dashboard and not authenticated, redirect
	if (pathname.startsWith("/dashboard") && !session) {
		const signInUrl = request.nextUrl.clone();
		signInUrl.pathname = "/signin";
		signInUrl.searchParams.set("redirect", pathname);
		return NextResponse.redirect(signInUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/(.*)"],
};
