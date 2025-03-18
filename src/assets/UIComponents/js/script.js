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
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("logo").style.width = "37%";
    document.getElementById("logo").style.top = "0";
    document.getElementById("logo").style.position = "relative";
  } else {
    document.getElementById("logo").style.width = "100%";
    document.getElementById("logo").style.top = "0rem";
    document.getElementById("logo").style.position = "absolute";
  }
}
