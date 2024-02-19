import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  context: { params: { diaryID: string } }
) {
  try {
    const diaryID = context.params.diaryID;
    const accessToken = request.cookies.get('accessToken');

    console.log('diaryID', diaryID);
    console.log('accessToken', accessToken);

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

    const res = await axios.put(
      `${process.env.SERVER_HOST}/v1/users/diary/${diaryID}/ai`,
      {},
      {
        headers: {
          authorization: `Bearer ${accessToken.value}`,
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
