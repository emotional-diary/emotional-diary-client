import React from 'react';
import { GetServerSideProps } from 'next/types';

import { Container } from '@components/layout';
import { SignUpForm } from '@components/form';

export default function SignUp({
  query,
}: {
  query: {
    social?: Social;
  };
}) {
  const social = query.social;

  return (
    <Container
      headerProps={{
        back: true,
      }}
    >
      <SignUpForm social={social} />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  return {
    props: {
      query: ctx.query,
    },
  };
};
