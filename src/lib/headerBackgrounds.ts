import { getImage } from 'astro:assets';
import mobileBgSrc from '../assets/header/header-bg-mobile.webp';
import tabletBgSrc from '../assets/header/header-bg-tablet.webp';
import desktopBgSrc from '../assets/header/header-bg-desktop.webp';

export async function getHeaderBackgrounds() {
  const [mobileBg, tabletBg, desktopBg] = await Promise.all([
    getImage({ src: mobileBgSrc, width: 900, height: 450, format: 'webp', quality: 75 }),
    getImage({ src: tabletBgSrc, width: 1920, height: 480, format: 'webp', quality: 75 }),
    getImage({ src: desktopBgSrc, width: 2400, height: 300, format: 'webp', quality: 75 }),
  ]);

  return { mobileBg, tabletBg, desktopBg };
}
