import { Roboto_Mono, Open_Sans } from 'next/font/google';
import "./globals.css";

export const metadata = {
  title: "mysticDEX",
  description: "Private cross-chain swaps.",
};

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-opensans',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${robotoMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
