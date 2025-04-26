function showImage(src) {
  const imageModalEl = document.getElementById('imageModal');
  const modal = new bootstrap.Modal(imageModalEl);

  document.getElementById('popupImage').src = src;
  modal.show();

  // Close on X click
  document.querySelector('.close-btn').onclick = function () {
    modal.hide();

    // Remove the backdrop manually after a delay to match Bootstrap transition
    setTimeout(() => {
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();
      // Optional: also remove 'modal-open' class from body
      document.body.classList.remove('modal-open');
      document.body.style = '';
    }, 300); // Bootstrap uses 300ms fade by default
  };
}