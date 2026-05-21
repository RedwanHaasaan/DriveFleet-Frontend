import { Inter,Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/components/providers/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
  title: 'DriveFleet - Premium Car Rentals',
  description: 'Rent your dream car with DriveFleet. Browse our premium collection of vehicles for any occasion.',
  keywords: ['car rental', 'rent a car', 'vehicle rental', 'DriveFleet'],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
<body className={`${inter.variable} ${geistMono.variable} font-sans antialiased bg-background`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
