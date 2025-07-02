import Section from "@/components/Utils/Section";
import { HoverEffect } from "@/components/Ui/card-hover";
import {
  ShieldMinus,
  TrendingUp,
  Zap,
  Blocks,
  MessageSquare,
  Handshake,
} from "lucide-react";

export const projects = [
  {
    icon: <ShieldMinus className="h-12 w-12" />,
    title: "Keamanan Terjamin",
    description:
      " Kami membangun website dengan fokus utama pada keamanan. Dengan praktik koding modern dan proteksi berlapis, data bisnis dan kepercayaan pelanggan Anda akan selalu aman dari ancaman siber.",
  },
  {
    icon: <TrendingUp className="h-12 w-12" />,
    title: "Mudah Ditemukan (SEO)",
    description:
      "Website Anda dirancang sejak awal agar mudah ditemukan di mesin pencari seperti Google. Struktur yang SEO-friendly memastikan bisnis Anda menjangkau lebih banyak pelanggan potensial secara organik.",
  },
  {
    icon: <Zap className="h-12 w-12" />,
    title: "Performa & Kecepatan Optimal",
    description:
      "Kecepatan adalah kunci pengalaman pengguna dan konversi.  Kami mengoptimalkan setiap aspek, dari kode hingga gambar, untuk memastikan website Anda dimuat secepat kilat di semua perangkat.",
  },
  {
    icon: <Blocks className="h-12 w-12" />,
    title: "Solusi Sesuai Visi Anda",
    description:
      " Kami tidak menawarkan solusi instan, melainkan membangun website yang benar-benar mewakili visi Anda. Setiap elemen dirancang khusus untuk memenuhi kebutuhan unik dan tujuan bisnis Anda.",
  },
  {
    icon: <MessageSquare className="h-12 w-12" />,
    title: "Komunikasi Transparan",
    description:
      "Nikmati proses pengembangan yang bebas stres dengan komunikasi yang jelas dan terbuka. Anda akan selalu menerima pembaruan rutin, memastikan proyek berjalan sesuai rencana dan harapan.",
  },
  {
    icon: <Handshake className="h-12 w-12" />,
    title: "Dukungan Jangka Panjang",
    description:
      "Kerja sama kita tidak berhenti saat website diluncurkan. Saya siap menyediakan dukungan purna jual untuk memastikan website Anda tetap aman, cepat, dan berfungsi optimal.",
  },
];
export default function WhyChooseUs() {
  return (
    <Section id="whyChooseUs" className="flex w-full">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-10">
        <div className="flex flex-col items-center">
          <h1 className="mt-10 flex text-3xl font-bold text-gray-700 dark:text-white">
            Why Choose Us
          </h1>
          <h4 className="mt-5 flex max-w-4xl text-xl font-bold text-gray-700 dark:text-white">
            We're more than just a web development agency. We're your partners
          </h4>
        </div>
        <div className="mt-10">
          <HoverEffect items={projects} />
        </div>
      </div>
    </Section>
  );
}
