import React from 'react';
import router from 'next/router';
import axios from 'axios';

import { Typography } from '@components/typography';
import { useUserStore } from '@store/index';

import { FormContainer, Form, Label, Input, Button, IconButton } from './style';
import { Timer as EmailAuthTimer } from './timer';
import * as Inputs from './input';

const LoginForm = () => {
  const [user, setUser] = React.useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const [validation, setValidation] = React.useState<
    Pick<UserValidation, 'email' | 'password'>
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

  const handleSocialLogin =
    (social: Social) =>
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      try {
        const res = await axios.get(`/api/oauth/${social}`);
        window.location.href = res.data.url;
      } catch {}
    };

  React.useEffect(() => {
    if (isLogin) {
      router.push('/');
    }
  }, [isLogin]);

  console.log(validation);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '400px',
          margin: '20px 0px',
        }}
      >
        <img
          src={'/images/icons/coffee_bean.png'}
          alt={'coffee_bean'}
          width={42}
          height={29}
        />
        <Typography
          variant={'h1'}
          style={{
            marginTop: '10px',
          }}
          color={'common.white'}
        >
          감성일기
        </Typography>
        <Typography
          variant={'subtitle1'}
          style={{
            marginTop: '10px',
            marginBottom: '0px',
          }}
          color={'common.white'}
        >
          서비스 이용을 위해 로그인해주세요
        </Typography>
      </div>
      <FormContainer style={{ borderRadius: '30px 30px 0px 0px' }}>
        <Form>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="이메일을 입력해 주세요"
            onChange={handleUserChange}
            maxLength={254}
            style={{ marginBottom: '20px' }}
          />
          {validation.email.message && (
            <Typography
              variant={'body4'}
              color={'error.main'}
              style={{
                marginBottom: '10px',
                marginTop: '-10px',
                paddingLeft: '10px',
              }}
            >
              {validation.email.message}
            </Typography>
          )}

          <Input
            id="password"
            type="password"
            name="password"
            placeholder="비밀번호를 입력해 주세요"
            onChange={handleUserChange}
            maxLength={128}
          />
          {validation.password.message && (
            <Typography
              variant={'body4'}
              color={'error.main'}
              style={{ marginBottom: '10px', paddingLeft: '10px' }}
            >
              {validation.password.message}
            </Typography>
          )}

          <Button
            type="submit"
            color={'secondary'}
            style={{ marginTop: '10px' }}
            onClick={handleLogin}
          >
            <Typography variant={'label1'} color={'common.white'}>
              로그인
            </Typography>
          </Button>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '20px',
            }}
          >
            <Typography
              variant={'caption1'}
              color={'gray.main'}
              style={{
                cursor: 'pointer',
                borderBottom: '1px solid #A6A6A6',
              }}
              onClick={() => console.log('비밀번호 찾기')}
            >
              비밀번호를 잊으셨나요?
            </Typography>

            <Typography
              variant={'caption1'}
              color={'gray.main'}
              style={{
                cursor: 'pointer',
                borderBottom: '1px solid #A6A6A6',
              }}
              onClick={() => router.push('/terms')}
            >
              회원가입
            </Typography>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              justifyContent: 'end',
              alignItems: 'center',
            }}
          >
            <Typography
              variant={'caption1'}
              color={'gray.main'}
              style={{ margin: '12px 0' }}
            >
              간편 로그인
            </Typography>
            <IconButton onClick={handleSocialLogin('kakao')}>
              <img
                src={'/images/kakao_login.png'}
                alt={'kakao_login'}
                width={'100%'}
                height={'auto'}
              />
            </IconButton>
          </div>
        </Form>
      </FormContainer>
    </div>
  );
};

const SignUpForm = ({ social }: { social?: Social }) => {
  const { user, setUser } = useUserStore();
  const [joinData, setJoinData] = React.useState<JoinUser>({
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

  const [validation, setValidation] = React.useState<UserValidation>({
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

    for (let i = 0; i < joinData.nickname.length; i++) {
      if (/[가-힣]/.test(joinData.nickname[i])) {
        koreanCount++;
      } else if (/[a-zA-Z]/.test(joinData.nickname[i])) {
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
    if (!regex.test(joinData.email)) {
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
    if (!regex.test(joinData.password)) {
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
    if (joinData.password !== passwordCheck) {
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
  }, [joinData.password, passwordCheck]);

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
      setJoinData({
        ...joinData,
        [e.target.name]: e.target.value,
      });
    },
    [joinData]
  );

  console.log(validation);

  const handlePasswordCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordCheck(e.target.value);
  };

  const signupValidation = () => {
    const { nickname, email, password, passwordCheck } = validation;
    console.log(validation);

    if (social) {
      if (nickname.status) {
        return true;
      }
    }

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

    const res = await axios.post('/api/user/signup', {
      user: { ...joinData },
    });
    // const res = await fetch('/api/user/signup', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     user: { ...joinData },
    //   }),
    // });

    if (res.status === 200) {
      console.log('회원가입 성공', res);
      setUser({
        ...res.data.user,
      });
      router.push('/signup/complete');
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
        email: joinData.email,
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
        email: joinData.email,
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

  if (social === 'kakao') {
    return (
      <FormContainer style={{ alignItems: 'flex-start', paddingTop: 0 }}>
        {/* <img src={'/images/icons/coffee_bean.png'} /> */}
        <Typography variant={'subtitle1'}>회원가입</Typography>
        <Typography variant={'h1'} style={{ marginTop: 10, marginBottom: 20 }}>
          회원 정보를
          <br />
          입력해주세요
        </Typography>

        <Form>
          <Inputs.Nickname
            nickname={joinData?.nickname}
            onChange={handleUserChange}
            onBlur={handleUserBlur}
          />
          {validation.nickname.message && (
            <Typography
              variant={'body4'}
              color={'error.main'}
              style={{ marginBottom: '10px', paddingLeft: '10px' }}
            >
              {validation.nickname.message}
            </Typography>
          )}

          <Inputs.Gender
            gender={joinData?.gender}
            onChange={handleUserChange}
          />
          <Inputs.Birthday
            birthday={joinData?.birthday}
            onChange={handleUserChange}
          />

          <Button
            color={'secondary'}
            style={{ width: '100%', marginTop: 'auto' }}
            onClick={handleSignUp}
            disabled={joinData.nickname === ''}
          >
            <Typography variant={'label1'} color={'common.white'}>
              가입하기
            </Typography>
          </Button>
        </Form>
      </FormContainer>
    );
  }

  return (
    <FormContainer style={{ alignItems: 'flex-start', paddingTop: 0 }}>
      {/* <img src={'/images/icons/coffee_bean.png'} /> */}
      <Typography variant={'subtitle1'}>회원가입</Typography>
      <Typography variant={'h1'} style={{ marginTop: 10, marginBottom: 20 }}>
        회원 정보를
        <br />
        입력해주세요
      </Typography>

      <Form>
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
          value={joinData.nickname}
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
          <Typography
            variant={'body4'}
            color={'error.main'}
            style={{ marginBottom: '10px', paddingLeft: '10px' }}
          >
            {validation.nickname.message}
          </Typography>
        )}

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
              value={joinData.email}
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
              type={'button'}
              color={'secondary'}
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
                  color={'secondary'}
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
        {validation.email.message && (
          <Typography
            variant={'body4'}
            color={'error.main'}
            style={{ marginBottom: '10px', paddingLeft: '10px' }}
          >
            {validation.email.message}
          </Typography>
        )}

        <Label htmlFor="password">
          <Typography variant={'subtitle3'} color={'gray.dark'}>
            비밀번호
          </Typography>
        </Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호를 입력해주세요!"
          value={joinData.password}
          onChange={handleUserChange}
          onBlur={handleUserBlur}
          maxLength={128}
        />
        {validation.password.message && (
          <Typography
            variant={'body4'}
            color={'error.main'}
            style={{ marginBottom: '10px', paddingLeft: '10px' }}
          >
            {validation.password.message}
          </Typography>
        )}

        <Label htmlFor="passwordCheck">
          <Typography variant={'subtitle3'} color={'gray.dark'}>
            비밀번호 확인
          </Typography>
        </Label>
        <Input
          type="password"
          id="passwordCheck"
          name="passwordCheck"
          placeholder="입력한 비밀번호와 동일하게 입력해주세요!"
          value={passwordCheck}
          onChange={handlePasswordCheckChange}
          onBlur={handleUserBlur}
          maxLength={128}
        />
        {validation.passwordCheck.message && (
          <Typography
            variant={'body4'}
            color={'error.main'}
            style={{ marginBottom: '10px', paddingLeft: '10px' }}
          >
            {validation.passwordCheck.message}
          </Typography>
        )}

        <Inputs.Gender gender={joinData?.gender} onChange={handleUserChange} />
        <Inputs.Birthday
          birthday={joinData?.birthday}
          onChange={handleUserChange}
        />

        <Button
          color={'secondary'}
          style={{ marginTop: '20px' }}
          onClick={handleSignUp}
        >
          <Typography variant={'label1'} color={'common.white'}>
            가입하기
          </Typography>
        </Button>
      </Form>
    </FormContainer>
  );
};

export { LoginForm, SignUpForm };
