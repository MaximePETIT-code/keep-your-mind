import Lenis from "@studio-freight/lenis";
import VideoLoader from "./loading";

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

  if (!this.classList.contains("active")) {
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
}

previews.forEach((preview) => {
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

function showPreview(event) {
  document.body.style.overflow = "hidden";
  document.querySelector(".close").classList.add('active')
  const clickedPreview = event.currentTarget;
  hidePreviews();
  clickedPreview.classList.remove("hidden");
  clickedPreview.classList.add("active");

  const video = clickedPreview.querySelector("video");
  video.currentTime = 0;
  video.muted = false;
  video.loop = false;

  video.addEventListener("ended", showAllPreviews);
}

function hidePreviews() {
  previews.forEach((preview) => {
    preview.classList.add("hidden");
  });
}

function showAllPreviews() {
  document.body.style.overflow = "auto";
  document.querySelector(".close").classList.remove('active')
  const activePreview = document.querySelector(".preview.active");
  const id = activePreview.getAttribute("id");
  const video = activePreview.querySelector("video");

  video.currentTime = 0;
  video.muted = true;
  video.loop = true;
  window.location.href = `#${id}`;
  previews.forEach((preview) => {
    preview.classList.remove("hidden");
    preview.classList.remove("active");
  });
}

previews.forEach((preview) => {
  preview.addEventListener("click", showPreview);
});

const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", showAllPreviews);

// After loading of the page
const loader = new VideoLoader("video");
loader.init(() => {
  if (loader.loaded) {
    document.querySelector("main").classList.add("loaded");
    setTimeout(() => {
      document.body.style.overflow = "visible";
      initSmoothScrolling();
    }, 1000);
  }
});
