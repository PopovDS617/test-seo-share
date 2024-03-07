import Head from "next/head";
import { AppProps } from "next/app";
import "../styles/index.css";
import { DefaultSeo } from "next-seo";
import setConfig from "../../next-seo.config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DefaultSeo {...setConfig} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
