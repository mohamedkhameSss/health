import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const fonstSans = Plus_Jakarta_Sans({ subsets: ["latin"], weight:['300','400','500','600','700'], variable:'--font-sans'});

export const metadata: Metadata = {
  title: "HealthApp",
  description: "A healthcare management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('max-h-screen bg-black font-sans antialiased',fonstSans.variable)}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
        
          >
            {children}
          </ThemeProvider></body>
    </html>
  );


}
