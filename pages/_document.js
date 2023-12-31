import { Html, Head, Main, NextScript } from "next/document";
import { assetsJson } from "public/assets";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        />
        <meta name="description" content="MrMrsCart project" />
        <link rel="icon" href={assetsJson.logo} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
