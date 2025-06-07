import Hero from "@/components/Hero";
// import Testimonials from "@/components/Testimonials";
// import Pricing from "@/components/Pricing/Pricing";
// import FAQ from "@/components/FAQ";
import Logos from "@/components/Logos";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
// import Section from "@/components/Section";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";

export const metadata = {
  title: "Aplikasi Kasir Laundry Digital Terbaik | SIKASIR LAUNDRY",
  description: "Kelola usaha laundry lebih mudah, cepat, dan profesional. Mulai gratis sekarang dan rasakan kemudahan manajemen transaksi hingga laporan keuangan.",
  keywords: [
    "aplikasi kasir laundry", 
    "kasir laundry digital", 
    "aplikasi laundry online", 
    "sikasir laundry", 
    "kasir laundry terbaik", 
    "manajemen laundry", 
    "POS laundry", 
    "laundry UMKM", 
    "aplikasi kasir android", 
    "kasir untuk laundry kiloan"
  ],
  openGraph: {
    title: "Aplikasi Kasir Laundry Digital Terbaik | SIKASIR LAUNDRY",
    description: "Kelola usaha laundry lebih mudah, cepat, dan profesional. Dapatkan laporan otomatis dan sistem stok pintar.",
    url: "https://sikasirlaundry.web.id",
    siteName: "SIKASIR LAUNDRY",
    images: [
      {
        url: "/images/sikasir-skl.png",
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
    images: ["/images/sikasir-skl.png"],
  },
};

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Logos />
      <Container>
        <Benefits />

        {/* <Section
          id="pricing"
          title="Pricing"
          description="Simple, transparent pricing. No surprises."
        >
          <Pricing />
        </Section> */}

        {/* <Section
          id="testimonials"
          title="What Our Clients Say"
          description="Hear from those who have partnered with us."
        >
          <Testimonials />
        </Section> */}

        <Stats />

        <CTA />

        {/* <FAQ /> */}

        
   
      </Container>
    </>
  );
};

export default HomePage;
