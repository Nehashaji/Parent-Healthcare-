// Toggle mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close menu on nav link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Update active button styles and HTML lang attribute
function updateLangButtons(lang) {
  const arabicBtn = document.getElementById('arabicBtn');
  const englishBtn = document.getElementById('englishBtn');
  if (lang === 'ar') {
    arabicBtn.classList.add('active');
    englishBtn.classList.remove('active');
    document.documentElement.lang = 'ar';
  } else {
    englishBtn.classList.add('active');
    arabicBtn.classList.remove('active');
    document.documentElement.lang = 'en';
  }
}

// Sync Google Translate dropdown selection with buttons
function syncButtonsWithDropdown() {
  const iframe = document.querySelector('iframe.goog-te-menu-frame');
  if (!iframe) return;

  try {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const combo = iframeDoc.querySelector('.goog-te-combo');

    if (combo) {
      combo.addEventListener('change', () => {
        const lang = combo.value;
        updateLangButtons(lang);
      });
    }
  } catch (e) {
    // Cross-origin iframe might block access
  }
}

// Trigger Google Translate language change by selecting dropdown value
function setLanguage(lang) {
  let tries = 0;
  let interval = setInterval(() => {
    const iframe = document.querySelector('iframe.goog-te-menu-frame');
    if (iframe) {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const combo = iframeDoc.querySelector('.goog-te-combo');
        if (combo) {
          combo.value = lang;
          combo.dispatchEvent(new Event('change'));
          clearInterval(interval);
          updateLangButtons(lang);
        }
      } catch (e) {
        // Sometimes iframe not accessible immediately
      }
    }
    if (++tries > 20) clearInterval(interval);
  }, 500);
}

// Language button clicks
document.getElementById('arabicBtn').addEventListener('click', () => setLanguage('ar'));
document.getElementById('englishBtn').addEventListener('click', () => setLanguage('en'));

// On page load, sync lang buttons and attach dropdown listener
window.addEventListener('load', () => {
  // Set lang attribute initially
  const initialLang = document.documentElement.lang || 'en';
  updateLangButtons(initialLang);

  // Sync buttons with dropdown changes
  setTimeout(syncButtonsWithDropdown, 2000); 
});

//Gallery page 
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery-card img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox .close");

  images.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
});

