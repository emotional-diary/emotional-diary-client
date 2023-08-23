import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const startAt = await request.nextUrl.searchParams.get('startAt');
    const endAt = await request.nextUrl.searchParams.get('endAt');
    const page = await request.nextUrl.searchParams.get('page');
    const size = await request.nextUrl.searchParams.get('size');

    const accessToken = request.cookies.get('accessToken');

    if (!accessToken) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        {
          status: 401,
          headers: {
            'Set-Cookie': `accessToken=;Max-Age=0;HttpOnly;Secure;Path=/`,
          },
        }
      );
    }

    const res = await axios.get(`${process.env.SERVER_HOST}/v1/users/diarys`, {
      headers: {
        authorization: `Bearer ${accessToken.value}`,
      },
    });

    console.log('res', res.data);

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
