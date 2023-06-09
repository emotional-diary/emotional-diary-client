interface User {
  nickname: string;
  email: string;
  birthday: string;
  gender: string;
}

type JoinUser = User & {
  password: string;
};

type UserValidationKeys = keyof JoinUser | 'passwordCheck';

type UserValidation = Record<
  UserValidationKeys,
  {
    status: boolean;
    message: string;
  }
>;

type Social = 'kakao' | 'naver' | 'google';

type Calendar = {
  selectedDate: Date | null;
  // id: number;
  // title: string;
  // date: string;
  // startTime: string;
  // endTime: string;
};
