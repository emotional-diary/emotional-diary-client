'use client';

import React from 'react';

import { Container } from '@components/layout';
import { SignUpForm } from '@components/form';
import { SignUpProps } from './page';

export default function SignUpPage({ props }: { props: SignUpProps }) {
  return (
    <Container
      headerProps={{
        back: true,
      }}
    >
      <SignUpForm {...props} />
    </Container>
  );
}
