interface User {
  userID: number;
  name: string;
  email: string;
  birth: string | null;
  gender: string | null;
  loginType: 'LOCAL' | Social;
  createdAt: string;
  updatedAt: string;
}

type JoinUser = Pick<User, 'name' | 'email' | 'birth' | 'gender'> &
  Partial<{
    password: string;
  }>;

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
  selectedDate: Date;
  // id: number;
  // title: string;
  // date: string;
  // startTime: string;
  // endTime: string;
};

type Diary = {
  diaryID: number;
  userID: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
  diaryAt: string;
  content: string;
  commentID: number;
  comment: string;
  emotion: 'happy' | 'sad' | 'angry' | 'uneasy' | 'pain' | 'comfortable' | null;
  imageUrl?: string[];
  metaData?: {};
};
