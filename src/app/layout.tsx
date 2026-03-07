import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import { Source_Sans_3, Manrope } from "next/font/google";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteDetails } from '@/data/siteDetails';

import "./globals.css";

const manrope = Manrope({ subsets: ['latin'] });
const sourceSans = Source_Sans_3({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteDetails.siteUrl),
  title: {
    default: siteDetails.metadata.title,
    template: `%s | ${siteDetails.siteName}`,
  },
  description: siteDetails.metadata.description,
  keywords: [
    // High intent - orang yang cari solusi
    'aplikasi kasir laundry',
    'aplikasi kasir laundry gratis',
    'aplikasi laundry android',
    'download aplikasi kasir laundry',
    'aplikasi kasir laundry terbaik',
    
    // Medium intent - riset
    'software laundry',
    'POS laundry',
    'sistem kasir laundry',
    'program kasir laundry',
    
    // Long tail - spesifik
    'aplikasi kasir laundry kiloan',
    'aplikasi laundry satuan',
    'aplikasi manajemen laundry',
    'aplikasi nota laundry',
    'aplikasi struk laundry',
    
    // Local/Brand
    'sikasir laundry',
    'aplikasi laundry Indonesia',
    'kasir laundry UMKM',
    
    // Problem-based
    'cara kelola usaha laundry',
    'aplikasi pencatatan laundry',
    'laporan keuangan laundry',
  ],
  authors: [{ name: siteDetails.siteName }],
  creator: siteDetails.siteName,
  publisher: siteDetails.siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: siteDetails.locale,
    url: siteDetails.siteUrl,
    siteName: siteDetails.siteName,
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    images: [
      {
        url: '/images/hero.png',
        width: 1200,
        height: 630,
        alt: `${siteDetails.siteName} - Aplikasi Kasir Laundry Digital`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    images: ['/images/hero.png'],
    creator: '@sikasirlaundry',
  },
  alternates: {
    canonical: siteDetails.siteUrl,
  },
  category: 'technology',
  verification: {
    google: 'DE0fBmVyFnT_YkjK2I1DlaMV98BnxMipEt89dn4eEek',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4120352110495827"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${manrope.className} ${sourceSans.className} antialiased`}
      >
        {siteDetails.googleAnalyticsId && <GoogleAnalytics gaId={siteDetails.googleAnalyticsId} />}
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
