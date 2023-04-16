import type { NextPageWithLayout } from 'next';
import { useRouter } from 'next/router';

import { AppLayout } from '../layout/AppLayout';

const Nitropad: NextPageWithLayout = () => {
  const router = useRouter();
  router.push('/nft');
  return <></>;
};
export default Nitropad;
Nitropad.getLayout = AppLayout;
