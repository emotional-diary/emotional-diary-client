import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const accessToken = request.cookies.get('accessToken')?.value;

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

    console.log('req', req);
    console.log('accessToken', accessToken);

    const res = await axios.post(
      `${process.env.SERVER_HOST}/v1/users/verify-pwd`,
      { req },
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );

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
