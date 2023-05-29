import { NextApiRequest, NextApiResponse } from 'next';

import { compare, hash } from '@utils/bcrypt';

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  // 회원가입 시
  const hashedPassword = await hash(req.body.user.password);
  console.log(hashedPassword);

  // 로그인 시
  const match = await compare(req.body.user.password, hashedPassword);
  console.log(match);

  // 쿠키 설정
  res.setHeader(
    'Set-Cookie',
    `accessToken=${encodeURIComponent(
      req.body.user.nickname
    )};Max-Age=3600;HttpOnly;Secure;Path=/`
  );

  delete req.body.user.password;

  res.status(200).json({
    user: {
      ...req.body.user,
      // password: hashedPassword,
    },
  });
};

export default signup;
