import Link from 'next/link';
import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

export default function NotFoundPage() {
  return (
    <main>
      <section className="bg-white">
        <div className="layout flex min-h-screen flex-col items-center justify-center text-center text-black">
          <RiAlarmWarningFill
            size={60}
            className="drop-shadow-glow animate-flicker text-red-500"
          />
          <h1 className="mt-8 text-2xl md:text-4xl my-4">Page Not Found</h1>
          <Link className="mt-4 md:text-lg" href="/">
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
