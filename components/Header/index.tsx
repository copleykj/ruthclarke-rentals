import React from 'react';
import AuthButton from 'components/AuthButton';
import { PhoneIcon } from '@heroicons/react/outline';

const Header = () => {
  return (
    <header className="bg-white">
      <div className="flex flex-row justify-between items-center container m-auto py-5 px-5 lg:px-0">
        <h1 className="flex flex-col items-end">
          <span className="font-allison sm:text-5xl lg:text-6xl text-6xl text-primary ">
            Ruth Clarke&apos;s
          </span>
          <span className="font-roboto capitalize text-sm text-gray-600 -mt-2">
            Affordable Rentals
          </span>
        </h1>
        <nav className="flex space-x-2 text-xl items-center py-5">
          <a className="btn btn-primary rounded-full text-lg space-x-2 hidden md:inline-flex" href="tel:6077250035">
            <PhoneIcon className="h-6 w-6" />
            <span>607-725-0035</span>
          </a>
          <AuthButton />
        </nav>
      </div>
    </header>
  );
};

export default Header;
