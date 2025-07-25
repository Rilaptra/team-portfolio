// src/components/About/ProfileCard/index.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  teamData,
  TeamMember as TeamMemberData,
  Project as ProjectData,
} from "./../teamData"; // Import data statis
import { Badge } from "../../Ui/badge";
import { Button } from "../../Ui/button";
import {
  ArrowUpRight,
  Globe,
  X,
  Github,
  Linkedin,
  Instagram,
  FileImage,
} from "lucide-react";

import Link from "next/link";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

// Tipe gabungan antara data statis dan terjemahan
interface TeamMember extends TeamMemberData {
  name: string;
  role: string;
  bio: string;
  projects: (ProjectData & { title: string; description: string })[];
}

const SocialIcon = ({ name }: { name: string }) => {
  switch (name.toLowerCase()) {
    case "github":
      return <Github className="h-5 w-5" />;
    case "linkedin":
      return <Linkedin className="h-5 w-5" />;
    case "instagram":
      return <Instagram className="h-5 w-5" />;
    default:
      return null;
  }
};

export function ProfileCard() {
  const t = useTranslations("AboutPage");
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalData, setModalData] = useState<TeamMember | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Menggabungkan data statis dengan terjemahan
  const translatedTeamMembers: TeamMember[] = teamData.map((member) => {
    const translatedMember = t.raw(`team`).find((m: any) => m.id === member.id);
    return {
      ...member,
      name: translatedMember.name,
      role: translatedMember.role,
      bio: translatedMember.bio,
      projects: member.projects.map((p) => ({
        ...p,
        title: translatedMember.projects[p.id].title,
        description: translatedMember.projects[p.id].description,
      })),
    };
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Logika GSAP tetap sama
  useGSAP(
    () => {
      let mm = gsap.matchMedia();
      mm.add(
        { isDesktop: "(min-width: 768px)", isMobile: "(max-width: 767px)" },
        (context) => {
          let { isDesktop } = context.conditions as { isDesktop: boolean };
          if (isDesktop) {
            const sections = gsap.utils.toArray<HTMLElement>(
              ".horizontal-section",
            );
            const wrapper = wrapperRef.current;
            if (!wrapper || sections.length === 0) return;
            const totalWidth = wrapper.scrollWidth;
            const viewWidth = window.innerWidth;
            const horizontalScroll = gsap.to(wrapper, {
              x: () => `-${totalWidth - viewWidth}px`,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 1,
                end: () => `+=${totalWidth - viewWidth}`,
              },
            });
            sections.forEach((section) => {
              gsap.from(section.querySelectorAll(".gsap-reveal"), {
                y: 50,
                opacity: 0,
                stagger: 0.07,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section,
                  containerAnimation: horizontalScroll,
                  start: "left 85%",
                  end: "right 15%",
                  toggleActions: "play reverse play reverse",
                },
              });
            });
          } else {
            const sections = gsap.utils.toArray<HTMLElement>(
              ".horizontal-section",
            );
            sections.forEach((section) => {
              gsap.from(section.querySelectorAll(".gsap-reveal"), {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 85%",
                  toggleActions: "play reverse play reverse",
                },
              });
            });
          }
        },
      );
    },
    { scope: containerRef },
  );

  useGSAP(() => {
    if (modalData) {
      gsap.set(modalRef.current, { display: "flex" });
      gsap.to(modalRef.current, { opacity: 1, duration: 0.3 });
      gsap.from(".modal-content", {
        y: 50,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.set(modalRef.current, { display: "none" });
        },
      });
    }
  }, [modalData]);

  return (
    <div className="mx-auto">
      <div ref={containerRef} className="w-full md:h-screen md:overflow-hidden">
        <div
          ref={wrapperRef}
          className="flex flex-col md:h-full md:flex-row"
          style={{
            width: isMobile
              ? "100%"
              : `${translatedTeamMembers.length * 100 + 1}vw`,
          }}
        >
          {translatedTeamMembers.map((member) => {
            const isRizqi = member.name.includes("Rizqi");
            return (
              <div
                key={member.name}
                className="horizontal-section flex w-full flex-col items-center justify-center px-4 py-16 md:h-screen md:w-screen md:flex-row md:p-8"
              >
                <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-5 md:gap-12">
                  <div className="col-span-1 flex flex-col items-center gap-4 md:col-span-2">
                    <div className="gsap-reveal relative aspect-square w-full max-w-sm overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        unoptimized
                        className="rounded-xl object-cover shadow-2xl"
                      />
                    </div>
                    <div className="gsap-reveal flex w-full flex-col items-center">
                      <p className="dark:text-offwhite font-bold text-black transition-colors duration-300">
                        {member.role}
                      </p>
                      <div className="mt-2 flex gap-4">
                        {Object.entries(member.socials).map(([name, url]) => (
                          <Link
                            key={name}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on ${name}`}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <SocialIcon name={name} />
                          </Link>
                        ))}
                      </div>
                      <div className="mt-4 flex max-w-sm flex-wrap justify-center gap-4">
                        {member.skills.map((skill, i) => (
                          <Badge key={i} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 flex flex-col md:col-span-3">
                    <h2 className="gsap-reveal text-4xl font-black md:text-6xl">
                      {member.name
                        .split(" ")
                        .slice(0, isRizqi ? 2 : 1)
                        .join(" ")}
                    </h2>
                    <h2 className="gsap-reveal text-4xl font-thin md:text-6xl">
                      {member.name
                        .split(" ")
                        .slice(isRizqi ? 2 : 1)
                        .join(" ")}
                    </h2>
                    <p className="gsap-reveal text-muted-foreground mt-4 text-base md:mt-6 md:text-lg">
                      {member.bio}
                    </p>
                    <div className="gsap-reveal mt-6 md:mt-8">
                      <h4 className="mb-4 font-semibold">
                        {t("profileCard.featuredProjects")}
                      </h4>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {member.projects.slice(0, 2).map((p) => (
                          <div key={p.title}>
                            <ProjectPreview project={p} />
                            <h5 className="mt-2 text-sm font-medium">
                              {p.title}
                            </h5>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="gsap-reveal mt-6">
                      <Button onClick={() => setModalData(member)}>
                        {t("profileCard.viewAllProjects")}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        ref={modalRef}
        className="bg-background/80 fixed inset-0 z-[9999] hidden items-center justify-center p-4 backdrop-blur-sm"
        onClick={() => setModalData(null)}
      >
        <div
          className="modal-content bg-card max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl border p-6 shadow-2xl md:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {modalData && (
            <>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold md:text-3xl">
                    {t("profileCard.modalTitle", { name: modalData.name })}
                  </h2>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {t("profileCard.modalSubtitle")}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setModalData(null)}
                  className="-mt-2 -mr-2 rounded-full"
                >
                  <X />
                </Button>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
                {modalData.projects.map((project) => (
                  <div key={project.title} className="flex flex-col gap-3">
                    <ProjectPreview project={project} />
                    <div>
                      <h4 className="font-bold">{project.title}</h4>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {project.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.stack.map((s) => (
                          <Badge key={s} variant="secondary">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const ProjectPreview = ({
  project,
}: {
  project: ProjectData & { title: string; description: string };
}) => {
  const t = useTranslations("AboutPage.profileCard");
  const [isIframeLoadFailed, setIframeLoadFailed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isImagePreview =
    project.preview_type === "image" ||
    project.url.match(/\.(jpeg|jpg|gif|png|webp)$/);

  const IframeContent = () => (
    <>
      {isIframeLoadFailed ? (
        <div className="bg-muted flex h-full w-full flex-col items-center justify-center p-4 text-center">
          <Globe className="text-muted-foreground h-8 w-8" />
          <p className="mt-2 text-sm font-semibold">{t("previewErrorTitle")}</p>
          <p className="text-muted-foreground text-xs">
            {t("previewErrorSubtitle")}
          </p>
        </div>
      ) : (
        <iframe
          src={project.url}
          className="pointer-events-none h-full w-full scale-[1.01] transform border-0"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
          onError={() => setIframeLoadFailed(true)}
        />
      )}
      <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="bg-background/50 absolute top-2 right-2 flex items-center gap-1 rounded-full p-1 pl-3 text-xs opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        {t("visitSite")} <ArrowUpRight className="h-3 w-3" />
      </div>
    </>
  );

  const ImageContent = () => (
    <>
      <Image
        src={project.url}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        unoptimized={project.url.startsWith("https")}
        onError={() => setImageLoaded(false)}
        onLoad={() => setImageLoaded(true)}
      />
      {!imageLoaded && (
        <div className="bg-muted absolute inset-0 flex items-center justify-center">
          <FileImage className="text-muted-foreground h-10 w-10" />
        </div>
      )}
      <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="bg-background/50 absolute top-2 right-2 flex items-center gap-1 rounded-full p-1 pl-3 text-xs opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        {t("viewImage")} <ArrowUpRight className="h-3 w-3" />
      </div>
    </>
  );

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group hover:ring-primary relative block aspect-video w-full overflow-hidden rounded-lg border bg-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:ring-2 dark:bg-neutral-800"
    >
      {isImagePreview ? <ImageContent /> : <IframeContent />}
    </a>
  );
};
