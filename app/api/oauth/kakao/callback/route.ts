import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

import { absoluteUrl } from '@utils/ssr';

export async function GET(request: NextRequest) {
  try {
    const code = await request.nextUrl.searchParams.get('code');
    console.log('code', code);

    const clientId = process.env.KAKAO_REST_API_KEY;
    const { origin } = absoluteUrl();
    const redirectUri = `${origin}/api/oauth/kakao/callback`;

    const res = await axios.get(
      `${process.env.SERVER_HOST}/v1/users/login/kakao`,
      {
        params: {
          code,
        },
      }
    );

    console.log('res', res.data);

    // return NextResponse.redirect(res.data.url);
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
