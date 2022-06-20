import { UserProvider } from '@auth0/nextjs-auth0';
import * as React from 'react';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
