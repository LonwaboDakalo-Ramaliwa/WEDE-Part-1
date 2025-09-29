document.addEventListener('DOMContentLoaded', function() {

  function setupLightbox(galleryId, lightboxId, imgId, captionId) {
    const gallery = document.getElementById(galleryId);
    const galleryImages = gallery.querySelectorAll('img');
    const lightbox = document.getElementById(lightboxId);
    const lightboxImg = document.getElementById(imgId);
    const captionText = document.getElementById(captionId);
    const closeBtn = lightbox.querySelector('.close-btn');
    const prevArrow = lightbox.querySelector('.prev-arrow');
    const nextArrow = lightbox.querySelector('.next-arrow');

    let currentIndex = 0;

    
    gallery.addEventListener('click', function(event) {
      if (event.target.tagName === 'IMG') {
        currentIndex = Array.from(galleryImages).indexOf(event.target);
        if (currentIndex > -1) {
          lightbox.classList.add('active');
          updateLightbox();
        }
      }
    });

   
    closeBtn.addEventListener('click', function() {
      lightbox.classList.remove('active');
    });

    
    lightbox.addEventListener('click', function(event) {
      if (event.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });

   
    function updateLightbox() {
      const currentImage = galleryImages[currentIndex];
      lightboxImg.src = currentImage.getAttribute('data-src');
      captionText.textContent = currentImage.getAttribute('data-caption') || '';
    }

    prevArrow.addEventListener('click', function() {
      currentIndex = (currentIndex === 0) ? galleryImages.length - 1 : currentIndex - 1;
      updateLightbox();
    });

    nextArrow.addEventListener('click', function() {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      updateLightbox();
    });

   
    document.addEventListener('keydown', function(event) {
      if (lightbox.classList.contains('active')) {
        if (event.key === 'ArrowRight') {
          currentIndex = (currentIndex + 1) % galleryImages.length;
          updateLightbox();
        } else if (event.key === 'ArrowLeft') {
          currentIndex = (currentIndex === 0) ? galleryImages.length - 1 : currentIndex - 1;
          updateLightbox();
        } else if (event.key === 'Escape') {
          lightbox.classList.remove('active');
        }
      }
    });
  }

 
  setupLightbox("dog-gallery", "dog-lightbox", "dog-lightbox-img", "dog-caption");//This allows the website to have 3 different lightboxes instead of one combined
  setupLightbox("cat-gallery", "cat-lightbox", "cat-lightbox-img", "cat-caption");
  setupLightbox("pet-gallery", "pet-lightbox", "pet-lightbox-img", "pet-caption");

});

