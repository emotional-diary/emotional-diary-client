'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

import { Container } from '@components/layout';
import { Typography } from '@components/typography';
import { Button, Form, FormContainer, Label } from '@components/form/style';
import { useUserStore } from '@store/index';
import * as Inputs from '@components/form/input';
// import { StyledInfoBox } from 'app/setting/page';
import { PasswordChangeModal } from '@components/modal';
import { ValidationMessage } from '@components/form/validation';

const SocialRadiusBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9dd4a;
  border-radius: 50px;
  padding: 7px 14px;
`;

const StyledInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  border-radius: 50px;
  background-color: ${props => props.theme.palette.gray.light};
`;

export default function Modify() {
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const [userData, setUserData] = React.useState<
    Pick<User, 'name' | 'birth' | 'email' | 'gender'>
  >({
    name: '',
    email: '',
    birth: '',
    gender: '',
  });
  const [validation, setValidation] = React.useState<
    Pick<UserValidation, 'name'>
  >({
    name: { status: true, message: '' },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (user: Partial<User>) => {
      const res = await axios.patch('/api/user', user);
      return res.data;
    },
  });

  const validateNickname = () => {
    let koreanCount = 0;
    let englishCount = 0;

    for (let i = 0; i < userData.name.length; i++) {
      if (/[가-힣]/.test(userData.name[i])) {
        koreanCount++;
      } else if (/[a-zA-Z]/.test(userData.name[i])) {
        englishCount++;
      } else {
        setValidation({
          ...validation,
          name: {
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
        name: {
          status: false,
          message: '한글 이름은 1~3자로 입력해 주세요.',
        },
      });
      return false;
    }
    if ((englishCount < 4 || englishCount > 16) && koreanCount === 0) {
      setValidation({
        ...validation,
        name: {
          status: false,
          message: '영문 이름은 4~16자로 입력해 주세요.',
        },
      });
      return false;
    }
    if (koreanCount && englishCount) {
      setValidation({
        ...validation,
        name: {
          status: false,
          message: '한글과 영문을 혼용할 수 없어요.',
        },
      });
      return false;
    }

    return true;
  };

  const handleUserBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'nickname':
        if (!validateNickname()) {
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
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      });
    },
    [userData]
  );

  const modifyValidation = () => {
    if (user === userData) {
      alert('변경된 정보가 없어요.');
      return false;
    }
    const { name } = validation;
    console.log(validation);

    if (!name.status) {
      alert('입력값을 확인해 주세요.');
      return false;
    }

    return true;
  };

  const handleModify = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!modifyValidation()) {
      return;
    }

    const { data, responseMessage, statusCode } =
      await updateUserMutation.mutateAsync({
        name: userData.name,
        birth: userData.birth || null,
        gender: userData.gender || null,
      });

    if (statusCode >= 400) {
      alert(responseMessage);
      return;
    }

    const newUser = {
      ...user,
      name: userData.name,
      birth: userData.birth,
      gender: userData.gender,
    };

    setUser(newUser);

    alert('회원정보가 수정되었어요.');
    router.back();
  };

  React.useEffect(() => {
    setUserData(user);
  }, []);

  const changePasswordModal = (() => {
    const [open, setOpen] = React.useState(false);

    return {
      open,
      setOpen,
    };
  })();

  return (
    <Container
      headerProps={{
        back: true,
      }}
    >
      <PasswordChangeModal
        open={changePasswordModal.open}
        onClose={() => changePasswordModal.setOpen(false)}
      />

      <FormContainer style={{ alignItems: 'flex-start', paddingTop: 0 }}>
        <Typography
          variant={'h3'}
          style={{ marginTop: '14px', marginBottom: '30px' }}
        >
          회원정보 수정하기
        </Typography>

        <Form>
          <Inputs.Nickname
            name={userData?.name}
            onChange={handleUserChange}
            onBlur={handleUserBlur}
          />
          {validation.name.message && (
            <ValidationMessage message={validation.name.message} />
          )}

          <Label htmlFor="email">
            <Typography variant={'subtitle3'} color={'gray.dark'}>
              나의 이메일
            </Typography>
          </Label>
          <StyledInfoBox style={{ height: 55, paddingRight: '12px' }}>
            <Typography variant={'body2'} color={'gray.main'}>
              {userData.email}
            </Typography>

            {user?.loginType !== 'LOCAL' && (
              <SocialRadiusBox>
                <Typography variant={'subtitle2'}>
                  {user.loginType?.toLowerCase()}
                </Typography>
              </SocialRadiusBox>
            )}
          </StyledInfoBox>

          <Label htmlFor="password">
            <Typography variant={'subtitle3'} color={'gray.dark'}>
              비밀번호
            </Typography>
          </Label>
          {user?.loginType === 'LOCAL' && (
            <Button
              color={'tertiary'}
              style={{ marginBottom: '10px' }}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault();
                changePasswordModal.setOpen(true);
              }}
            >
              <Typography variant={'label2'} color={'common.white'}>
                비밀번호 변경하기
              </Typography>
            </Button>
          )}

          <Inputs.Gender gender={userData?.gender} setJoinData={setUserData} />
          <Inputs.Birthday
            birthday={userData?.birth}
            onChange={handleUserChange}
          />

          <Button
            color={'secondary'}
            style={{ marginTop: '20px' }}
            onClick={handleModify}
          >
            <Typography variant={'label1'} color={'common.white'}>
              저장할래요
            </Typography>
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
}
