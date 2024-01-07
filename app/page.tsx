import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import axios from 'axios';

import HomePage from './client';
import { absoluteUrl } from '@utils/ssr';

export type HomeProps = {
  profile: User;
};

async function initProps(): Promise<HomeProps> {
  const accessToken = cookies().get('accessToken');
  const { origin } = absoluteUrl();

  if (!accessToken?.value) {
    redirect('/login');
  }

  const {
    data: {
      data: { password, ...profileWithoutPassword },
    },
  } = await axios.get<{ data: User & { password: string } }>(
    `${origin}/api/user`,
    {
      headers: {
        Authorization: accessToken?.value,
      },
    }
  );

  // console.log('profile', profile);

  return {
    profile: profileWithoutPassword,
  };
}

export default async function Home() {
  const props = await initProps();

  return <HomePage props={props} />;
}
