import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import axios from 'axios';

import HomePage from './client';
import { absoluteUrl } from '@utils/ssr';

export type HomeProps = {
  profile: User;
};

export default async function Home() {
  const props = await initProps();

  return <HomePage props={props} />;
}

export async function initProps(): Promise<HomeProps> {
  const accessToken = cookies().get('accessToken');
  const { origin } = absoluteUrl();

  if (!accessToken?.value) {
    redirect('/login');
  }

  const { data: profile } = await axios.get(`${origin}/api/user`, {
    headers: {
      Authorization: accessToken?.value,
    },
  });

  // console.log('profile', profile);

  return {
    profile: profile.data,
  };
}
