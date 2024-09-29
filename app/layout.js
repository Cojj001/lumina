// app/layout.js
import "./globals.css"; // Import global styles
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lumina",
  description: "Web-Based Gamification of CBT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>{/* Navigation bar component here */}</header>
        <main>{children}</main>
        <footer>{/* Footer component here */}</footer>
      </body>
    </html>
  );
}
