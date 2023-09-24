'use client';

import { Link } from '@nextui-org/react';
import { signOut } from 'next-auth/react';

export const LogoutButton = () => {
  return (
    <Link
      onClick={() =>
        signOut({
          callbackUrl: '/',
        })
      }
    >
      サインアウト
    </Link>
  );
};
