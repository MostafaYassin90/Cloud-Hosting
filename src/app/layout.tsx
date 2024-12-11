import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/Header/Header";
import ShowNanContextProvider from "@/context/showNav";
import Footer from "@/components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";


const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  preload: false
})

export const metadata: Metadata = {
  title: "Home Page",
  description: "Home Page Is Display More Features About Aplication.",
};

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en">
      <ShowNanContextProvider>
        <body className={poppins.className}>
          <ToastContainer theme="colored" position="top-center" />
          <Header />
          {children}
          <Footer />
        </body>
      </ShowNanContextProvider>
    </html>
  );
}
export default RootLayout
