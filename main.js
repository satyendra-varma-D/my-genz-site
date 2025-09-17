// ===== Typewriter Effect =====
const typedText = document.getElementById("typed-text");
const roles = [
  "Project Manager",
  "Business Analyst",
  "Data Scientist",
  "AI/ML Explorer",
  "Functional Consultant"
];

let roleIndex = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

function typeEffect() {
  if (isDeleting) {
    currentText = roles[roleIndex].substring(0, charIndex--);
  } else {
    currentText = roles[roleIndex].substring(0, charIndex++);
  }

  typedText.textContent = currentText;

  if (!isDeleting && charIndex === roles[roleIndex].length) {
    setTimeout(() => (isDeleting = true), 1000); // pause before deleting
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length; // next word
  }

  setTimeout(typeEffect, isDeleting ? 60 : 120);
}
typeEffect();

// ===== Smooth Scroll for Navbar =====
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ===== GSAP Animations =====
window.addEventListener("load", () => {
  if (typeof gsap !== "undefined") {
    gsap.from(".hero-content h1", { y: 50, opacity: 0, duration: 1 });
    gsap.from(".hero-content h2", { y: 50, opacity: 0, duration: 1, delay: 0.3 });
    gsap.from(".cta-btn", { scale: 0, opacity: 0, duration: 0.8, delay: 0.6 });

    gsap.utils.toArray("section").forEach(section => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1
      });
    });
  }
});

// ===== Particle Background =====
const canvas = document.getElementById("bg-animation");
const ctx = canvas.getContext("2d");

let particles = [];
const numParticles = 80;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "#39ff14";
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}
initParticles();

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });

  connectParticles();
  requestAnimationFrame(animateParticles);
}

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        ctx.strokeStyle = "rgba(57, 255, 20, 0.1)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}
// ===================
// Smooth scrolling, text effects, nav highlight
// (your existing code here)
// ===================


// ===================
// Neural Network Background Animation
// ===================
const canvas = document.getElementById("bg-animation");
const ctx = canvas.getContext("2d");

let nodes = [];
const numNodes = 70;

// resize, class Node, initNodes(), connectNodes(), animateNetwork()
// (all the code I gave you goes here)

// finally, run it
animateNetwork();
