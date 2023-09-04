import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          message: 'Non-login',
        },
        {
          status: 200,
        }
      );
    }

    return NextResponse.redirect('/');
  } catch (error) {
    console.error(`${__dirname} error`, error);

    return NextResponse.json(error, {
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const res = await axios.post(
      `${process.env.SERVER_HOST}/v1/users/login/local`,
      req
    );
    const { data } = res.data;

    return NextResponse.json(res.data, {
      headers: {
        'Set-Cookie': `accessToken=${encodeURIComponent(
          data.accessToken
        )};Max-Age=3600;HttpOnly;Secure;Path=/`,
      },
    });
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
