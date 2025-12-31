// Sticky Header Shrink
const header = document.getElementById("mainHeader");

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
});

// Initialize AOS (Animate on Scroll)
AOS.init({ duration: 800, once: true });

// Counter animation
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const counter = entry.target;
      const target = +counter.getAttribute('data-target');
      const increment = target / 200;

      let count = 0;
      const updateCounter = () => {
        count += increment;
        if(count < target){
          counter.textContent = Math.ceil(count);
          requestAnimationFrame(updateCounter);
        } else{
          counter.textContent = target;
        }
      };
      updateCounter();
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });
counters.forEach(counter => counterObserver.observe(counter));

// Progress bars animation
const progressBars = document.querySelectorAll('.progress-bar');
const progressObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const fill = entry.target.querySelector('.fill');
      fill.style.width = entry.target.getAttribute('data-progress');
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
progressBars.forEach(bar => progressObserver.observe(bar));

function trackPDFDownload() {
  console.log("Company Profile PDF downloaded");

  // Optional: Google Analytics event
  if (typeof gtag === "function") {
    gtag('event', 'download', {
      'event_category': 'Company Profile',
      'event_label': 'PDF Download'
    });
  }
}

const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector("nav");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}