import React from 'react';
import styled from 'styled-components';

import Header, { HeaderProps } from './header';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  min-height: 100vh;
  max-width: 600px;

  margin: 0 auto;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  position: relative;
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

export { Container, Header, Main, Footer };
