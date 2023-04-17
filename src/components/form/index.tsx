import router from 'next/router';
import styled from 'styled-components';

import { Typography } from '@components/typography';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 320px;
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 0 0 10px;
  border: none;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  font-size: 16px;

  &:hover {
    box-shadow: 0px 0px 5px 0px rgba(57, 70, 255, 0.699);
  }
  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px 0px rgba(57, 70, 255, 0.699);
  }
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
  cursor: pointer;
`;

const Button = styled.button`
  background: #50b801;
  border: 0;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  padding: 10px 20px;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  &:hover {
    background: #42a306;
  }
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginForm = () => {
  return (
    <FormContainer>
      <Typography.h3 style={{ borderBottom: '1px solid green' }}>
        환영해요, '감성일기'
      </Typography.h3>

      <Form>
        <Label htmlFor="email">이메일</Label>
        <Input id="email" type="text" name="email" placeholder="이메일" />

        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="비밀번호"
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
          onClick={() => console.log('로그인')}
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
  return (
    <FormContainer>
      <Typography.h3 style={{ borderBottom: '1px solid green' }}>
        환영해요, '감성일기'
      </Typography.h3>

      <Form>
        <Label htmlFor="username">이름</Label>
        <Input type="text" id="username" name="username" placeholder="이름" />

        <Label htmlFor="email">이메일</Label>
        <Input type="email" id="email" name="email" placeholder="이메일" />

        <Label htmlFor="password">비밀번호</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호"
        />

        <Label htmlFor="birthday">생년월일</Label>
        <Input
          type="birthday"
          id="birthday"
          name="birthday"
          placeholder="생년월일"
        />

        <Button
          style={{
            marginTop: '20px',
          }}
          onClick={() => console.log('회원가입')}
        >
          가입하기
        </Button>
      </Form>
    </FormContainer>
  );
};

{
  /*
    <a href="#">이메일 인증</a>
    <a href="#">이메일 재전송</a>
  */
}

export { LoginForm, SignUpForm };
