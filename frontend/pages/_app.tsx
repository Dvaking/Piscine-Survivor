// pages/_app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "@components";
import { useRouter } from "next/router";


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hideElementOnRoutes = ['/login', '/'];

  const shouldHideElement = hideElementOnRoutes.includes(router.pathname);
  return (
    <>
      {!shouldHideElement && <Navbar />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
