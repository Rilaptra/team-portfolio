// src/components/Contact/index.tsx
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Section from "../Utils/Section";
import { Button } from "@/components/Ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Ui/card";
import { useTranslations } from "next-intl";
import PencilTitle from "../Utils/PencilTitle";

export default function Contact() {
  const t = useTranslations("Contact");
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const contactDetails = [
    {
      icon: <Mail className="h-8 w-8 text-teal-500" />,
      title: t("details.email"),
      detail: "your.email@shareproject.com",
      href: "mailto:your.email@shareproject.com",
    },
    {
      icon: <Phone className="h-8 w-8 text-teal-500" />,
      title: t("details.phone"),
      detail: "+62 123 4567 8910",
      href: "tel:+6212345678910",
    },
    {
      icon: <MapPin className="h-8 w-8 text-teal-500" />,
      title: t("details.location"),
      detail: "Magelang, Indonesia",
      href: "#",
    },
  ];

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

    // Mengambil template dari file JSON
    const subject = t("form.emailSubject", { name });
    const body = t("form.emailBody", { name, email, message });

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

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
          <PencilTitle>
            <h1 className="contact-gsap text-4xl font-bold tracking-tight text-black transition-colors duration-300 sm:text-5xl dark:text-white">
              {t("title").replace(t("titleColored"), "")}
              <span className="text-teal-400">{t("titleColored")}</span> Touch
            </h1>
          </PencilTitle>
          <p className="contact-gsap text-muted-foreground mt-4 text-lg">
            {t("subtitle")}
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
                  {t("form.nameLabel")}
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
                  {t("form.emailLabel")}
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
                {t("form.messageLabel")}
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
                {t("form.button")} <Send className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Section>
  );
}
