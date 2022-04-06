import { ApolloProvider } from '@apollo/client';
import { NextSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useApollo } from '../lib/apolloClient';
import innerVh from '@Utils/innerVh';

import '@Styles/base.scss';

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  useEffect(() => innerVh(), []);

  return (
    <ApolloProvider client={apolloClient}>
      <NextSeo
        title="Next.js fullstack Template"
        description="This fullstack production ready Next.js template provides full support for various features like Typescript, TailwindCSS, Jest, Eslint, GraphQL, Next auth and much more."
      />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;
