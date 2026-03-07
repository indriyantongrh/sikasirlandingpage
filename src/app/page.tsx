import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import Pricing from "@/components/Pricing/Pricing";
import AdBanner from "@/components/AdBanner";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import SectionTitle from "@/components/SectionTitle";

export const metadata = {
  title: "Aplikasi Kasir Laundry Digital Terbaik | SIKASIR LAUNDRY",
  description: "Kelola usaha laundry lebih mudah, cepat, dan profesional. Aplikasi kasir laundry gratis dengan fitur lengkap: transaksi, pelanggan, karyawan, stok & laporan otomatis.",
  keywords: [
    "aplikasi kasir laundry", 
    "aplikasi kasir laundry gratis",
    "download aplikasi kasir laundry",
    "aplikasi laundry android",
    "kasir laundry digital", 
    "aplikasi laundry online", 
    "sikasir laundry", 
    "kasir laundry terbaik", 
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
        url: "/images/hero.png",
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
    images: ["/images/hero.png"],
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
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "support@sikasirlaundry.web.id",
    "contactType": "customer service",
    "availableLanguage": "Indonesian"
  },
  "sameAs": [
    "https://www.facebook.com/Sikasirlaundry",
    "https://www.instagram.com/sikasirlaundry_"
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
        "text": "Ya! SIKASIR LAUNDRY menyediakan paket gratis selamanya dengan fitur dasar yang lengkap. Anda bisa mencatat transaksi, mengelola pelanggan, dan melihat laporan tanpa biaya."
      }
    },
    {
      "@type": "Question",
      "name": "Bagaimana cara download SIKASIR LAUNDRY?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cukup cari SIKASIR LAUNDRY di Google Play Store, lalu klik Install. Aplikasi akan siap digunakan dalam hitungan menit."
      }
    },
    {
      "@type": "Question",
      "name": "Apakah data saya aman?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Keamanan data adalah prioritas kami. Semua data tersimpan di cloud dengan enkripsi dan backup otomatis setiap hari."
      }
    },
    {
      "@type": "Question",
      "name": "Bisakah digunakan untuk banyak cabang?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paket gratis mendukung 1 outlet. Untuk mengelola banyak cabang, upgrade ke paket Pro yang mendukung unlimited outlet."
      }
    },
    {
      "@type": "Question",
      "name": "Bagaimana jika butuh bantuan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tim support kami siap membantu via WhatsApp di jam kerja. Anda juga bisa mengirim email ke support@sikasirlaundry.web.id."
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
        <AdBanner slot="4120352101" format="horizontal" />
        
        <Stats />
        <Benefits />
        
        <AdBanner slot="4120352102" format="auto" />

        {/* Testimonials Section */}
        <section id="testimonials" className="py-10 lg:py-20">
          <SectionTitle>
            <h2 className="text-center mb-4">Dipercaya Pemilik Laundry di Seluruh Indonesia</h2>
          </SectionTitle>
          <p className="mb-12 text-center text-foreground-accent">Dengarkan langsung dari mereka yang sudah merasakan manfaatnya</p>
          <Testimonials />
        </section>
        
        <Pricing />
        
        <FAQ />
        
        <AdBanner slot="4120352103" format="horizontal" />
        
        <CTA />
      </Container>
    </>
  );
};

export default HomePage;
