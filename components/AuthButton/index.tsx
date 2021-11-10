import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { LoginIcon, LogoutIcon } from '@heroicons/react/outline';
const AuthButton = () => {
  const { status } = useSession({ required: false });
  console.log(status);
  switch (status) {
    case 'unauthenticated':
      return <button onClick={() => signIn()} className="btn btn-link btn-secondary tooltip" data-tip="Log In"><LoginIcon className="h-8 w-8" /></button>;
    case 'authenticated':
      return <button onClick={() => signOut()} className="btn btn-link btn-accent tooltip" data-tip="Log Out"><LogoutIcon className="h-8 w-8" /></button>;
    default:
      return null;
  };
};

export default AuthButton;
