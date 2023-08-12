import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { absoluteUrl } from '@utils/ssr';

export async function GET(request: NextRequest) {
  try {
    const clientId = process.env.KAKAO_REST_API_KEY;
    const { origin } = absoluteUrl();
    const redirectUri = `${origin}/api/oauth/kakao/callback`;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

    return NextResponse.json({
      status: 200,
      message: '카카오 인증 페이지로 이동합니다.',
      url: kakaoAuthUrl,
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
