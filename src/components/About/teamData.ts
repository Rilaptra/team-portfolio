// src/components/About/teamData.ts

// Definisikan tipe data untuk konsistensi
export interface Project {
  title: string;
  url: string;
  description: string;
  stack: string[];
  preview_type?: "iframe" | "image"; // Tambahkan properti ini
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    github: string;
    linkedin: string;
    instagram: string;
  };
  skills: string[];
  projects: Project[];
}

export const teamMembers: TeamMember[] = [
  {
    name: "Rizqi Lasheva Purnama Putra",
    role: "Full-Stack Developer",
    bio: "Seorang developer yang bersemangat dalam menciptakan solusi digital yang fungsional dan simple. Fokus pada clean code dan pengalaman pengguna yang intuitif.",
    image: "https://placehold.co/384x384/76ABAE/FFFFFF.webp?text=RL",
    socials: {
      github: "https://github.com/rilaptra",
      linkedin: "https://linkedin.com/in/username",
      instagram: "https://instagram.com/rzq.lasv",
    },
    skills: [
      "Next.js",
      "TypeScript",
      "Python",
      "C#",
      "Node.js",
      "GSAP",
      "TailwindCSS",
      "Figma",
    ],
    projects: [
      {
        title: "Personal Portfolio v1",
        url: "https://erzysh.vercel.app",
        description:
          "Portofolio pribadi yang menampilkan proyek-proyek kunci dengan desain interaktif menggunakan Next.js dan GSAP.",
        stack: ["Next.js", "GSAP", "TailwindCSS"],
      },
      {
        title: "E-Commerce Dashboard",
        url: "https://eshmarket.vercel.app",
        description:
          "Panel admin untuk mengelola produk, pesanan, dan analitik penjualan pada platform e-commerce.",
        stack: ["React", "TypeScript", "Recharts"],
      },
      // Proyek Baru dengan Gambar
      {
        title: "Old Portfolio Design",
        url: "/images/Home/botwhatsapp.jpg", // Ganti dengan path gambar Anda
        preview_type: "image", // Tandai sebagai gambar
        description: "Mockup desain untuk versi portofolio pribadi sebelumnya.",
        stack: ["Figma", "UI/UX"],
      },
      {
        title: "AI Chatbot Interface",
        url: "https://erzysh.vercel.app",
        description:
          "UI untuk chatbot cerdas yang terintegrasi dengan API pemrosesan bahasa alami.",
        stack: ["Vite", "Node.js", "Socket.IO"],
      },
    ],
  },
  // ... sisa data team member lainnya tidak berubah
  {
    name: "Solahuddin Ahmad",
    role: "Back-End & IoT Specialist",
    bio: "Ahli dalam membangun arsitektur server yang andal dan solusi IoT yang inovatif. Senang mengoprek perangkat keras dan menghubungkannya ke dunia digital.",
    image: "https://placehold.co/384x384/31363F/EEEEEE.webp?text=SA",
    socials: {
      github: "https://github.com/username",
      linkedin: "https://linkedin.com/in/username",
      instagram: "https://instagram.com/username",
    },
    skills: [
      "Node.js",
      "Express",
      "MongoDB",
      "Python",
      "C++",
      "PlatformIO",
      "Firebase",
      "Docker",
    ],
    projects: [
      {
        title: "Smart Home Controller",
        url: "https://erzysh.vercel.app",
        description:
          "Sistem kontrol perangkat rumah pintar berbasis ESP32 dengan dashboard web real-time.",
        stack: ["PlatformIO", "Firebase", "React"],
      },
      {
        title: "WhatsApp API Gateway",
        url: "https://erzysh.vercel.app",
        description:
          "Gateway untuk mengirim dan menerima pesan WhatsApp secara terprogram untuk notifikasi otomatis.",
        stack: ["Node.js", "Express", "Baileys"],
      },
      {
        title: "Inventory Management API",
        url: "https://erzysh.vercel.app",
        description:
          "REST API untuk sistem manajemen inventaris gudang dengan autentikasi JWT.",
        stack: ["Python", "Flask", "PostgreSQL"],
      },
      {
        title: "Weather Station Logger",
        url: "https://erzysh.vercel.app",
        description:
          "Mengumpulkan data dari sensor cuaca dan mengirimkannya ke cloud untuk dianalisis.",
        stack: ["C++", "Raspberry Pi", "MongoDB"],
      },
    ],
  },
  {
    name: "Muhammad Sava Alfarisy.",
    role: "Front-End Developer & Animation Wizard",
    bio: "Memiliki mata yang tajam untuk detail dan keahlian dalam membuat animasi web yang hidup. Mengubah desain statis menjadi pengalaman yang interaktif dan menyenangkan.",
    image: "https://placehold.co/384x384/222831/EEEEEE.webp?text=MS",
    socials: {
      github: "https://github.com/username",
      linkedin: "https://linkedin.com/in/username",
      instagram: "https://instagram.com/username",
    },
    skills: [
      "React",
      "GSAP",
      "Three.js",
      "Sass",
      "JavaScript",
      "UI/UX",
      "WebGL",
    ],
    projects: [
      {
        title: "3D Product Configurator",
        url: "https://erzysh.vercel.app",
        description:
          "Konfigurator produk 3D interaktif yang memungkinkan kustomisasi real-time menggunakan Three.js.",
        stack: ["Three.js", "React", "Styled-Components"],
      },
      {
        title: "Interactive Storytelling Site",
        url: "https://erzysh.vercel.app",
        description:
          "Website naratif dengan animasi scroll-triggered yang imersif untuk kampanye brand.",
        stack: ["GSAP", "ScrollTrigger", "Barba.js"],
      },
    ],
  },
];
