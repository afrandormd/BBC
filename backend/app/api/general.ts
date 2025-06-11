
import { NextRequest, NextResponse } from "next/server";

import { jwtVerify } from "@/lib/jwt";


// buat fungsi cek token jwt
export const checkJwt = (request: NextRequest) => {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
        return NextResponse.json(
        {
          success: false,
          token: process.env.TOKEN_NOT_FOUND_MESSAGE,
          status: 401
        }, 
        {
          status: 200
        }
      )
    }

    const verify = jwtVerify(token);
    if (!verify) {
        return NextResponse.json(
        {
          success: false,
          token: process.env.TOKEN_INVALID_MESSAGE,
          status: 401
        },
        {
          status: 200
        }
      )
    }    
}
