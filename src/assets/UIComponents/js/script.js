// function showImage(src) {
//   const imageModalEl = document.getElementById('imageModal');
//   const modal = new bootstrap.Modal(imageModalEl);

//   document.getElementById('popupImage').src = src;
//   modal.show();

  
//   document.querySelector('.close-btn').onclick = function () {
//     modal.hide();

//     setTimeout(() => {
//       const backdrop = document.querySelector('.modal-backdrop');
//       if (backdrop) backdrop.remove();
      
//       document.body.classList.remove('modal-open');
//       document.body.style = '';
//     }, 300); 
//   };
// }