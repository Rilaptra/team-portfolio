"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Section from "../Utils/Section";
import { Button } from "@/components/Ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Ui/card";

const contactDetails = [
  {
    icon: <Mail className="h-8 w-8 text-teal-500" />,
    title: "Email",
    detail: "your.email@shareproject.com",
    href: "mailto:your.email@shareproject.com",
  },
  {
    icon: <Phone className="h-8 w-8 text-teal-500" />,
    title: "Phone",
    detail: "+62 123 4567 8910",
    href: "tel:+6212345678910",
  },
  {
    icon: <MapPin className="h-8 w-8 text-teal-500" />,
    title: "Location",
    detail: "Magelang, Indonesia",
    href: "#",
  },
];

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useGSAP(
    () => {
      gsap.from(".contact-gsap", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
      });
    },
    { scope: containerRef },
  );

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const recipient = "your.email@shareproject.com";
    const subject = `Pesan dari Portofolio - ${name}`;
    const body = `
Halo,

Anda menerima pesan baru dari formulir kontak di website Anda:

--------------------------------
Nama Pengirim: ${name}
Email Pengirim: ${email}
--------------------------------

Isi Pesan:
${message}
    `;

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // 🔥 PERUBAHAN UTAMA DI SINI 🔥
    // Menggunakan window.location.href agar lebih andal dan tidak diblokir
    window.location.href = mailtoLink;

    formRef.current?.reset();
  };

  return (
    <Section
      id="contact"
      className="flex min-h-screen items-center justify-center py-20"
    >
      <div ref={containerRef} className="mx-auto w-full max-w-4xl">
        <div className="text-center">
          <h1 className="contact-gsap text-4xl font-bold tracking-tight text-black transition-colors duration-300 sm:text-5xl dark:text-white">
            Get <span className="text-teal-400">In</span> Touch
          </h1>
          <p className="contact-gsap text-muted-foreground mt-4 text-lg">
            Kami siap membantu mewujudkan ide Anda. Kirimkan pesan kepada kami.
          </p>
        </div>
        <div className="contact-gsap mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {contactDetails.map((item, index) => (
            <a key={index} href={item.href} className="group">
              <Card className="h-full transform-gpu text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:hover:border-teal-500/50">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 transition-colors duration-300 group-hover:bg-teal-500/10 dark:bg-neutral-800">
                    {item.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle>{item.title}</CardTitle>
                  <p className="text-muted-foreground mt-2">{item.detail}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
        <Card className="contact-gsap mt-12 w-full p-8">
          <form ref={formRef} onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nama
                </label>
                <input
                  name="name"
                  type="text"
                  id="name"
                  required
                  className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  required
                  className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
                />
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Pesan
              </label>
              <textarea
                name="message"
                id="message"
                rows={5}
                required
                className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
              />
            </div>
            <div className="mt-8 flex justify-end">
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="bg-teal-600 text-white hover:bg-teal-700"
              >
                Kirim Pesan <Send className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Section>
  );
}
