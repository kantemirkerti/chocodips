
  
  document.addEventListener("DOMContentLoaded", function () {
    const lazyVideos = document.querySelectorAll("video.lazy-video");

    if ("IntersectionObserver" in window) {
      const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target;
            const src = video.getAttribute("data-src");
            if (src) {
              video.src = src;
              video.load();
              video.classList.remove("lazy-video");
              observer.unobserve(video);
            }
          }
        });
      });

      lazyVideos.forEach((video) => {
        videoObserver.observe(video);
      });
    } else {
      // Fallback for older browsers: load all videos immediately
      lazyVideos.forEach((video) => {
        const src = video.getAttribute("data-src");
        if (src) {
          video.src = src;
          video.load();
          video.classList.remove("lazy-video");
        }
      });
    }
  });

