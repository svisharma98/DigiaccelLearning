"use client"; // This line is crucial

import { Providers } from "@/redux/store/providers";
import { store } from "@/redux/store";
import { Inter } from "next/font/google";
import Layout from "@/component/Layout/Layout";
import 'semantic-ui-css/semantic.min.css'

import "./globals.css";
import "../../public/css/style.css"
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers store={store}>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
