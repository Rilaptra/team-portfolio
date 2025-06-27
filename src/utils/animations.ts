import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import gsap from "gsap";

export const animatePageIn = () => {
  // pengen dibikin satu satu kaya di youtube atau jadi satu?
  // sek nyoba dari kanan ke kiri dulu bisa ndak eh kiri ke kanan
  // aku barusan baca docs e enak pakai tl.to langsung
  // bolehh coba ae ..

  const bannerOne = document.getElementById("banner-1");
  const bannerTwo = document.getElementById("banner-2");
  const bannerThree = document.getElementById("banner-3");
  const bannerFour = document.getElementById("banner-4");
  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    const tl = gsap.timeline();
    // anjay :v
    // tapi harus nunggu gitu yak
    // kelazz king:v// kek e gegara agak lemot mungkin
    // kaya e emang kalau pakai method .to itu model nya synchronous bukan async owalah kamu baca ne di docs gsap e kah ?
    // bwanter banget
    // tl.to(bannerOne, { xPercent: 100, duration: 1.2 / 4 })
    //   .to(bannerTwo, { xPercent: 100, duration: 1.2 / 4 })
    //   .to(bannerThree, { xPercent: 100, duration: 1.2 / 4 })
    //   .to(bannerFour, { xPercent: 100, duration: 1.2 / 4 });

    tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      xPercent: 0,
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      xPercent: 100,
      stagger: 0.2,
    });
  }
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const bannerOne = document.getElementById("banner-1");
  const bannerTwo = document.getElementById("banner-2");
  const bannerThree = document.getElementById("banner-3");
  const bannerFour = document.getElementById("banner-4");
  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    const tl = gsap.timeline();

    // tl.to(bannerOne, { xPercent: 0, duration: 1.2 / 4 })
    //   .to(bannerTwo, { xPercent: 0, duration: 1.2 / 4 })
    //   .to(bannerThree, { xPercent: 0, duration: 1.2 / 4 })
    //   .to(bannerFour, { xPercent: 0, onComplete: () => router.push(href) });

    tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      xPercent: -100,
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      xPercent: 0,
      stagger: 0.2,
      onComplete: () => router.push(href),
    });
  }
};
