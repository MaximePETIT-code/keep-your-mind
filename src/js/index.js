import Lenis from "@studio-freight/lenis";

const previews = document.querySelectorAll(".preview");

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

let rotateFunction; // Variable to store rotate function

function rotateToMouse(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const preview = e.target;
  const previewSize = preview.getBoundingClientRect();
  const leftX = mouseX - previewSize.x;
  const topY = mouseY - previewSize.y;
  const center = {
    x: leftX - previewSize.width / 2,
    y: topY - previewSize.height / 2,
  };
  const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

  this.style.transform = `
    scale3d(1.05, 1.05, 1.05)
    rotate3d(
      0.5,
      ${center.x / 100},
      0.08,
      ${Math.log(distance) * 4}deg
    )
  `;
}

previews.forEach(preview => {
  preview.addEventListener("mouseenter", () => {
    rotateFunction = rotateToMouse.bind(preview);
    preview.addEventListener("mousemove", rotateFunction);
  });

  preview.addEventListener("mouseleave", () => {
    preview.removeEventListener("mousemove", rotateFunction);
    preview.style.transform = "";
    preview.style.opacity = "";
  });
});

// After loading of the page
initSmoothScrolling();
