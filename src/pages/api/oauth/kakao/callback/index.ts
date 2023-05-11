import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const clientId = process.env.KAKAO_REST_API_KEY;
    const redirectUri = 'http://localhost:3000/api/oauth/kakao/callback';

    const bodyData = {
      grant_type: 'authorization_code',
      client_id: clientId,
      redirectUri: redirectUri,
      code: req.query.code,
    } as {
      [key: string]: string;
    };

    const queryStringBody = Object.keys(bodyData)
      .map(key => `${key}=${bodyData[key]}`)
      .join('&');

    const result = await axios.post(
      'https://kauth.kakao.com/oauth/token',
      queryStringBody
    );

    res.setHeader(
      'Set-Cookie',
      `kakao_token=${result.data.access_token}; path=/; expires=${new Date(
        Date.now() + 60 * 60 * 24 * 1000
      ).toUTCString()}; httponly`
    );

    res.redirect('http://localhost:3000');
  } catch (error) {
    console.error(error);
    res.json({
      status: 500,
      message: '서버 에러',
    });
  }
};

// export default Authorization;
