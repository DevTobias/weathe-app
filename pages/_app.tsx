import { NextSeo } from 'next-seo';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo
        title="Next.js fullstack Template"
        description="This fullstack production ready Next.js template provides full support for various features like Typescript, TailwindCSS, Jest, Eslint, GraphQL, Next auth and much more."
      />
      <Component {...pageProps} />
    </>
  );
}

export default App;
