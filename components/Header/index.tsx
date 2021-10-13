import React from 'react';

const Header = () => {
  return (
    <header className="bg-white">
      <div className="flex flex-col md:flex-row justify-between items-center container m-auto py-5 px-5 lg:px-0">
        <h1 className="flex flex-col items-end">
          <span className="font-allison sm:text-5xl lg:text-6xl text-6xl text-primary ">
            Ruth Clarke&apos;s
          </span>
          <span className="font-roboto capitalize text-sm text-gray-600 -mt-2">
            Affordable Rentals
          </span>
        </h1>
        <nav className="flex space-x-10 text-xl items-center py-5">
          <a className="link link-hover" rel="noopener">About Us</a>
          <a className="link link-hover" rel="noopener">Contact</a>
          <a className="link link-hover" rel="noopener">Login</a>
          <a className="btn btn-primary btn-outline rounded-full space-x-2 hidden md:inline-flex" href="tel:6077250035">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>607-725-0035</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
