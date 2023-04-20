import React from 'react';
import router from 'next/router';

import { Typography } from '@components/typography';
import { FormContainer, Form, Label, Input, Button, IconButton } from './style';

const LoginForm = () => {
  const [user, setUser] = React.useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const [isLogin, setIsLogin] = React.useState<boolean>(false);

  const handleUserChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    },
    [user]
  );

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user,
      }),
    });

    if (res.status === 200) {
      setIsLogin(true);
    } else {
      alert('로그인에 실패했습니다.');
    }
  };

  React.useEffect(() => {
    if (isLogin) {
      router.push('/');
    }
  }, [isLogin]);

  return (
    <FormContainer>
      <Typography.h3 style={{ borderBottom: '1px solid green' }}>
        환영해요, '감성일기'
      </Typography.h3>

      <Form>
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="text"
          name="email"
          placeholder="이메일"
          onChange={handleUserChange}
        />

        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={handleUserChange}
        />

        <Typography.body2
          style={{
            width: 'fit-content',
            color: 'gray',
            cursor: 'pointer',
          }}
          onClick={() => console.log('비밀번호 찾기')}
        >
          비밀번호를 잊으셨나요?
        </Typography.body2>

        <Button
          type="submit"
          style={{ marginTop: '20px' }}
          onClick={() => handleLogin()}
        >
          시작하기
        </Button>

        <IconButton style={{ marginTop: '10px' }}>
          <img
            src={'/images/kakao_login.png'}
            alt={'kakao_login'}
            width={260}
            height={'auto'}
          />
        </IconButton>

        <Typography.body1
          style={{
            textAlign: 'center',
            marginTop: '20px',
            cursor: 'pointer',
          }}
          onClick={() => router.push('/signup')}
        >
          아직 가입하지 않으셨나요?{' '}
          <strong style={{ textDecoration: 'underline' }}>가입하기</strong>
        </Typography.body1>
      </Form>
    </FormContainer>
  );
};

const SignUpForm = () => {
  const [user, setUser] = React.useState({
    nickname: '',
    email: '',
    password: '',
    birthday: '',
    gender: '',
  });
  const [passwordCheck, setPasswordCheck] = React.useState<string>('');
  const [emailAuth, setEmailAuth] = React.useState<{
    level: number;
    number: string;
  }>({ level: 0, number: '' });
  const [terms, setTerms] = React.useState<boolean>(false);

  const handleUserChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    },
    [user]
  );

  const handlePasswordCheckChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
    },
    []
  );

  const signupValidation = () => {
    if (user.nickname === '') {
      alert('닉네임을 입력해 주세요.');
      return false;
    }

    if (user.email === '') {
      alert('이메일을 입력해 주세요.');
      return false;
    }

    if (user.password === '') {
      alert('비밀번호를 입력해 주세요.');
      return false;
    }

    if (passwordCheck === '') {
      alert('비밀번호 확인을 입력해 주세요.');
      return false;
    }

    if (user.password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!signupValidation()) {
      return;
    }

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user,
      }),
    });

    if (res.status === 200) {
      router.push('/');
    } else {
      alert('회원가입에 실패했습니다.');
    }
  };

  const handleEmailAuth = async () => {
    const res = await fetch('/api/emailAuth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
      }),
    });

    if (res.status === 200) {
      setEmailAuth({
        level: 1,
        number: '',
      });
    } else {
      alert('다시 시도해 주세요.');
    }
  };

  const handleEmailAuthCheck = async () => {
    const res = await fetch('/api/emailAuthCheck', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        authNumber: emailAuth.number,
      }),
    });

    if (res.status === 200) {
      alert('이메일 인증에 성공했습니다.');
      setEmailAuth({
        level: 2,
        number: '',
      });
    } else {
      alert('이메일 인증에 실패했습니다.');
    }
  };

  const handleTerms = () => {
    setTerms(!terms);
  };

  return (
    <FormContainer>
      <Typography.h3 style={{ borderBottom: '1px solid green' }}>
        환영해요, '감성일기'
      </Typography.h3>

      <Form>
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          type="text"
          id="nickname"
          name="nickname"
          placeholder="닉네임"
          onChange={handleUserChange}
        />

        <Label htmlFor="email">이메일</Label>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="이메일"
            style={{ margin: 0 }}
            onChange={handleUserChange}
          />
          <Button
            type="button"
            style={{ marginLeft: '10px' }}
            onClick={() => handleEmailAuth()}
          >
            이메일 인증
          </Button>

          {emailAuth.level === 1 && (
            <div>
              <Input
                type="text"
                id="emailAuthNumber"
                name="emailAuthNumber"
                placeholder="인증번호"
                onChange={e =>
                  setEmailAuth({ ...emailAuth, number: e.target.value })
                }
              />
              <Button
                type="button"
                style={{ marginLeft: '10px' }}
                onClick={() => handleEmailAuthCheck()}
              >
                인증번호 확인
              </Button>
            </div>
          )}
        </div>

        <Label htmlFor="password">비밀번호</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호"
          onChange={handleUserChange}
        />

        <Label htmlFor="passwordCheck">비밀번호 확인</Label>
        <Input
          type="password"
          id="passwordCheck"
          name="passwordCheck"
          placeholder="비밀번호 확인"
          onChange={handlePasswordCheckChange}
        />

        <Label htmlFor="birthday">생년월일</Label>
        <Input
          type="birthday"
          id="birthday"
          name="birthday"
          placeholder="생년월일"
          onChange={handleUserChange}
        />

        <label htmlFor="gender" style={{ marginBottom: '5px' }}>
          성별
        </label>
        <div>
          <Label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={user.gender === 'male'}
              onChange={handleUserChange}
            />
            남성
          </Label>

          <Label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={user.gender === 'female'}
              onChange={handleUserChange}
            />
            여성
          </Label>
        </div>

        <Button
          style={{
            marginTop: '20px',
          }}
          onClick={() => handleSignUp()}
        >
          가입하기
        </Button>
      </Form>
    </FormContainer>
  );
};

export { LoginForm, SignUpForm };
