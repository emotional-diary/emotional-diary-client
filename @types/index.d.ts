interface User {
  nickname: string;
  email: string;
  password: string;
  birthday: string;
  gender: string;
}

type UserValidationKeys = keyof User | 'passwordCheck';

type UserValidation = Record<
  UserValidationKeys,
  {
    status: boolean;
    message: string;
  }
>;

type Social = 'kakao' | 'naver' | 'google';
