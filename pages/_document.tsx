import Document, { Html, Main, NextScript, Head } from 'next/document';
import getCSP from '@Utils/getCSP';

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="de">
        <Head>
          <meta name="referrer" content="strict-origin" />
          <meta
            httpEquiv="Content-Security-Policy"
            content={getCSP(NextScript.getInlineScriptSource(this.props))}
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body>
          <Main />
          <div id="theme-switch" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
