const canvas = document.getElementById("shaderCanvas");
const gl = canvas.getContext("webgl");

// Resize canvas
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);
}
window.addEventListener("resize", resize);
resize();

// Compile shader
function compileShader(src, type) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader error:", gl.getShaderInfoLog(shader));
  }
  return shader;
}

// Create program
const fragShader = compileShader(document.getElementById("fragShader").textContent, gl.FRAGMENT_SHADER);
const vertShader = compileShader(`
  attribute vec4 position;
  void main() {
    gl_Position = position;
  }
`, gl.VERTEX_SHADER);

const program = gl.createProgram();
gl.attachShader(program, vertShader);
gl.attachShader(program, fragShader);
gl.linkProgram(program);
gl.useProgram(program);

// Setup geometry
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  -1, -1,  1, -1, -1, 1,
  -1,  1,  1, -1,  1, 1
]), gl.STATIC_DRAW);

const positionLoc = gl.getAttribLocation(program, "position");
gl.enableVertexAttribArray(positionLoc);
gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

// Uniforms
const timeLoc = gl.getUniformLocation(program, "time");
const resolutionLoc = gl.getUniformLocation(program, "resolution");

// Animation loop
function render(t) {
  gl.uniform1f(timeLoc, t * 0.001);
  gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  requestAnimationFrame(render);
}
render(0);
