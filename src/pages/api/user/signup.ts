import { NextApiRequest, NextApiResponse } from 'next';

import { compare, hash } from '@utils/bcrypt';

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  // 회원가입 시
  const hashedPassword = await hash(req.body.user.password);
  console.log(hashedPassword);

  // 로그인 시
  const match = await compare(req.body.user.password, hashedPassword);
  console.log(match);

  res.status(200).json({
    status: 'success',
    data: {
      user: {
        ...req.body.user,
        password: hashedPassword,
      },
    },
  });
};

export default signup;
