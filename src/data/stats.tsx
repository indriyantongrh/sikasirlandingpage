import { BsBarChartFill, BsFillStarFill } from "react-icons/bs";
import { PiGlobeFill } from "react-icons/pi";

import { IStats } from "@/types";

export const stats: IStats[] = [
    {
        title: "1 Juta+ Transaksi Diproses",
        icon: <BsBarChartFill size={34} className="text-blue-500" />,
        description: "Setiap hari, jutaan pakaian dicatat dan dikelola dengan akurat oleh pengguna kami—hemat waktu dan tenaga."
    },
    {
        title: "4.9+ Rating Pengguna",
        icon: <BsFillStarFill size={34} className="text-yellow-500" />,
        description: "Ribuan pengguna puas dan memberi ulasan positif di Play Store & App Store—buktikan sendiri kemudahannya!"
    },
    {
        title: "10.000+ Laundry Berlangganan ",
        icon: <PiGlobeFill size={34} className="text-green-600" />,
        description: "Dipercaya oleh ribuan pemilik laundry rumahan dan profesional di seluruh Indonesia."
    }
];