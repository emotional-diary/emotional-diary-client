import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.headers.get('authorization');

    if (!accessToken) {
      return NextResponse.json(
        {
          message: 'Unauthorized',
        },
        {
          status: 401,
          headers: {
            'Set-Cookie': `accessToken=;Max-Age=0;HttpOnly;Secure;Path=/`,
          },
        }
      );
    }

    const res = await axios.get(`${process.env.SERVER_HOST}/v1/users`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    } else {
      console.error(`${__dirname} error`, error);

      return NextResponse.json(error, {
        status: 500,
      });
    }
  }
}
