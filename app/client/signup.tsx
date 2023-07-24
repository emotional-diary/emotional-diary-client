'use client';

import React from 'react';

import { Container } from '@components/layout';
import { SignUpForm } from '@components/form';
import { SignUpProps } from 'app/signup/page';

export default function SignUpPage({ props }: { props: SignUpProps }) {
  return (
    <Container
      headerProps={{
        back: true,
      }}
    >
      <SignUpForm social={props.social} />
    </Container>
  );
}
