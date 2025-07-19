// src/components/About/teamData.ts

// Tipe data tetap sama, tidak perlu diubah
export interface Project {
  id: string; // Tambahkan id unik untuk setiap proyek
  url: string;
  stack: string[];
  preview_type?: "iframe" | "image";
}

export interface TeamMember {
  id: string; // Tambahkan id unik untuk setiap member
  image: string;
  socials: {
    github: string;
    linkedin: string;
    instagram: string;
  };
  skills: string[];
  projects: Project[];
}

// Data sekarang lebih ringkas
export const teamData: TeamMember[] = [
  {
    id: "rizqi",
    image: "/images/About/rizqi/profile.jpg",
    socials: {
      github: "https://github.com/rilaptra",
      linkedin: "https://linkedin.com/in/rizqi-lasheva-purnama-putra-219a0a375",
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
      "Lua",
    ],
    projects: [
      {
        id: "p1",
        url: "/images/Home/botwhatsapp.jpg",
        preview_type: "image",
        stack: ["Express", "Socket.IO", "React", "Node.js", "Local Database"],
      },
      {
        id: "p2",
        url: "https://erzysh.vercel.app",
        stack: ["Next.js", "TypeScript", "GSAP"],
      },
      {
        id: "p3",
        url: "https://eshmarket.vercel.app",
        stack: ["Next.js", "TypeScript", "Discord API", "MongoDB"],
      },
    ],
  },
  {
    id: "huddin",
    image: "/images/About/huddin/profile.jpg",
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
        id: "p1",
        url: "https://erzysh.vercel.app",
        stack: ["PlatformIO", "Firebase", "React"],
      },
      {
        id: "p2",
        url: "https://erzysh.vercel.app",
        stack: ["Node.js", "Express", "Baileys"],
      },
      {
        id: "p3",
        url: "https://erzysh.vercel.app",
        stack: ["Python", "Flask", "PostgreSQL"],
      },
      {
        id: "p4",
        url: "https://erzysh.vercel.app",
        stack: ["C++", "Raspberry Pi", "MongoDB"],
      },
    ],
  },
  {
    id: "sava",
    image: "/images/About/sava/profile.jpg",
    socials: {
      github: "https://github.com/sava990",
      linkedin: "https://linkedin.com/in/alfarisyx-sava",
      instagram: "https://instagram.com/alfarisyx",
    },
    skills: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Burpsuite",
      "Laravel",
      "Windows",
      "Linux",
      "framer motion",
    ],
    projects: [
      {
        id: "p1",
        url: "/images/About/sava/sertifikat.png",
        stack: ["Kali Linux"],
      },
      {
        id: "p2",
        url: "https://erzysh.vercel.app",
        stack: ["GSAP", "ScrollTrigger", "Barba.js"],
      },
    ],
  },
];
