import Lenis from "@studio-freight/lenis";

// Smooth scrolling effect
let lenis;

const initSmoothScrolling = () => {
  // Smooth scrolling initialization
  lenis = new Lenis({
    lerp: 0.1,
    smooth: true,
    direction: "vertical",
  });
  const scrollFn = () => {
    lenis.raf();
    requestAnimationFrame(scrollFn);
  };
  requestAnimationFrame(scrollFn);
};

// After loading of the page
initSmoothScrolling()