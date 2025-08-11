// Toggle menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

document.getElementById("btn-en").addEventListener("click", function () {
  changeLanguage('en');
  this.classList.add("active");
  document.getElementById("btn-ar").classList.remove("active");
});

document.getElementById("btn-ar").addEventListener("click", function () {
  changeLanguage('ar');
  this.classList.add("active");
  document.getElementById("btn-en").classList.remove("active");
});

function changeLanguage(lang) {
  var select = document.querySelector(".goog-te-combo");
  if (select) {
    select.value = lang;
    select.dispatchEvent(new Event("change"));
  }
}
