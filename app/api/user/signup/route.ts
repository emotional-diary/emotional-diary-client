import { NextResponse } from 'next/server';

import { compare, hash } from '@utils/bcrypt';

export async function POST(request: Request) {
  const res = await request.json();
  console.log('res', res);

  // 회원가입 시
  const hashedPassword = await hash(res.user.password);
  console.log(hashedPassword);

  // 로그인 시
  const match = await compare(res.user.password, hashedPassword);
  console.log(match);

  delete res.user.password;

  return NextResponse.json(
    {
      user: res.user,
    },
    {
      status: 200,
      headers: {
        'Set-Cookie': `accessToken=${encodeURIComponent(
          res.user.nickname
        )};Max-Age=3600;HttpOnly;Secure;Path=/`,
      },
    }
  );
}
