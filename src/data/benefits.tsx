import { FiBarChart2, FiBriefcase, FiDollarSign, FiLock, FiPieChart, FiShield, FiTarget, FiTrendingUp, FiUser } from "react-icons/fi";

import { IBenefit } from "@/types"

export const benefits: IBenefit[] = [
    {
        title: "Solusi Cerdas untuk Usaha Laundry",
        description: "Kelola laundry tanpa ribet! Aplikasi kasir khusus laundry kami dirancang untuk usaha rumahan hingga profesional—lebih hemat waktu, minim kesalahan.",
        bullets: [
            {
                title: "Pencatatan Instan & Otomatis",
                description: "Catat transaksi cukup sekali klik, tanpa perlu repot tulis manual.",
                icon: <FiBarChart2 size={26} />
            },
            {
                title: "Struk Digital via WhatsApp",
                description: "Langsung kirim struk ke pelanggan, bikin pelayanan lebih profesional.",
                icon: <FiTarget size={26} />
            },
            {
                title: "Cocok untuk Semua Skala Usaha",
                description: "Mulai dari laundry rumahan hingga cabang banyak, semua bisa pakai.",
                icon: <FiTrendingUp size={26} />
            }
        ],
        imageSrc: "/images/mockup-1.webp"
    },
    {
        title: "Pantau Keuangan, Tanpa Bingung",
        description: "Laporan lengkap dan real-time langsung dari aplikasi—bantu kamu ambil keputusan lebih cepat dan tepat.",
        bullets: [
            {
                title: "Laporan Harian & Bulanan Otomatis",
                description: "Omset, profit, dan transaksi tercatat rapi tanpa perlu Excel.",
                icon: <FiDollarSign size={26} />
            },
            {
                title: "Cek Arus Kas & Piutang",
                description: "Pantau utang pelanggan & pengeluaran harian dengan mudah.",
                icon: <FiBriefcase size={26} />
            },
            {
                title: "Dashboard dari HP Kapan Saja",
                description: "Lihat performa usaha cukup lewat ponsel—tidak perlu ke lokasi.",
                icon: <FiPieChart size={26} />
            }
        ],
        imageSrc: "/images/mockup-2.webp"
    },
    {
        title: "Aman, Andal, dan Didukung Tim Profesional",
        description: "Tenang jalani bisnis, data kamu aman dan tim kami selalu siap bantu.",
        bullets: [
            {
                title: "Login Khusus Pemilik & Kasir",
                description: "Bisa bedakan akses pemilik dan karyawan, semua lebih aman.",
                icon: <FiLock size={26} />
            },
            {
                title: "Data Tersimpan di Cloud",
                description: "Tidak takut data hilang. Semua tersimpan otomatis dan bisa dipulihkan.",
                icon: <FiUser size={26} />
            },
            {
                title: "Bantuan Cepat via WhatsApp",
                description: "Tim support siap bantu kamu kapan saja saat butuh.",
                icon: <FiShield size={26} />
            }
        ],
        imageSrc: "/images/mockup-1.webp"
    },
]
