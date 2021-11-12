import { ApolloProvider } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';
import client from 'lib/apollo';
import 'tailwindcss/tailwind.css';

interface MyAppProps {
  Component: React.ComponentType;
  pageProps: any

}
function MyApp ({ Component, pageProps: { session, ...pageProps } }: MyAppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ApolloProvider >
  );
}

export default MyApp;
