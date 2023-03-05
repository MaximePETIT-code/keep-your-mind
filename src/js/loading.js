class VideoLoader {
  constructor(selector) {
    this.videos = document.querySelectorAll(selector);
    this.loadedVideos = 0;
    this.loaded = false;
  }

  init(callback) {
    this.videos.forEach((video) => {
      video.addEventListener("loadeddata", () => {
        this.loadedVideos++;
        if (this.loadedVideos === this.videos.length) {
          this.loaded = true;
          if (callback) {
            callback();
          }
        }
      });
    });
  }
}

export default VideoLoader;
