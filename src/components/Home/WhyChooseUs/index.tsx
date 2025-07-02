"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

// Daftarkan plugin di luar komponen agar tidak berulang
gsap.registerPlugin(ScrollTrigger);

export const projects = [
  // ... (data 'projects' Anda tetap sama, tidak perlu diubah) ...
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
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      // Buat satu timeline untuk menampung semua animasi
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%", // Mulai saat 60% bagian atas section masuk viewport
          end: "bottom 40%", // Akhiri saat 40% bagian bawah section meninggalkan viewport
          // --- INI BAGIAN PENTING ---
          // Aksi yang dilakukan pada setiap event:
          // 1. onEnter: Saat masuk dari atas (play)
          // 2. onLeave: Saat keluar ke bawah (reverse)
          // 3. onEnterBack: Saat masuk dari bawah (play)
          // 4. onLeaveBack: Saat keluar ke atas (reverse)
          toggleActions: "play reverse play reverse",
          // markers: true, // Hapus komentar ini untuk debugging visual ScrollTrigger
        },
      });

      // Tambahkan animasi ke timeline, BUKAN membuat trigger baru
      // Animasi judul dan subjudul
      tl.fromTo(".gsap-title", {
        y: -50,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      })
        // Animasi kartu-kartu dengan stagger
        .from(
          ".card-hover-item",
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1, // Setiap kartu muncul 0.1 detik setelah sebelumnya
            ease: "power3.out",
          },
          "-=0.5",
        ); // Mulai animasi kartu 0.5 detik sebelum animasi judul selesai
    },
    { scope: sectionRef },
  ); // scope memastikan selector hanya bekerja di dalam section ini

  return (
    // Tambahkan ref ke section utama
    <Section id="whyChooseUs" className="flex w-full" ref={sectionRef}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-10">
        <div className="flex flex-col items-center">
          {/* Tambahkan class untuk ditargetkan GSAP dan opacity-0 untuk state awal */}
          <h1 className="gsap-title mt-10 flex text-3xl font-bold text-black opacity-0 dark:text-white">
            Why Choose Us
          </h1>
          {/* Lakukan hal yang sama untuk subjudul */}
          <h4 className="gsap-title mt-5 flex max-w-5xl text-center text-lg font-semibold text-black opacity-0 dark:text-white">
            Kami lebih dari sekadar agensi pengembangan web kami adalah mitra
            strategis Anda. Kami menggabungkan keahlian teknis dengan pemahaman
            mendalam tentang bisnis Anda untuk menciptakan solusi digital yang
            tidak hanya terlihat hebat, tetapi juga memberikan hasil nyata.
          </h4>
        </div>
        <div className="mt-10">
          {/* Komponen HoverEffect akan secara otomatis menambahkan class .card-hover-item ke setiap item */}
          <HoverEffect items={projects} />
        </div>
      </div>
    </Section>
  );
}
