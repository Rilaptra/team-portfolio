import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import gsap from "gsap";

export const animatePageIn = () => {
  const bannerOne = document.getElementById("banner-1");
  const bannerTwo = document.getElementById("banner-2");
  const bannerThree = document.getElementById("banner-3");
  const bannerFour = document.getElementById("banner-4");
  const page = document.getElementById("page-wrapper");

  if (bannerOne && bannerTwo && bannerThree && bannerFour && page) {
    const tl = gsap.timeline();

    tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      xPercent: 0,
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      xPercent: 100,
      stagger: 0.25,
      ease: "power2.inOut",
    });

    tl.to(page, {
      opacity: 1,
      duration: 0.1,
      ease: "power2.out",
    });
  }
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const bannerOne = document.getElementById("banner-1");
  const bannerTwo = document.getElementById("banner-2");
  const bannerThree = document.getElementById("banner-3");
  const bannerFour = document.getElementById("banner-4");
  const page = document.getElementById("page-wrapper");

  if (bannerOne && bannerTwo && bannerThree && bannerFour && page) {
    const tl = gsap.timeline();

    tl.to(page, {
      opacity: 0,
      duration: 0.1,
      ease: "power2.in",
    });

    tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      xPercent: -100,
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      xPercent: 0,
      stagger: 0.25,
      ease: "power2.inOut",
      onComplete: () => router.push(href),
    });
  }
};
