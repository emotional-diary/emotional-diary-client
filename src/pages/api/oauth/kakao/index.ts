import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const Authorization = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const clientId = process.env.KAKAO_REST_API_KEY;
    const redirectUri = 'http://localhost:3000/api/oauth/kakao/callback';
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

    res.json({
      status: 200,
      message: '카카오 인증 페이지로 이동합니다.',
      url: kakaoAuthUrl,
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: 500,
      message: '서버 에러',
    });
  }
};

export default Authorization;
