/* =====================================================
   AMBIENT CANVAS – DATA PARTICLES (BACKGROUND LAYER)
===================================================== */

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];
const PARTICLE_COUNT = 300;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.15;
    this.vy = (Math.random() - 0.5) * 0.15;
    this.size = Math.random() * 1.6 + 0.4;
    this.alpha = Math.random() * 0.5 + 0.15;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (
      this.x < 0 || this.x > width ||
      this.y < 0 || this.y > height
    ) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(120, 190, 255, ${this.alpha})`;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }
}
initParticles();

function animateCanvas() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateCanvas);
}
animateCanvas();

/* =====================================================
   SCROLL REVEAL – SUBTLE, ENTERPRISE SAFE
===================================================== */

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll("section, .skill, .project-card")
  .forEach(el => observer.observe(el));

/* =====================================================
   NAVIGATION – ACTIVE SECTION INDICATOR
===================================================== */

const navLinks = document.querySelectorAll(".navbar a");
const sections = [...document.querySelectorAll("section")];

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* =====================================================
   DATA LOAD SAFETY CHECK (OPTIONAL HARDENING)
===================================================== */

window.addEventListener("error", (e) => {
  console.warn("Non-blocking error detected:", e.message);
});
