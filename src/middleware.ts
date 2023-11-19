import { ROUTES } from "./utils/routes";
import { COOKIES } from "@/utils/keysName";
import { NextResponse, type NextRequest } from "next/server";

// TODO: сделать защитные маршруты
export function middleware(req: NextRequest) {
	const refreshToken = req.cookies.get(COOKIES.REFRESH_TOKEN)?.value;

	if (!refreshToken) {
		return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: `/profile/:path*`,
};
