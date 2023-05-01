import React from 'react';
import router from 'next/router';

import { Typography } from '@components/typography';
import {
  FormContainer,
  Form,
  Label,
  Input,
  Button,
  IconButton,
  FormErrorMessage,
} from './style';
import { Timer as EmailAuthTimer } from './timer';

const LoginForm = () => {
  const [user, setUser] = React.useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const [validation, setValidation] = React.useState<
    Pick<Validation, 'email' | 'password'>
  >({
    email: { status: false, message: '' },
    password: { status: false, message: '' },
  });
  const [isLogin, setIsLogin] = React.useState<boolean>(false);

  const validateEmail = () => {
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
    if (!regex.test(user.email)) {
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (!regex.test(user.password)) {
      return false;
    }
    return true;
  };

  const loginValidation = () => {
    const email = validateEmail();
    const password = validatePassword();

    setValidation({
      email: {
        status: email ? true : false,
        message: email ? '' : '이메일 형식이 올바르지 않아요.',
      },
      password: {
        status: password ? true : false,
        message: password
          ? ''
          : '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상 16자 이하로 입력해 주세요.',
      },
    });

    if (email && password) {
      return true;
    }
    return false;
  };

  const handleUserChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    },
    [user]
  );

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!loginValidation()) {
      return;
    }

    const res = await fetch('/api/user/login', {
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
      setValidation({
        ...validation,
        password: {
          status: true,
          message: '이메일이나 비밀번호가 올바르지 않아요.',
        },
      });
    }
  };

  React.useEffect(() => {
    if (isLogin) {
      router.push('/');
    }
  }, [isLogin]);

  console.log(validation);

  return (
    <FormContainer>
      <Typography.h3 style={{ borderBottom: '1px solid green' }}>
        환영해요, '감성일기'
      </Typography.h3>

      <Form>
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="이메일"
          onChange={handleUserChange}
          maxLength={254}
        />
        {validation.email.message && (
          <FormErrorMessage style={{ color: 'red', marginBottom: '8px' }}>
            {validation.email.message}
          </FormErrorMessage>
        )}

        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={handleUserChange}
          maxLength={128}
        />
        {validation.password.message && (
          <FormErrorMessage style={{ color: 'red', marginBottom: '8px' }}>
            {validation.password.message}
          </FormErrorMessage>
        )}

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
          onClick={handleLogin}
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

interface User {
  nickname: string;
  email: string;
  password: string;
  birthday: string;
  gender: string;
}

type ValidationKeys = keyof User | 'passwordCheck';

type Validation = Record<
  ValidationKeys,
  {
    status: boolean;
    message: string;
  }
>;

const SignUpForm = () => {
  const [user, setUser] = React.useState<User>({
    nickname: '',
    email: '',
    password: '',
    birthday: '',
    gender: '',
  });
  const [passwordCheck, setPasswordCheck] = React.useState<string>('');
  const [emailAuth, setEmailAuth] = React.useState<{
    level: number;
    code: string;
    reset: boolean;
  }>({ level: 0, code: '', reset: false });
  const [terms, setTerms] = React.useState<boolean>(false);

  const [validation, setValidation] = React.useState<Validation>({
    nickname: { status: false, message: '' },
    email: { status: false, message: '' },
    password: { status: false, message: '' },
    passwordCheck: { status: false, message: '' },
    birthday: { status: false, message: '' },
    gender: { status: false, message: '' },
  });

  const validateNickname = () => {
    let koreanCount = 0;
    let englishCount = 0;

    for (let i = 0; i < user.nickname.length; i++) {
      if (/[가-힣]/.test(user.nickname[i])) {
        koreanCount++;
      } else if (/[a-zA-Z]/.test(user.nickname[i])) {
        englishCount++;
      } else {
        setValidation({
          ...validation,
          nickname: {
            status: false,
            message: '자음이나 모음만 따로 사용할 수 없어요.',
          },
        });
        return false;
      }
    }

    if ((koreanCount === 0 && englishCount === 0) || koreanCount > 3) {
      setValidation({
        ...validation,
        nickname: {
          status: false,
          message: '한글 이름은 1~3자로 입력해 주세요.',
        },
      });
      return false;
    }
    if ((englishCount < 4 || englishCount > 16) && koreanCount === 0) {
      setValidation({
        ...validation,
        nickname: {
          status: false,
          message: '영문 이름은 4~16자로 입력해 주세요.',
        },
      });
      return false;
    }
    if (koreanCount && englishCount) {
      setValidation({
        ...validation,
        nickname: {
          status: false,
          message: '한글과 영문을 혼용할 수 없어요.',
        },
      });
      return false;
    }

    return true;
  };

  const validateEmail = () => {
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
    if (!regex.test(user.email)) {
      setValidation({
        ...validation,
        email: {
          status: false,
          message: '이메일 형식이 올바르지 않아요.',
        },
      });
      return false;
    }

    setValidation({
      ...validation,
      email: {
        status: true,
        message: '',
      },
    });
    return true;
  };

  const validatePassword = () => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (!regex.test(user.password)) {
      setValidation({
        ...validation,
        password: {
          status: false,
          message:
            '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상 16자 이하로 입력해 주세요.',
        },
      });
      return false;
    }
    return true;
  };

  const validatePasswordCheck = () => {
    if (user.password !== passwordCheck) {
      setValidation({
        ...validation,
        passwordCheck: {
          status: false,
          message: '비밀번호가 일치하지 않아요.',
        },
      });
      return false;
    }

    setValidation({
      ...validation,
      passwordCheck: {
        status: true,
        message: '',
      },
    });
    return true;
  };

  // 비밀번호 확인 에러 메세지 처리
  React.useEffect(() => {
    if (passwordCheck.length > 7) {
      validatePasswordCheck();
    }
  }, [user.password, passwordCheck]);

  const handleUserBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'nickname':
        if (!validateNickname()) {
          return false;
        }
        break;
      case 'password':
        if (!validatePassword()) {
          return false;
        }
        break;
      case 'passwordCheck':
        if (!validatePasswordCheck()) {
          return false;
        }
        break;
      default:
        break;
    }

    setValidation({
      ...validation,
      [e.target.name]: {
        status: true,
        message: '',
      },
    });
    return true;
  };

  const handleUserChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    },
    [user]
  );

  console.log(validation);

  const handlePasswordCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordCheck(e.target.value);
  };

  const signupValidation = () => {
    const { nickname, email, password, passwordCheck } = validation;
    if (
      !nickname.status ||
      // !email.status ||
      !password.status ||
      !passwordCheck.status
    ) {
      alert('입력값을 확인해 주세요.');
      return false;
    }

    return true;
  };

  const handleSignUp = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!signupValidation()) {
      return;
    }

    const res = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user,
      }),
    });

    if (res.status === 200) {
      // router.push('/');
    } else {
      alert('회원가입에 실패했습니다.');
    }
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
        email: user.email,
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

    setValidation({
      ...validation,
      email: {
        status: false,
        message: '',
      },
    });
  };

  const handleEmailAuthCheck = async () => {
    const res = await fetch('/api/emailAuthCheck', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
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
      setValidation({
        ...validation,
        email: {
          status: false,
          message: '',
        },
      });
    } else {
      setValidation({
        ...validation,
        email: {
          status: false,
          message: '인증코드가 일치하지 않아요.',
        },
      });
    }
  };

  const expirateEmailAuth = () => {
    setEmailAuth({
      level: 0,
      code: '',
      reset: false,
    });
    setValidation({
      ...validation,
      email: {
        status: false,
        message: '인증코드가 만료되었어요.',
      },
    });
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
        <Label htmlFor="nickname">이름</Label>
        <Input
          type="text"
          id="nickname"
          name="nickname"
          placeholder="이름"
          value={user.nickname}
          onChange={e => {
            if (!/^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z]*$/.test(e.target.value)) {
              return;
            }
            handleUserChange(e);
          }}
          onBlur={handleUserBlur}
          maxLength={16}
        />
        {validation.nickname.message && (
          <FormErrorMessage style={{ color: 'red', marginBottom: '8px' }}>
            {validation.nickname.message}
          </FormErrorMessage>
        )}

        <Label htmlFor="email">이메일</Label>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
            }}
          >
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="이메일"
              style={{ margin: 0 }}
              value={user.email}
              onChange={e => {
                handleUserChange(e);
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
              type="button"
              style={{ marginLeft: '10px' }}
              onClick={() => handleEmailAuth()}
            >
              {(emailAuth.level === 0 || emailAuth.level === 2) &&
                '이메일 인증'}
              {emailAuth.level === 1 && '이메일 재전송'}
            </Button>
          </div>

          {emailAuth.level === 1 && (
            <>
              <div
                style={{
                  display: 'flex',
                  marginTop: '10px',
                }}
              >
                <Input
                  type="text"
                  id="emailAuthCode"
                  name="emailAuthCode"
                  placeholder="인증코드"
                  style={{ margin: 0 }}
                  value={emailAuth.code}
                  onChange={e =>
                    setEmailAuth({ ...emailAuth, code: e.target.value })
                  }
                />
                <Button
                  type="button"
                  style={{ marginLeft: '10px' }}
                  onClick={() => handleEmailAuthCheck()}
                  disabled={emailAuth.code.length < 6}
                >
                  인증코드 확인
                </Button>
              </div>

              <EmailAuthTimer
                callback={expirateEmailAuth}
                count={5}
                reset={emailAuth.reset}
              />
            </>
          )}
        </div>
        {validation.email.message && (
          <FormErrorMessage style={{ color: 'red', marginBottom: '8px' }}>
            {validation.email.message}
          </FormErrorMessage>
        )}

        <Label htmlFor="password">비밀번호</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호"
          value={user.password}
          onChange={handleUserChange}
          onBlur={handleUserBlur}
          maxLength={128}
        />
        {validation.password.message && (
          <FormErrorMessage style={{ color: 'red', marginBottom: '8px' }}>
            {validation.password.message}
          </FormErrorMessage>
        )}

        <Label htmlFor="passwordCheck">비밀번호 확인</Label>
        <Input
          type="password"
          id="passwordCheck"
          name="passwordCheck"
          placeholder="비밀번호 확인"
          value={passwordCheck}
          onChange={handlePasswordCheckChange}
          onBlur={handleUserBlur}
          maxLength={128}
        />
        {validation.passwordCheck.message && (
          <FormErrorMessage style={{ color: 'red', marginBottom: '8px' }}>
            {validation.passwordCheck.message}
          </FormErrorMessage>
        )}

        {/* TODO: 드롭다운 UI로 변경 */}
        <Label htmlFor="birthday">생년월일</Label>
        <Input
          type="birthday"
          id="birthday"
          name="birthday"
          placeholder="생년월일"
          value={user.birthday}
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
          onClick={handleSignUp}
        >
          가입하기
        </Button>
      </Form>
    </FormContainer>
  );
};

export { LoginForm, SignUpForm };
