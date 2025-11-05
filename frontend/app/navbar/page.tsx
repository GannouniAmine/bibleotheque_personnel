"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsConnected(!!token);
  });


  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div
          className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
          onClick={() => window.location.reload()}
        >
          <img src="/biblogo.png" className="h-8" alt="BookHive Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            BookHive
          </span>
        </div>
        <button
          onClick={toggleMenu}
          className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>

        <div
          className={`items-center justify-between w-full md:flex md:w-auto ${
            isOpen ? "flex" : "hidden"
          }`}
          id="navbar-sticky"
        >
          {isConnected && <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/dashboard"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/ListBooks"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Catalogue
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="block py-2 px-3 md:p-0 rounded-full hover:bg-gray-100 md:hover:bg-transparent dark:hover:bg-gray-700"
              >
                <img
                  src="/profilelogo.png"
                  alt="User Profile"
                  className="w-8 h-8 rounded-full"
                />
              </Link>
            </li>
          </ul>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;