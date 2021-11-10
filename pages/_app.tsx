import { SessionProvider } from 'next-auth/react';
import 'tailwindcss/tailwind.css';

interface MyAppProps {
  Component: React.ComponentType;
  pageProps: any

}
function MyApp ({ Component, pageProps: { session, ...pageProps } }: MyAppProps) {
  return (<SessionProvider><Component {...pageProps} /></SessionProvider>);
}

export default MyApp;
