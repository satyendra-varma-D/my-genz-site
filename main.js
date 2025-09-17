const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// Starfield setup
const numStars = 1200;
let stars = [];

function initStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: (Math.random() - 0.5) * canvas.width,
      y: (Math.random() - 0.5) * canvas.height,
      z: Math.random() * canvas.width,
      size: Math.random() * 2 + 0.5
    });
  }
}
initStars();

// Draw stars
function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    star.z -= 5; // star speed

    if (star.z <= 0) {
      star.x = (Math.random() - 0.5) * canvas.width;
      star.y = (Math.random() - 0.5) * canvas.height;
      star.z = canvas.width;
      star.size = Math.random() * 2 + 0.5;
    }

    let k = 200 / star.z;
    let sx = star.x * k + canvas.width / 2;
    let sy = star.y * k + canvas.height / 2;
    let size = star.size * (1 - star.z / canvas.width) * 2;

    if (sx >= 0 && sx < canvas.width && sy >= 0 && sy < canvas.height) {
      ctx.fillStyle = `rgba(0, 240, 255, ${1 - star.z / canvas.width})`;
      ctx.fillRect(sx, sy, size, size);
    }
  }

  requestAnimationFrame(draw);
}

draw();
