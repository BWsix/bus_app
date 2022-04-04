import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useResizeObserverPolyfill } from "src/hooks/useResizeObserverPolyfill";
import { createClient, Provider } from "urql";

const client = createClient({
  url: "https://ebus.tycg.gov.tw/ebus/graphql",
});

function MyApp({ Component, pageProps }: AppProps) {
  useResizeObserverPolyfill();

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
        }}
      >
        <Provider value={client}>
          <Component {...pageProps} />
        </Provider>
      </MantineProvider>
    </>
  );
}

export default MyApp;
