import React from 'react';

import { Typography } from '@components/typography';
import { Timer as EmailAuthTimer } from '../timer';
import {
  Label,
  GenderButton,
  GenderRadioButton,
  Input,
  Button,
} from '../style';

export const Nickname = ({
  nickname,
  onChange,
  onBlur,
}: {
  nickname: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}) => (
  <>
    <Label htmlFor="nickname">
      <Typography variant={'subtitle3'} color={'gray.dark'}>
        나의 이름
      </Typography>
    </Label>
    <Input
      type="text"
      id="nickname"
      name="nickname"
      placeholder="성을 제외하고 이름만 적어주세요!"
      value={nickname}
      onChange={e => {
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

  const validateEmail = () => {
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

    // setValidation(validation => ({
    //   ...validation,
    //   email: {
    //     status: true,
    //     message: '',
    //   },
    // }));
    return true;
  };

  const handleEmailAuth = async () => {
    if (!validateEmail()) {
      return;
    }

    const res = await fetch('/api/emailAuth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    // if (res.status === 200) {
    //   setEmailAuth({
    //     ...emailAuth,
    //     level: 1,
    //     code: '',
    //   });
    //   setValidation({
    //     ...validation,
    //     email: {
    //       status: false,
    //       message: '',
    //     },
    //   });
    // } else {
    //   alert('다시 시도해 주세요.');
    // }

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
    const res = await fetch('/api/emailAuthCheck', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        authCode: emailAuth.code,
      }),
    });

    if (res.status === 200) {
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
    } else {
      setValidation(validation => ({
        ...validation,
        email: {
          status: false,
          message: '인증코드가 일치하지 않아요.',
        },
      }));
    }
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
            onChange={e => {
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
                onChange={e =>
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
  gender: string;
  setJoinData: React.Dispatch<React.SetStateAction<User>>;
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
        <GenderButton selected={gender === 'male'}>
          <GenderRadioButton
            type="button"
            name="gender"
            value="male"
            onClick={() => handleClick('male')}
          />
          <Typography
            variant={'label2'}
            color={gender === 'male' ? 'tertiary.main' : 'gray.main'}
          >
            남자
          </Typography>
        </GenderButton>
        <GenderButton selected={gender === 'female'}>
          <GenderRadioButton
            type="button"
            name="gender"
            value="female"
            onClick={() => handleClick('female')}
          />
          <Typography
            variant={'label2'}
            color={gender === 'female' ? 'tertiary.main' : 'gray.main'}
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
  birthday: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <>
    <Label htmlFor="birthday">
      <Typography variant={'subtitle3'} color={'gray.dark'}>
        내가 태어난날(선택)
      </Typography>
    </Label>
    <Input
      type="birthday"
      id="birthday"
      name="birthday"
      placeholder="6자리로 입력해주세요! 예) 961024"
      value={birthday}
      onChange={onChange}
      maxLength={6}
    />
  </>
);
