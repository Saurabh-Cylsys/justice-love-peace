// function removeClass(){
//   let element = document.getElementById('offcanvasScrolling');
// if (element.classList.contains('show')) {
//     element.classList.remove('show');
// }
// }

// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
//     document.getElementById("logo").style.width = "80%";
//   } else {
//     document.getElementById("logo").style.width = "100%";
//   }
// }

// Wait for the DOM to load before executing the script
document.addEventListener("DOMContentLoaded", function () {
  window.onscroll = function () {
    scrollFunction();
  };
});

function scrollFunction() {
  const logo = document.getElementById("logo");

  // ✅ Check if the element exists to avoid errors
  if (logo) {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      logo.style.width = "80%";
    } else {
      logo.style.width = "100%";
    }
  } else {
    console.warn("Element with ID 'logo' not found!"); // Debugging message
  }
}
