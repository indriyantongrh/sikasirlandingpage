import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import Pricing from "@/components/Pricing/Pricing";
import AdBanner from "@/components/AdBanner";

export const metadata = {
  title: "Aplikasi Kasir Laundry Digital Terbaik | SIKASIR LAUNDRY",
  description: "Kelola usaha laundry lebih mudah, cepat, dan profesional. Aplikasi kasir laundry gratis dengan fitur lengkap: transaksi, pelanggan, karyawan, stok & laporan otomatis.",
  keywords: [
    // Primary keywords
    "aplikasi kasir laundry", 
    "aplikasi kasir laundry gratis",
    "download aplikasi kasir laundry",
    "aplikasi laundry android",
    
    // Secondary keywords
    "kasir laundry digital", 
    "aplikasi laundry online", 
    "sikasir laundry", 
    "kasir laundry terbaik", 
    
    // Long tail keywords
    "aplikasi kasir laundry kiloan",
    "aplikasi nota laundry",
    "software laundry Indonesia",
    "POS laundry gratis",
    "aplikasi manajemen laundry",
    "sistem kasir laundry UMKM",
    "aplikasi pencatatan transaksi laundry",
    "laporan keuangan laundry otomatis",
  ],
  openGraph: {
    title: "Aplikasi Kasir Laundry Digital Terbaik | SIKASIR LAUNDRY",
    description: "Kelola usaha laundry lebih mudah, cepat, dan profesional. Dapatkan laporan otomatis dan sistem stok pintar.",
    url: "https://sikasirlaundry.web.id",
    siteName: "SIKASIR LAUNDRY",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "SIKASIR LAUNDRY - Aplikasi Kasir Laundry Digital",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kelola Laundry Lebih Cerdas dengan SIKASIR LAUNDRY",
    description: "Mulai gratis! Aplikasi kasir khusus laundry dengan fitur lengkap untuk bantu usaha makin untung.",
    images: ["/images/og-image.png"],
  },
};

// JSON-LD Structured Data untuk SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SIKASIR LAUNDRY",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Android",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "IDR",
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1000",
  },
  "description": "Aplikasi kasir laundry digital terbaik untuk UMKM Indonesia. Kelola transaksi, pelanggan, karyawan, dan stok dalam satu aplikasi.",
  "screenshot": "https://sikasirlaundry.web.id/images/hero.png",
  "softwareVersion": "1.0",
  "author": {
    "@type": "Organization",
    "name": "SIKASIR LAUNDRY",
    "url": "https://sikasirlaundry.web.id"
  }
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SIKASIR LAUNDRY",
  "url": "https://sikasirlaundry.web.id",
  "logo": "https://sikasirlaundry.web.id/images/logo-skl.png",
  "description": "Penyedia aplikasi kasir laundry digital terbaik untuk UMKM Indonesia",
  "sameAs": [
    // Tambahkan social media links di sini
  ]
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Apakah SIKASIR LAUNDRY gratis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ya, SIKASIR LAUNDRY menyediakan paket gratis selamanya dengan fitur dasar yang lengkap untuk memulai usaha laundry Anda."
      }
    },
    {
      "@type": "Question",
      "name": "Bagaimana cara download SIKASIR LAUNDRY?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Anda dapat mendownload SIKASIR LAUNDRY langsung dari Google Play Store secara gratis."
      }
    },
    {
      "@type": "Question",
      "name": "Fitur apa saja yang tersedia di SIKASIR LAUNDRY?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SIKASIR LAUNDRY menyediakan fitur lengkap termasuk pencatatan transaksi, manajemen pelanggan, pengelolaan karyawan, kontrol stok, dan laporan keuangan otomatis."
      }
    }
  ]
};

const HomePage: React.FC = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <Container>
        {/* Ad setelah Hero */}
        <AdBanner slot="YOUR_AD_SLOT_1" format="horizontal" />
        
        <Stats />
        <Benefits />
        
        {/* Ad setelah Benefits */}
        <AdBanner slot="YOUR_AD_SLOT_2" format="auto" />
        
        <Pricing />
        
        {/* Ad sebelum CTA */}
        <AdBanner slot="YOUR_AD_SLOT_3" format="horizontal" />
        
        <CTA />
      </Container>
    </>
  );
};

export default HomePage;
