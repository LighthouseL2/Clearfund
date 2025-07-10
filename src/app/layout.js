// import { Geist, Geist_Mono } from "next/font/google";
// import { } from "next/font/google"
import "./globals.css";


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "ClearFund",
  description:"ClearFund allows you to explore past grants data, find new funding oppourtunities and stay updated with real-time alerts from Web3 grants platforms",
};

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body
        className={``}
      >
        {children}
      </body>
    </html>

  );
}
