// This file opens and closes the menu on mobile.

// Step 1: get the menu button and the nav menu
var menuBtn = document.getElementById("menuBtn");
var menu = document.getElementById("menu");

// Step 2: when the button is clicked, show or hide the menu
menuBtn.addEventListener("click", function () {
  menu.classList.toggle("show");
});
