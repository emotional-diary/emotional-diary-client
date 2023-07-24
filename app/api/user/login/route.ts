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

  return NextResponse.json({
    status: 'success',
    data: {
      user: {
        ...res.user,
        password: hashedPassword,
      },
    },
  });
}
