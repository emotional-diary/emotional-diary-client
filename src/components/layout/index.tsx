import React from 'react';
import styled from 'styled-components';
import router from 'next/router';

import * as Icons from '@components/icons';
import { IconButton } from '@components/form/style';
import { Typography } from '@components/typography';

type HeaderProps = {
  title?: string;
  back?: boolean;
  bgcolor?: string;
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  max-width: 600px;

  margin: 0 auto;
`;

const StyledHeader = styled.header<{ bgcolor: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 30px;
  background-color: ${props => props.bgcolor};
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  width: 100%;
`;

const Footer = styled.footer`
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = ({
  children,
  headerProps,
  style,
  bodyProps,
}: {
  children: React.ReactNode;
  headerProps?: HeaderProps;
  style?: React.CSSProperties;
  bodyProps?: {
    style?: React.CSSProperties;
  };
}) => {
  return (
    <StyledContainer style={style}>
      {headerProps && <Header {...headerProps} />}

      <Body {...bodyProps}>{children}</Body>
    </StyledContainer>
  );
};

const Body = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return <Main style={style ?? {}}>{children}</Main>;
};

const Header = ({ title, back, bgcolor }: HeaderProps) => {
  return (
    <StyledHeader bgcolor={bgcolor ?? '#F5F5F5'}>
      {back && (
        <IconButton onClick={() => router.back()}>
          <Icons.Back />
        </IconButton>
      )}

      {title && (
        <Typography variant={'h3'} color={'common.white'}>
          {title}
        </Typography>
      )}
      <IconButton onClick={() => alert('준비중 입니다.')}>
        <Icons.User />
      </IconButton>
    </StyledHeader>
  );
};

export { Container, Header, Main, Footer };
