import { getImage } from 'astro:assets';
import mobileBgSrc from '../assets/header/header-bg-mobile.webp';
import tabletBgSrc from '../assets/header/header-bg-tablet.webp';
import desktopBgSrc from '../assets/header/header-bg-desktop.webp';

export async function getHeaderBackgrounds() {
  const [mobileBg, tabletBg, desktopBg] = await Promise.all([
    getImage({ src: mobileBgSrc, width: 640, height: 320, format: 'webp', quality: 35 }),
    getImage({ src: tabletBgSrc, width: 1440, height: 360, format: 'webp', quality: 45 }),
    getImage({ src: desktopBgSrc, width: 1920, height: 300, format: 'webp', quality: 55 }),
  ]);

  return { mobileBg, tabletBg, desktopBg };
}
