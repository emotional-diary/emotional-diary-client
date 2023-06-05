import React from 'react';
import styled from 'styled-components';
import router from 'next/router';

import * as Icons from '@components/icons';
import { IconButton } from '@components/form/style';

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
  align-items: center;
  width: 100%;
  padding: 30px;
  background-color: ${props => props.bgcolor};
`;

const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
}: {
  children: React.ReactNode;
  headerProps?: HeaderProps;
  style?: React.CSSProperties;
}) => {
  return (
    <StyledContainer style={style}>
      {headerProps && <Header {...headerProps} />}
      {children}
    </StyledContainer>
  );
};

const Header = ({ title, back, bgcolor }: HeaderProps) => {
  return (
    <StyledHeader bgcolor={bgcolor ?? '#F5F5F5'}>
      {back && (
        <IconButton onClick={() => router.back()}>
          <Icons.Back />
        </IconButton>
      )}
    </StyledHeader>
  );
};

export { Container, Header, Main, Footer };
