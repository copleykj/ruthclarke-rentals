import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
const AuthButton = () => {
  const { data: session, status } = useSession({ required: false });
  const isAdmin = session?.user?.roles.includes('ADMIN');
  switch (status) {
    case 'unauthenticated':
      return <button onClick={() => signIn()} className="btn btn-link btn-secondary tooltip" data-tip="Log In">Login</button>;
    case 'authenticated':
      return (
        <div className="dropdown dropdown-end dropdown-hover">
          <button className="btn btn-link btn-primary capitalize">Account <ChevronDownIcon className="h-5 w-5" /></button>
          <ul className="shadow py-3 menu dropdown-content bg-base-200 rounded-box w-52">
            {isAdmin
              ? <li><a href="/admin">Admin</a></li>
              : <li><a href="/account">Manage Account</a></li>
            }
            <li>
              <a onClick={() => signOut()}>Logout</a>
            </li>
          </ul>
        </div>
      );
    default:
      return null;
  };
};

export default AuthButton;
