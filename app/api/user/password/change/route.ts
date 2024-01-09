import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function PATCH(request: NextRequest) {
  try {
    const req = await request.json();
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          statusCode: 401,
          responseMessage: 'Unauthorized',
        },
        {
          status: 401,
          headers: {
            'Set-Cookie': `accessToken=;Max-Age=0;HttpOnly;Secure;Path=/`,
          },
        }
      );
    }

    const res = await axios.patch(
      `${process.env.SERVER_HOST}/v1/users/change-pwd`,
      {
        newPassword: req.newPassword,
      },
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );

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
