import React from 'react';

import { SignUpProps } from 'src/app/signup/page';
import TermsClient from './client';

export default function Terms({ searchParams }: { searchParams: SignUpProps }) {
  return <TermsClient searchParams={searchParams} />;
}
