import cyborgWolfScene from "../assets/3d/cyborgwolf.glb";
import { experiences, portfolio } from "../data";

const heroAssets = [
  "/parallax/1Stars.png",
  "/parallax/2Moon.png",
  "/parallax/3Mountains.png",
  "/parallax/4Trees1.png",
  "/parallax/4Trees2.png",
  "/parallax/5Trees.png",
  "/parallax/6Ground.png",
];

const imagePattern = /\.(avif|gif|jpe?g|png|svg|webp)(\?.*)?$/i;

const unique = (items) => [...new Set(items.filter(Boolean))];

const withTimeout = (promise, timeout = 18000) =>
  Promise.race([
    promise,
    new Promise((resolve) => {
      window.setTimeout(() => resolve(false), timeout);
    }),
  ]);

const loadImage = (src) =>
  new Promise((resolve) => {
    const image = new Image();

    image.decoding = "async";
    image.onload = async () => {
      try {
        if (image.decode) await image.decode();
      } catch {
        // Decoding may reject for SVGs or cached images; the resource still loaded.
      }

      resolve(true);
    };
    image.onerror = () => resolve(false);
    image.src = src;
  });

const loadResource = (src) => {
  if (imagePattern.test(src)) return loadImage(src);

  return fetch(src, { cache: "force-cache" })
    .then((response) => response.ok)
    .catch(() => false);
};

const getSiteAssets = () => {
  const workAssets = portfolio.flatMap((project) =>
    project.slides?.map((slide) => slide.src) ?? []
  );
  const serviceAssets = experiences.map((experience) => experience.visual);

  return unique([...heroAssets, ...workAssets, ...serviceAssets, cyborgWolfScene]);
};

export const waitForWindowLoad = () => {
  if (document.readyState === "complete") return Promise.resolve(true);

  return new Promise((resolve) => {
    window.addEventListener("load", () => resolve(true), { once: true });
  });
};

export const waitForFonts = () => {
  if (!document.fonts?.ready) return Promise.resolve(true);

  return document.fonts.ready.catch(() => true);
};

export const preloadSiteAssets = async ({ onProgress } = {}) => {
  const assets = getSiteAssets();
  let completed = 0;

  onProgress?.(0);

  await Promise.allSettled(
    assets.map((asset) =>
      withTimeout(loadResource(asset)).finally(() => {
        completed += 1;
        onProgress?.(Math.round((completed / assets.length) * 100));
      })
    )
  );

  onProgress?.(100);
};
