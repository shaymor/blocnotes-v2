/* This header is a component of the Tailwind UI kit */
import { useUser } from '@auth0/nextjs-auth0';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const { user } = useUser();

  let profile;
  if (user) {
    profile = (
      <Menu as="div" className="ml-3 relative">
        <div>
          <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary-100">
            <Image
              className="h-8 w-8 rounded-full"
              src={user.picture}
              height={32}
              width={32}
            />
          </Menu.Button>
        </div>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/api/auth/logout"
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700'
                  )}
                >
                  Sign out
                </Link>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  } else {
    profile = (
      <Link href="/api/auth/login" passHref>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="bg-primary-100 text-black px-3 py-2 rounded-md text-sm font-medium border-primary-300 hover:bg-primary-300">
          Sign in
        </a>
      </Link>
    );
  }

  return (
    <Disclosure as="nav" className="bg-dark">
      {() => (
        <div className="mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex items-center pl-2 justify-center sm:items-stretch sm:justify-start">
              <Link href="/">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="flex-shrink-0 flex items-center">
                  <Image
                    src="/images/logo.png"
                    height={32}
                    width={32}
                    className="block"
                  />
                  <span className="ml-3 text-white text-xl font-semibold leading-6">
                    blocnotes
                  </span>
                </a>
              </Link>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {profile}
            </div>
          </div>
        </div>
      )}
    </Disclosure>
  );
}
