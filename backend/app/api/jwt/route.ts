
import { NextRequest, NextResponse } from 'next/server';
import { jwtSign } from '@/lib/jwt';

// buat fungsi untuk membuat token
export const POST = async (request: NextRequest) => {
    const { code } = await request.json();

    // jika code bukan "uti"
    if (code != 'BBC') {
        // buat token
        return NextResponse.json(
        {
          success: false,
          token: process.env.CREDENTIAL_INVALID_MESSAGE,
          status: 401
        }, 
        {
          status: 200
        }
      )
    }

    // buat token
    const token = jwtSign({ code });
    return NextResponse.json(
    {
      success: true,
      token: token,
      status: 200
    },
    {
      status: 200
    }
  )
}
