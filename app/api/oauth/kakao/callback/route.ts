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
    const { data } = res.data;

    console.log('res', res.data);

    // 회원가입이 안되어있으면 회원가입 페이지로 이동
    if (res.data.statusCode === 201) {
      return NextResponse.redirect(
        `/terms?social=${'kakao'}&email=${encodeURIComponent(
          data.email
        )}&gender=${encodeURIComponent(data.gender)}`,
        {
          status: 302,
        }
      );
    }

    return NextResponse.redirect('/', {
      status: 302,
      headers: {
        'Set-Cookie': `accessToken=${encodeURIComponent(
          data.accessToken
        )};Max-Age=3600;HttpOnly;Secure;Path=/`,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { origin } = absoluteUrl();

      // 이미 로컬 회원가입이 되어있으면 로그인 페이지로 이동
      if (error.response?.data.statusCode === 400) {
        return NextResponse.redirect(`${origin}/login`, {
          status: 302,
          headers: {
            'Set-Cookie': `message=${encodeURIComponent(
              error.response?.data.responseMessage
            )}; path=/;`,
          },
        });
      }
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
