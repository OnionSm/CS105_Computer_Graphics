"use strict";

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector("#canvas");
const gl = canvas.getContext("webgl");
if (!gl) {
  throw new Error("WebGL not supported");
}

// Setup GLSL program
const program = webglUtils.createProgramFromScripts(gl, ["vertex-shader-2d", "fragment-shader-2d"]);

// Look up attributes and uniforms
const positionLocation = gl.getAttribLocation(program, "a_position");
const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
const colorLocation = gl.getUniformLocation(program, "u_color");
const translationLocation = gl.getUniformLocation(program, "u_translation");
const rotationLocation = gl.getUniformLocation(program, "u_rotation");
const scaleLocation = gl.getUniformLocation(program, "u_scale");

// Create a buffer to put positions in
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// Initial Values
let translation = [100, 150];
let rotation = [0, 1];
let color = [Math.random(), Math.random(), Math.random(), 1];
let scale = [1, 1];
let objectAmount = 1;
let valueToggle = false;
let objects = [];

// Initialize objects
function addNewObject() {
  const velocity = [getRandomVelocity(), getRandomVelocity()];
  objects.push({ position: [...translation], velocity });
}

// Random velocity generator
function getRandomVelocity(min = -3, max = 3) {
  return Math.random() * (max - min) + min;
}

// Geometry setup
function setGeometry(gl, scaleX = 1, scaleY = 1) {
  const positions = drawPoint(scaleX, scaleY);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
}

function drawPoint(scaleX, scaleY) {
  const segments = 100;
  const positions = [];
  const radius = 25;

  for (let i = 0; i < segments; i++) {
    const theta1 = (i / segments) * Math.PI * 2;
    const theta2 = ((i + 1) / segments) * Math.PI * 2;

    const x0 = 0, y0 = 0;
    const x1 = Math.cos(theta1) * radius * scaleX;
    const y1 = Math.sin(theta1) * radius * scaleY;
    const x2 = Math.cos(theta2) * radius * scaleX;
    const y2 = Math.sin(theta2) * radius * scaleY;

    positions.push(x0, y0, x1, y1, x2, y2);
  }
  return positions;
}

// Update objects position
function updateObjects() {
  objects.forEach((obj) => {
    obj.position[0] += obj.velocity[0];
    obj.position[1] += obj.velocity[1];

    if (obj.position[0] < 0 || obj.position[0] > gl.canvas.width) obj.velocity[0] *= -1;
    if (obj.position[1] < 0 || obj.position[1] > gl.canvas.height) obj.velocity[1] *= -1;
  });
}

// Draw Scene
function drawScene() {
  webglUtils.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program);
  gl.enableVertexAttribArray(positionLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
  gl.uniform4fv(colorLocation, color);
  gl.uniform2fv(rotationLocation, rotation);
  gl.uniform2fv(scaleLocation, scale);

  objects.forEach((obj) => {
    gl.uniform2fv(translationLocation, obj.position);
    gl.drawArrays(gl.TRIANGLES, 0, 300);
  });
}

// UI Setup
webglLessonsUI.setupSlider("#x", { value: translation[0], slide: updatePosition(0), max: gl.canvas.width });
webglLessonsUI.setupSlider("#y", { value: translation[1], slide: updatePosition(1), max: gl.canvas.height });
webglLessonsUI.setupSlider("#angle", { slide: updateAngle, max: 360 });
webglLessonsUI.setupSlider("#scaleX", { value: scale[0], slide: updateScale(0), min: -10, max: 10, step: 0.1 });
webglLessonsUI.setupSlider("#scaleY", { value: scale[1], slide: updateScale(1), min: -10, max: 10, step: 0.1 });
webglLessonsUI.setupSlider("#Animations", { value: valueToggle, slide: updateToggle, min: 0, max: 1, step: 1 });
webglLessonsUI.setupSlider("#Objects", { value: objectAmount, slide: updateObjectAmount, min: 1, max: 100 });

function updateToggle(event, ui) {
  valueToggle = ui.value;
  console.log("Toggle state:", valueToggle);
}

function updateObjectAmount(event, ui) {
  objectAmount = ui.value;
  objects = [];
  for (let i = 0; i < objectAmount; i++) addNewObject();
  drawScene();
}

function updatePosition(index) {
  return function (event, ui) {
    translation[index] = ui.value;
    drawScene();
  };
}

function updateAngle(event, ui) {
  const angleInDegrees = 360 - ui.value;
  const angleInRadians = (angleInDegrees * Math.PI) / 180;
  rotation[0] = Math.sin(angleInRadians);
  rotation[1] = Math.cos(angleInRadians);
  drawScene();
}

function updateScale(index) {
  return function (event, ui) {
    scale[index] = ui.value;
    drawScene();
  };
}

// Init objects and start animation
for (let i = 0; i < objectAmount; i++) addNewObject();
setGeometry(gl);
function animate() {
  if (valueToggle) updateObjects();
  drawScene();
  requestAnimationFrame(animate);
}
animate();
