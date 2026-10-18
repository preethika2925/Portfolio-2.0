import type { Metadata, Viewport } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#F8F8F5',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://preethika-suresh.vercel.app'
  ),
  title: 'Preethika Suresh | Developer & ECE Student',
  description:
    'Explore the portfolio of Preethika Suresh, an Electronics and Communication Engineering student interested in web development, embedded systems, IoT, and practical technology projects.',
  keywords: [
    'Preethika Suresh',
    'Electronics and Communication Engineering',
    'ECE Portfolio',
    'Creative Developer',
    'Web Development',
    'Embedded Systems',
    'IoT',
    'Agriculture Technology',
    'Next.js GSAP Portfolio',
  ],
  authors: [{ name: 'Preethika Suresh' }],
  creator: 'Preethika Suresh',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Preethika Suresh | Developer & ECE Student',
    description:
      'Explore the portfolio of Preethika Suresh, an Electronics and Communication Engineering student interested in web development, embedded systems, IoT, and practical technology projects.',
    siteName: 'Preethika Suresh Portfolio',
    images: [
      {
        url: '/images/preethika-portrait.png',
        width: 800,
        height: 800,
        alt: 'Preethika Suresh — Electronics & Communication Engineering Student',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Preethika Suresh | Developer & ECE Student',
    description:
      'Explore the portfolio of Preethika Suresh, an Electronics and Communication Engineering student interested in web development, embedded systems, IoT, and practical technology projects.',
    images: ['/images/preethika-portrait.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#F8F8F5] text-[#171717] antialiased selection:bg-[#A7C7B5] selection:text-[#171717]">
        {children}
      </body>
    </html>
  );
}
