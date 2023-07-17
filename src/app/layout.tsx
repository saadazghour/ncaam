import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "NCCAM Scores & Schedules",
    template: "%s | NCCAM Scores & Schedules",
  },
  // description: "Like ESPN, but streamlined.",

  icons: {
    shortcut:
      "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏀</text></svg>",
  },

  // robots: {
  //   index: true,
  //   follow: true,
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <footer className="flex items-center justify-center w-full mt-2 mb-4 text-xs text-gray-600 dark:text-gray-400">
        {"Build using the"}
        <a
          href="https://espn.com"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 mr-1 transition-all border-b border-gray-400  dark:border-gray-600 hover:border-gray-600 hover:text-gray-800 hover:dark:text-gray-200"
        >
          ESPN API,
        </a>
        {"NextJS, and Vercel,"}
        <a
          href="https://github.com/saadazghour/ncaam"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 transition-all border-b border-gray-400 dark:border-gray-600 hover:border-gray-600 hover:dark:border-gray-400 hover:text-gray-800 hover:dark:text-gray-200"
        >
          View the code.
        </a>
      </footer>
    </html>
  );
}
