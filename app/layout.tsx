
import { Cormorant_Garamond, Manrope } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        headingFont.variable,
        bodyFont.variable
      )}
    >
      <body className="font-sans">


        <ThemeProvider>
          {children}
        </ThemeProvider>

        
      </body>
    </html>
  );
}
