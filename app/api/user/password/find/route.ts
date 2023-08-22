import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function PATCH(request: NextRequest) {
  try {
    const req = await request.json();

    const res = await axios.patch(
      `${process.env.SERVER_HOST}/v1/users/find-pwd`,
      {
        email: req.email,
        newPassword: req.newPassword,
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
