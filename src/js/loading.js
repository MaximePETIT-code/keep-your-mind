class VideoLoader {
  constructor(selector) {
    this.videos = document.querySelectorAll(selector);
    this.loadedVideos = 0;
    this.loaded = false;
  }

  init(callback) {
    this.videos.forEach((video) => {
      console.log("loading...");
      video.addEventListener("loadeddata", () => {
        this.checkVideosLoaded();
        if (this.loaded && callback) {
          console.log("loaded");
          setTimeout(() => {
            callback();
          }, 1000)
        }
      });
    });
  }

  checkVideosLoaded() {
    this.loadedVideos++;
    if (this.loadedVideos === this.videos.length) {
      this.loaded = true;
    }
  }
}

export default VideoLoader;
