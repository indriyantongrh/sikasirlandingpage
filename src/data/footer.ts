import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
    legalLinks: IMenuItem[];
    email: string;
    socials: ISocials;
} = {
    subheading: "Bersama UMKM Maju, Lewat Teknologi Kasir Masa Kini.",
    quickLinks: [
        {
            text: "Tentang Kami",
            url: "/about"
        },
        {
            text: "Blog",
            url: "/blog"
        },
        {
            text: "FAQ",
            url: "/faq"
        },
        {
            text: "Hubungi Kami",
            url: "/contact"
        }
    ],
    legalLinks: [
        {
            text: "Kebijakan Privasi",
            url: "/privacy-policy"
        },
        {
            text: "Syarat & Ketentuan",
            url: "/terms"
        }
    ],
    email: 'support@sikasirlaundry.web.id',
    socials: {
        facebook: 'https://www.facebook.com/Sikasirlaundry',
        instagram: 'https://www.instagram.com/sikasirlaundry_?igsh=MXdtMWxjcGhiNmp1aQ%3D%3D&utm_source=qr',
    }
}