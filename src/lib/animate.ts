// src/lib/animations.ts
import { gsap } from "gsap";

// Definisikan tipe untuk router agar lebih fleksibel
type AppRouterInstance = {
  push: (href: string, options?: { locale?: string }) => void;
};

/**
 * Memicu animasi "page out" sebelum berpindah halaman.
 * @param href - URL tujuan (tanpa locale).
 * @param router - Instance router dari next-intl.
 * @param newLocale - Opsional: locale baru jika yang diubah adalah bahasa.
 */
export const animatePageOut = (
  href: string,
  router: AppRouterInstance,
  newLocale?: string,
) => {
  const pageContent = document.querySelector("body");

  if (pageContent) {
    gsap.to(pageContent, {
      opacity: 0,
      y: 20,
      duration: 0.4, // Sedikit lebih cepat untuk feel yang responsif
      ease: "power3.in", // Gunakan 'in' untuk feel "menghilang"
      onComplete: () => {
        // Logika navigasi yang sekarang lebih pintar
        if (newLocale) {
          // Jika ada locale baru, gunakan itu
          router.push(href, { locale: newLocale });
        } else {
          // Jika tidak, lakukan push biasa
          router.push(href);
        }

        // Tidak perlu mengembalikan opacity di sini, biarkan layout baru yang menanganinya
        // Ini akan mencegah "kedipan" halaman.
      },
    });
  }
};
