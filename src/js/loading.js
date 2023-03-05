class VideoLoader {
  constructor(selector) {
    this.videos = document.querySelectorAll(selector);
    this.loadedVideos = 0;
    this.loaded = false;
  }

  init(callback) {
    this.videos.forEach((video) => {
      video.addEventListener("loadeddata", this.checkVideosLoaded.bind(this));
    });

    setTimeout(() => {
      if (this.loaded) {
        console.log("loaded");
        if (callback) callback();
      }
    }, 1000);
  }

  checkVideosLoaded() {
    this.loadedVideos++;
    if (this.loadedVideos === this.videos.length) {
      this.loaded = true;
    }
  }
}

export default VideoLoader;
