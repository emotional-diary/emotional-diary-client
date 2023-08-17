import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { Typography } from '@components/typography';
import { Timer as EmailAuthTimer } from '../timer';
import {
  Label,
  GenderButton,
  GenderRadioButton,
  Input,
  Button,
} from '../style';
import axios from 'axios';

export const Nickname = ({
  name,
  onChange,
  onBlur,
}: {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}) => (
  <>
    <Label htmlFor="name">
      <Typography variant={'subtitle3'} color={'gray.dark'}>
        나의 이름
      </Typography>
    </Label>
    <Input
      type="text"
      id="name"
      name="name"
      placeholder="성을 제외하고 이름만 적어주세요!"
      value={name}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        if (!/^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z]*$/.test(e.target.value)) {
          return;
        }
        onChange(e);
      }}
      onBlur={onBlur}
      maxLength={16}
    />
  </>
);

export const Email = ({
  email,
  onChange,
  setValidation,
}: {
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValidation: React.Dispatch<React.SetStateAction<UserValidation>>;
}) => {
  const [emailAuth, setEmailAuth] = React.useState<{
    level: number;
    code: string;
    reset: boolean;
  }>({ level: 0, code: '', reset: false });

  const checkDuplicateEmailMutation = useMutation({
    mutationKey: ['/api/user/email'],
    mutationFn: async () => {
      const res = await axios.post('/api/user/email', {
        email,
      });
      return res.data;
    },
  });

  const validateEmailMutation = useMutation({
    mutationKey: ['/api/user/email/validation'],
    mutationFn: async () => {
      const res = await axios.post('/api/user/email/validation', {
        email,
      });
      return res.data;
    },
  });

  const validateEmailCodeMutation = useMutation({
    mutationKey: ['/api/user/email/validation/check'],
    mutationFn: async () => {
      const res = await axios.post('/api/user/email/validation/check', {
        email,
        code: emailAuth.code,
      });
      return res.data;
    },
  });

  const validateEmail = async () => {
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
    if (!regex.test(email)) {
      setValidation(validation => ({
        ...validation,
        email: {
          status: false,
          message: '이메일 형식이 올바르지 않아요.',
        },
      }));
      return false;
    }

    const { data, statusCode, responseMessage } =
      await checkDuplicateEmailMutation.mutateAsync();
    if (statusCode >= 400) {
      setValidation(validation => ({
        ...validation,
        email: {
          status: false,
          message: responseMessage,
        },
      }));
      return false;
    }

    return true;
  };

  const handleEmailAuth = async () => {
    if ((await validateEmail()) === false) {
      return;
    }

    const { data, statusCode, responseMessage } =
      await validateEmailMutation.mutateAsync();
    if (statusCode >= 400) {
      setValidation(validation => ({
        ...validation,
        email: {
          status: false,
          message: responseMessage,
        },
      }));
      return;
    }

    // 이메일 재전송
    if (emailAuth.level === 1) {
      setEmailAuth(prevState => ({
        ...emailAuth,
        reset: !prevState.reset,
      }));
    } else {
      setEmailAuth({
        level: 1,
        code: '',
        reset: false,
      });
    }

    setValidation(validation => ({
      ...validation,
      email: {
        status: false,
        message: '',
      },
    }));
  };

  const handleEmailAuthCheck = async () => {
    const { data, statusCode, responseMessage } =
      await validateEmailCodeMutation.mutateAsync();
    if (statusCode >= 400) {
      setValidation(validation => ({
        ...validation,
        email: {
          status: false,
          message: responseMessage,
        },
      }));
      return;
    }

    alert('이메일 인증에 성공했어요.');
    setEmailAuth({
      level: 2,
      code: '',
      reset: false,
    });
    setValidation(validation => ({
      ...validation,
      email: {
        status: false,
        message: '',
      },
    }));
  };

  const expirateEmailAuth = () => {
    setEmailAuth({
      level: 0,
      code: '',
      reset: false,
    });
    setValidation(validation => ({
      ...validation,
      email: {
        status: false,
        message: '인증코드가 만료되었어요.',
      },
    }));
  };

  return (
    <>
      <Label htmlFor="email">
        <Typography variant={'subtitle3'} color={'gray.dark'}>
          나의 이메일
        </Typography>
      </Label>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '10px',
        }}
      >
        <div style={{ position: 'relative' }}>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="이메일 형식에 맞춰 적어주세요!"
            style={{ margin: 0, paddingRight: '110px' }}
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onChange(e);
              // 이메일 인증버튼을 누르고 이메일을 수정할 경우 인증 상태 초기화
              if (emailAuth.level === 1) {
                setEmailAuth({
                  level: 0,
                  code: '',
                  reset: false,
                });
              }
            }}
            maxLength={254}
          />
          <Button
            type={'button'}
            color={'tertiary'}
            style={{
              height: 35,
              position: 'absolute',
              right: 10,
              top: 10,
              padding: '10px 10px',
              marginLeft: '10px',
            }}
            onClick={() => handleEmailAuth()}
          >
            <Typography variant={'label3'} color={'common.white'}>
              {(emailAuth.level === 0 || emailAuth.level === 2) &&
                '이메일 인증'}
              {emailAuth.level === 1 && '이메일 재전송'}
            </Typography>
          </Button>
        </div>

        {emailAuth.level === 1 && (
          <>
            <Label htmlFor="emailAuthCode">
              <Typography variant={'subtitle3'} color={'gray.dark'}>
                인증코드
              </Typography>
            </Label>
            <div style={{ position: 'relative' }}>
              <Input
                type="text"
                id="emailAuthCode"
                name="emailAuthCode"
                placeholder="인증코드를 입력해주세요!"
                style={{ margin: 0 }}
                value={emailAuth.code}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmailAuth({ ...emailAuth, code: e.target.value })
                }
                maxLength={8}
              />
              <Button
                type={'button'}
                color={'tertiary'}
                style={{
                  height: 35,
                  position: 'absolute',
                  right: 10,
                  top: 10,
                  padding: '10px 10px',
                  marginLeft: '10px',
                }}
                onClick={() => handleEmailAuthCheck()}
                disabled={emailAuth.code.length < 6}
              >
                <Typography variant={'label3'} color={'common.white'}>
                  인증코드 확인
                </Typography>
              </Button>
            </div>

            <EmailAuthTimer
              callback={expirateEmailAuth}
              count={300}
              reset={emailAuth.reset}
            />
          </>
        )}
      </div>
    </>
  );
};

export const Gender = ({
  gender,
  setJoinData,
}: {
  gender: string | null;
  setJoinData: React.Dispatch<React.SetStateAction<JoinUser>>;
}) => {
  const handleClick = (selectGender: string) => {
    setJoinData(prev => ({
      ...prev,
      gender: selectGender === gender ? '' : selectGender,
    }));
  };

  return (
    <>
      <Label htmlFor="gender">
        <Typography variant={'subtitle3'} color={'gray.dark'}>
          나의 성별(선택)
        </Typography>
      </Label>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <GenderButton selected={gender === 'MALE'}>
          <GenderRadioButton
            type="button"
            name="gender"
            value="MALE"
            onClick={() => handleClick('MALE')}
          />
          <Typography
            variant={'label2'}
            color={gender === 'MALE' ? 'tertiary.main' : 'gray.main'}
          >
            남자
          </Typography>
        </GenderButton>
        <GenderButton selected={gender === 'FEMALE'}>
          <GenderRadioButton
            type="button"
            name="gender"
            value="FEMALE"
            onClick={() => handleClick('FEMALE')}
          />
          <Typography
            variant={'label2'}
            color={gender === 'FEMALE' ? 'tertiary.main' : 'gray.main'}
          >
            여자
          </Typography>
        </GenderButton>
      </div>
    </>
  );
};

export const Birthday = ({
  birthday,
  onChange,
}: {
  birthday: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <>
    <Label htmlFor="birth">
      <Typography variant={'subtitle3'} color={'gray.dark'}>
        내가 태어난날(선택)
      </Typography>
    </Label>
    <Input
      type="birth"
      id="birth"
      name="birth"
      placeholder="6자리로 입력해주세요! 예) 961024"
      value={birthday as string}
      onChange={onChange}
      maxLength={6}
    />
  </>
);
