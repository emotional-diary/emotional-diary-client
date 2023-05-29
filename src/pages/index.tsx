import { GetServerSideProps } from 'next';
import Link from 'next/link';
import styled from 'styled-components';

import { Container, Main, Footer, Header } from '@components/layout';
import { Typography } from '@components/typography';
import * as Icons from '@components/icons';
import { useUserStore } from '../store';
import { IconButton } from '@components/form/style';

interface Props {
  profile: {
    nickname: string;
  };
}

const MessageOfToday = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  background-color: #000;
  color: #fff;
  border-radius: 0px 10px 10px 0px;
`;

export default function Home({ ...props }: Props) {
  const { user, setUser } = useUserStore();

  if (!user?.nickname) {
    setUser({
      ...user,
      nickname: props.profile.nickname,
    });
  }

  console.log('user', user);
  console.log('profile', props.profile);

  return (
    <Container>
      <Header>
        <MessageOfToday>
          <Typography.body2>
            {user.nickname ?? props.profile.nickname}님 오늘은 어떤 하루였나요?
          </Typography.body2>
        </MessageOfToday>

        <IconButton
          style={{
            marginLeft: 'auto',
            marginRight: '20px',
          }}
        >
          <Icons.User width={30} height={30} />
        </IconButton>
      </Header>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const accessToken = req.cookies.accessToken;
  const nickname = decodeURIComponent(accessToken || '');

  if (!accessToken) {
    res.writeHead(302, { Location: '/login' });
    res.end();
  }

  return {
    props: {
      profile: {
        nickname,
      },
    },
  };
};
