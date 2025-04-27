// Initialize Fancybox on WordPress galleries
document.addEventListener("DOMContentLoaded", function () {
  const galleryImages = document.querySelectorAll(".wp-block-gallery a");
  if (galleryImages.length) {
    galleryImages.forEach((link) => {
      link.setAttribute("data-fancybox", "gallery");
    });

    Fancybox.bind("[data-fancybox='gallery']", {
      Thumbs: false,
      Toolbar: true,
    });
  }
});
