import React from 'react';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { Button, Form, Input, Label } from '@components/form/style';
import { Typography } from '@components/typography';
import { ValidationMessage } from '@components/form/validation';
import * as Inputs from '@components/form/input';
import { theme } from 'src/theme';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 60px);
  max-width: 540px;
  background-color: white;
  padding: 30px 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Modal = ({
  open,
  title,
  subTitle,
  onClose,
  children,
}: {
  open: boolean;
  title?: string;
  subTitle?: string;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!open) return null;
  return (
    <ModalContainer>
      <Backdrop onClick={onClose} />

      <ModalWrapper>
        {title && (
          <Typography
            variant={'h1'}
            color={'gray.dark'}
            style={{ marginBottom: 12 }}
          >
            {title}
          </Typography>
        )}
        {subTitle && (
          <Typography
            variant={'h4'}
            color={'gray.dark'}
            style={{ marginBottom: 20 }}
          >
            {subTitle}
          </Typography>
        )}
        <div style={{ width: '100%' }}>{children}</div>
        <Button
          color={'secondary'}
          style={{ width: '100%', marginTop: 20 }}
          onClick={onClose}
        >
          확인
        </Button>
      </ModalWrapper>
    </ModalContainer>
  );
};

export const LoadingModal = ({ open }: { open: boolean }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        textAlign: 'center',
        zIndex: 100,
        backgroundColor: theme.palette.common.white,
        visibility: open ? 'visible' : 'hidden',
      }}
    >
      <img
        src={'/images/icons/loading.png'}
        alt={'loading'}
        style={{ width: 90, height: 90 }}
      />
      <Typography variant={'h3'} color={'gray.dark'} style={{ marginTop: 30 }}>
        작성한 일기를 <span style={{ color: '#35C591' }}>분석중</span>
        이예요
        <br />
        잠시만 기다려주세요
      </Typography>
    </div>
  );
};

export const PasswordChangeModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [step, setStep] = React.useState<number>(0);
  const [password, setPassword] = React.useState<string>('');
  const [passwordCheck, setPasswordCheck] = React.useState<string>('');
  const [validation, setValidation] = React.useState<
    Pick<UserValidation, 'password' | 'passwordCheck'>
  >({
    password: { status: false, message: '' },
    passwordCheck: { status: false, message: '' },
  });

  const subTitles = [
    '현재 비밀번호를 입력해주세요',
    '새로운 비밀번호를 설정해주세요',
  ];
  const buttons = ['다음', '변경할래요'];

  const verifyPasswordMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post('/api/user/password/verify', {
        password,
      });
      return res.data;
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.patch('/api/user/password/change', {
        newPassword: password,
      });
      return res.data;
    },
  });

  const reset = () => {
    setStep(0);
    setPassword('');
    setPasswordCheck('');
    setValidation({
      password: { status: false, message: '' },
      passwordCheck: { status: false, message: '' },
    });
  };

  const validatePassword = () => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (!regex.test(password)) {
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
    if (password !== passwordCheck) {
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

  const handleUserBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
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

  // 비밀번호 확인 에러 메세지 처리
  React.useEffect(() => {
    if (passwordCheck.length > 7) {
      validatePasswordCheck();
    }
  }, [password, passwordCheck]);

  const verifyPassword = async () => {
    const { data, statusCode, responseMessage } =
      await verifyPasswordMutation.mutateAsync();

    setPassword('');

    if (statusCode >= 400) {
      alert(responseMessage);
      return false;
    } else if (data === false) {
      setValidation({
        ...validation,
        password: {
          status: false,
          message: '비밀번호가 일치하지 않아요.',
        },
      });
      return false;
    }
    if (data) {
      return true;
    }
  };

  const changePassword = async () => {
    const { data, statusCode, responseMessage } =
      await changePasswordMutation.mutateAsync();

    if (statusCode >= 400) {
      alert(responseMessage);
      return;
    }

    alert('비밀번호가 변경되었어요.');
    onClose();
  };

  const handleNext = async () => {
    if (step === 0) {
      if (!validatePassword()) return;

      const success = await verifyPassword();
      if (!success) return;
    }
    if (step === 1) {
      if (!validatePasswordCheck()) return;
      changePassword();
      return;
    }
    setStep(prev => prev + 1);
  };

  React.useEffect(() => {
    reset();
  }, [open]);

  if (!open) return null;

  return (
    <ModalContainer>
      <Backdrop onClick={onClose} />

      <ModalWrapper>
        <Typography
          variant={'h1'}
          color={'gray.dark'}
          style={{ marginBottom: 12 }}
        >
          비밀번호 변경하기
        </Typography>
        <Typography
          variant={'h4'}
          color={'gray.dark'}
          style={{ marginBottom: 20 }}
        >
          {subTitles[step]}
        </Typography>

        <div style={{ width: '100%' }}>
          <Form>
            <Label htmlFor="password">
              <Typography variant={'subtitle3'} color={'gray.dark'}>
                {step === 0 ? '현재 비밀번호' : '새 비밀번호'}
              </Typography>
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              onBlur={handleUserBlur}
              maxLength={128}
            />
            {validation.password && (
              <ValidationMessage message={validation.password.message} />
            )}

            {step === 1 && (
              <>
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPasswordCheck(e.target.value)
                  }
                  onBlur={handleUserBlur}
                  maxLength={128}
                />
                {validation.passwordCheck.message && (
                  <ValidationMessage
                    message={validation.passwordCheck.message}
                  />
                )}
              </>
            )}
          </Form>
        </div>
        <Button
          disabled={!password}
          color={'secondary'}
          style={{ width: '100%', marginTop: 20 }}
          onClick={handleNext}
        >
          <Typography variant={'label1'} color={'common.white'}>
            {buttons[step]}
          </Typography>
        </Button>
      </ModalWrapper>
    </ModalContainer>
  );
};

export const PasswordFindModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [step, setStep] = React.useState<number>(0);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [passwordCheck, setPasswordCheck] = React.useState<string>('');
  const [validation, setValidation] = React.useState<
    Pick<UserValidation, 'email' | 'password' | 'passwordCheck'>
  >({
    email: { status: false, message: '' },
    password: { status: false, message: '' },
    passwordCheck: { status: false, message: '' },
  });

  const subTitles = [
    '나의 이메일을 인증해주세요',
    '새로운 비밀번호를 설정해주세요',
  ];
  const buttons = ['다음', '변경할래요'];

  const findPasswordMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.patch('/api/user/password/find', {
        email,
        newPassword: password,
      });
      return res.data;
    },
  });

  const reset = () => {
    setStep(0);
    setEmail('');
    setPassword('');
    setPasswordCheck('');
    setValidation({
      email: { status: false, message: '' },
      password: { status: false, message: '' },
      passwordCheck: { status: false, message: '' },
    });
  };

  const validatePassword = () => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (!regex.test(password)) {
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
    if (password !== passwordCheck) {
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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleUserBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
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

  // 비밀번호 확인 에러 메세지 처리
  React.useEffect(() => {
    if (passwordCheck.length > 7) {
      validatePasswordCheck();
    }
  }, [password, passwordCheck]);

  React.useEffect(() => {
    if (validation.email.status) {
      setStep(prev => prev + 1);
    }
  }, [validation.email.status]);

  const changePassword = async () => {
    const { data, statusCode, responseMessage } =
      await findPasswordMutation.mutateAsync();

    if (statusCode >= 400) {
      alert(responseMessage);
      return;
    }

    alert('비밀번호가 변경되었어요.');
    onClose();
  };

  const handleNext = async () => {
    if (step === 1) {
      if (!validatePasswordCheck()) return;
      changePassword();
      return;
    }
    setStep(prev => prev + 1);
  };

  React.useEffect(() => {
    reset();
  }, [open]);

  if (!open) return null;

  console.log('validation', validation);

  return (
    <ModalContainer>
      <Backdrop onClick={onClose} />

      <ModalWrapper>
        <Typography
          variant={'h1'}
          color={'gray.dark'}
          style={{ marginBottom: 12 }}
        >
          비밀번호 찾기
        </Typography>
        <Typography
          variant={'h4'}
          color={'gray.dark'}
          style={{ marginBottom: 20 }}
        >
          {subTitles[step]}
        </Typography>

        <div style={{ width: '100%' }}>
          <Form>
            {step === 0 && (
              <>
                <Inputs.Email
                  email={email}
                  onChange={handleEmailChange}
                  setValidation={
                    setValidation as React.Dispatch<
                      React.SetStateAction<UserValidation>
                    >
                  }
                />
                {validation.email && (
                  <ValidationMessage message={validation.email.message} />
                )}
              </>
            )}
            {step === 1 && (
              <>
                <Label htmlFor="password">
                  <Typography variant={'subtitle3'} color={'gray.dark'}>
                    새 비밀번호
                  </Typography>
                </Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="비밀번호를 입력해주세요."
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  onBlur={handleUserBlur}
                  maxLength={128}
                />
                {validation.password.message && (
                  <ValidationMessage message={validation.password.message} />
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPasswordCheck(e.target.value)
                  }
                  onBlur={handleUserBlur}
                  maxLength={128}
                />
                {validation.passwordCheck.message && (
                  <ValidationMessage
                    message={validation.passwordCheck.message}
                  />
                )}
              </>
            )}
          </Form>
        </div>
        <Button
          disabled={(() => {
            if (step === 0) {
              return validation.email.status;
            }
            if (step === 1) {
              return !validation.password.status || !validation.passwordCheck;
            }
            return false;
          })()}
          color={'secondary'}
          style={{ width: '100%', marginTop: 20 }}
          onClick={handleNext}
        >
          <Typography variant={'label1'} color={'common.white'}>
            {buttons[step]}
          </Typography>
        </Button>
      </ModalWrapper>
    </ModalContainer>
  );
};

export const WithdrawalModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [step, setStep] = React.useState<number>(0);
  const [password, setPassword] = React.useState<string>('');
  const [validation, setValidation] = React.useState<
    Pick<UserValidation, 'password'>
  >({
    password: { status: false, message: '' },
  });

  const reset = () => {
    setStep(0);
    setPassword('');
    setValidation({
      password: { status: false, message: '' },
    });
  };

  // TODO: 현재 비밀번호 확인 API 연결
  const verifyPassword = async () => {
    // success
    setPassword('');
    return true;
  };

  const withdraw = async () => {
    if (confirm('정말 탈퇴하시겠어요?')) {
      // TODO: 회원탈퇴 API 연결
      alert('탈퇴되었어요.');
      onClose();
    } else {
      onClose();
    }
  };

  const validatePassword = () => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (!regex.test(password)) {
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

  const handleUserBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'password':
        if (!validatePassword()) {
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

  React.useEffect(() => {
    reset();
  }, [open]);

  if (!open) return null;

  return (
    <ModalContainer>
      <Backdrop onClick={onClose} />

      <ModalWrapper>
        <Typography
          variant={'h1'}
          color={'gray.dark'}
          style={{ marginBottom: 12 }}
        >
          회원 탈퇴
        </Typography>
        <Typography
          variant={'h4'}
          color={'gray.dark'}
          style={{ marginBottom: 20 }}
        >
          현재 비밀번호를 입력해주세요
        </Typography>

        <div style={{ width: '100%' }}>
          <Form>
            <Label htmlFor="password">
              <Typography variant={'subtitle3'} color={'gray.dark'}>
                현재 비밀번호
              </Typography>
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              onBlur={handleUserBlur}
              maxLength={128}
            />
            {validation.password && (
              <ValidationMessage message={validation.password.message} />
            )}
          </Form>
        </div>
        <Button
          disabled={!password}
          color={'secondary'}
          style={{ width: '100%', marginTop: 20 }}
          onClick={async () => {
            if (!validatePassword()) return;
            const success = await verifyPassword();
            if (success) {
              await withdraw();
            }
          }}
        >
          <Typography variant={'label1'} color={'common.white'}>
            탈퇴할래요
          </Typography>
        </Button>
      </ModalWrapper>
    </ModalContainer>
  );
};
