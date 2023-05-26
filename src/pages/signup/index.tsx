import React from 'react';
import router from 'next/router';

import { Container } from '@components/layout';
import { SignUpForm } from '@components/form';

export default function SignUp() {
  const social =
    typeof window !== 'undefined' && (router.query.social as Social);

  return (
    <Container>
      <SignUpForm social={social} />
    </Container>
  );
}
