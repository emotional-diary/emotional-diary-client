'use client';

import React from 'react';

import { Container } from '@components/layout';
import { SignUpForm } from '@components/form';
import { SignUpProps } from './page';
import SignUpComplete from './complete';

export default function SignUpPage({ props }: { props: SignUpProps }) {
  const [isComplete, setIsComplete] = React.useState(false);

  if (isComplete) {
    return <SignUpComplete />;
  }

  return (
    <Container
      headerProps={{
        back: true,
      }}
    >
      <SignUpForm setIsComplete={setIsComplete} {...props} />
    </Container>
  );
}
