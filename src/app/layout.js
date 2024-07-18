"use client";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import { Myprovider } from "./providers/Myprovider";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Myprovider>{children}</Myprovider>
      </body>
    </html>
  );
}
