interface User {
  nickname: string;
  email: string;
  birthday: string;
  gender: string;
  social?: Social;
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
  selectedDate: Date;
  // id: number;
  // title: string;
  // date: string;
  // startTime: string;
  // endTime: string;
};

type Diary = {
  diaryID: string;
  writerID: string;
  createdAt: string;
  updatedAt: string;
  diaryAt: string;
  content: string;
  aiComment: string;
  emotion: 'joy' | 'sad' | 'angry' | 'nervous' | 'hurt' | 'panic' | null;
  imageUrl?: string[];
  metaData?: {};
};
