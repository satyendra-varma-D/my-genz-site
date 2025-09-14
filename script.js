// Typing Effect
const typedText = document.getElementById("typed-text");
const phrases = ["Tech Professional", "Data & AI Explorer", "Creative Problem Solver"];
let i = 0, j = 0, currentPhrase = [], isDeleting = false;

function loop() {
  typedText.innerHTML = currentPhrase.join('');
  if (!isDeleting && j <= phrases[i].length) {
    currentPhrase.push(phrases[i][j]);
    j++;
  }
  if (isDeleting && j <= phrases[i].length) {
    currentPhrase.pop();
    j--;
  }
  if (j === phrases[i].length) {
    isDeleting = true;
    setTimeout(loop, 1500); return;
  }
  if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % phrases.length;
  }
  setTimeout(loop, isDeleting ? 80 : 120);
}
loop();
