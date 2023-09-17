"use client";
import Link from 'next/link';
import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed flex w-full bg-gray-50 z-[99999]">
      <div className="container mx-auto py-6 md:flex md:justify-between md:items-center">
        <div className="flex justify-between items-center">
          <div>
            <Link className="text-gray-800 font-museomoderno text-xl font-bold md:text-2xl hover:text-gray-700" href="#">
              ConnectHub
            </Link>
          </div>
          
          <div className="flex md:hidden">
            <button 
              type="button" 
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600" 
              aria-label="toggle menu"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path fillRule="evenodd" d="M4 5a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm1 7a1 1 0 100 2h14a1 1 0 100-2H5zm1 7a1 1 0 011-1h14a1 1 0 110 2H6a1 1 0 01-1-1z"></path>
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <nav className="md:hidden">
            <a className="block py-2.5 px-4 hover:bg-gray-200" href="#">Home</a>
            <a className="block py-2.5 px-4 hover:bg-gray-200" href="#">About</a>
            <a className="block py-2.5 px-4 hover:bg-gray-200" href="#">Contact</a>
          </nav>
        )}

        <nav className="hidden md:flex flex-1 justify-center space-x-10">
          <a className="text-gray-500 font-semibold hover:text-blue-500" href="#">Home</a>
          <a className="text-gray-500 font-semibold hover:text-blue-500" href="#">About</a>
          <a className="text-gray-500 font-semibold hover:text-blue-500" href="#">Contact</a>
        </nav>

        <div className="hidden md:flex items-center justify-end">
          <Link href="#" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
            Sign in
          </Link>
          <Link href="#" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-600 transition duration-150">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;