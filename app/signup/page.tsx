import React from 'react';

import SignUpPage from 'app/client/signup';

export type SignUpProps = {
  social: Social;
  email: string;
  gender: string;
};

export default async function SignUp({
  searchParams,
}: {
  searchParams: SignUpProps;
}) {
  return <SignUpPage props={searchParams} />;
}
