import { NextResponse } from 'next/server';
import axios from 'axios';

import { hash } from '@utils/bcrypt';

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const hashedPassword = await hash(req.password);

    const res = await axios.post(`${process.env.SERVER_HOST}/v1/users/signup`, {
      ...req,
      password: hashedPassword,
    });
    const { data } = res.data;

    console.log('res', res.data);

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
