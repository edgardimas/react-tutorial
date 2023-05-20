import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createRoot } from "react-dom/client";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
