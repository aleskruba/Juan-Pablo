"use client"
import "../styles/globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ThemeProvider } from "@/context/theme-context"
import LanguageContextProvider from "@/context/language-context"
import ToasterContext from "@/context/toaster-context"
import Providers from "@/context/auth-context"
import { Suspense } from "react"
import Loading from "./loading"

export default function RootLayout({ children }:any) {

  if (typeof window !== "undefined") {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

        if (key === "theme") {
          localStorage.removeItem(key);
        }
}
}

  return (
    <html lang="en" suppressHydrationWarning className="!scroll-smooth  ">
        <head />
       <body>
      
          <LanguageContextProvider>
            <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                  > 
                   <Providers>                    
                      <Navbar />
                        <ToasterContext/>
                            {children}
                      <Footer />
                    </Providers>

                </ThemeProvider> 
              </LanguageContextProvider> 
      
      </body>
    </html>
  )
}
