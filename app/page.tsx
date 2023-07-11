import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import HomePage from './client';

export type HomeProps = {
  profile: {
    nickname: string;
  };
};

export default async function Home() {
  const props = await getServerSideProps();

  return <HomePage props={props} />;
}

export function getServerSideProps(): HomeProps {
  const accessToken = cookies().get('accessToken');
  const nickname = decodeURIComponent(accessToken?.value || '');

  if (!accessToken || !nickname) {
    redirect('/login');
  }

  return {
    profile: {
      nickname,
    },
  };
}
