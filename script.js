// Scroll progress bar
var progress = document.querySelector(".scroll-progress");
if (progress) {
  window.addEventListener("scroll", function() {
    var h = document.documentElement;
    var scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    progress.style.width = (scrolled * 100) + "%";
  });
}

// Smooth scroll
document.querySelectorAll("a[href^='#']").forEach(function(anchor) {
  anchor.addEventListener("click", function(e) {
    var target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Active nav highlight
var sections = document.querySelectorAll("section[id], footer[id]");
var navLinks = document.querySelectorAll(".nav a, .bottom-nav a");
window.addEventListener("scroll", function() {
  var pos = window.scrollY + 120;
  var current = "";
  sections.forEach(function(sec) {
    if (pos >= sec.offsetTop) current = sec.id;
  });
  navLinks.forEach(function(link) {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});

// Project filter
var filterBtns = document.querySelectorAll(".filter-btn");
var cards = document.querySelectorAll(".project-card");

filterBtns.forEach(function(btn) {
  btn.addEventListener("click", function() {
    filterBtns.forEach(function(b) { b.classList.remove("active"); });
    btn.classList.add("active");
    var f = btn.getAttribute("data-filter");

    cards.forEach(function(card) {
      var show = (f === "all") || (card.getAttribute("data-category") === f);
      card.style.display = show ? "flex" : "none";
      if (show) {
        card.classList.remove("in");
        void card.offsetWidth;
        card.classList.add("in");
      }
    });
  });
});

// Reveal on scroll
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal").forEach(function(el) {
  observer.observe(el);
});

// Back to top
var backToTop = document.getElementById("backToTop");
if (backToTop) {
  window.addEventListener("scroll", function() {
    backToTop.classList.toggle("visible", window.scrollY > 500);
  }, { passive: true });

  backToTop.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Page load transition
document.addEventListener("DOMContentLoaded", function() {
  document.body.classList.add("page-loaded");
});

// Cursor spotlight on cards
var spotlightCards = document.querySelectorAll(".project-card");
spotlightCards.forEach(function(card) {
  card.addEventListener("mousemove", function(e) {
    var rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", (e.clientX - rect.left) + "px");
    card.style.setProperty("--my", (e.clientY - rect.top) + "px");
  });
});