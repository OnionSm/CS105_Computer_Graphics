"use strict";

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector("#canvas");
const gl = canvas.getContext("webgl");
if (!gl) {
  throw new Error("WebGL not supported");
}
console.log(`width ${gl.canvas.width}`);
console.log(`width hiển thị thực tế (getBoundingClientRect): ${canvas.getBoundingClientRect().width}`);

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
setGeometrySingleObject(gl);

// ----------------------------------------------- INIT ATTRIBUTES ---------------------------------------------------
let translation = [100, 150];
let rotation = [0, 1];
let color = [Math.random(), Math.random(), Math.random(), 1];
let scale = [1, 1];
let objectAmount = 1;
let valueToggle = false;
let valueToggleMultipleObject = false;
let objects = [];
// -------------------------------------------------------------------------------------------------------------------
// ADD NEW OBJECT
function addNewObject() {
  const velocity = [getRandomVelocity(), getRandomVelocity()];
  objects.push({ position: [...translation], velocity });
}
// RANDOM VELOCITY
function getRandomVelocity(min = -3, max = 3) {
  return Math.random() * (max - min) + min;
}
function setGeometry(gl, scaleX = 1, scaleY = 1) 
{
  const positions = drawPoint(scaleX, scaleY);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
}


function drawPoint(scaleX, scaleY) 
{
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
function updateObjects() 
{
  objects.forEach((obj) => {
    obj.position[0] += obj.velocity[0];
    obj.position[1] += obj.velocity[1];

    if (obj.position[0] < 0 || obj.position[0] > gl.canvas.width) obj.velocity[0] *= -1;
    if (obj.position[1] < 0 || obj.position[1] > gl.canvas.height) obj.velocity[1] *= -1;
  });
}

// ----------------------------------------- DRAW SCENE -------------------------------------------
function drawScene()
{
  if(valueToggleMultipleObject)
  {
    drawSceneMultipleObject();
  }
  else
  {
    drawSceneSingleObject();
  }
}
function drawSceneMultipleObject() 
{
  webglUtils.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program);
  gl.enableVertexAttribArray(positionLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  var size = 2;
  var type = gl.FLOAT;
  var normalize = false;
  var stride = 0; 
  var offset = 0;
  gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);

  gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
  gl.uniform4fv(colorLocation, color);
  gl.uniform2fv(rotationLocation, rotation);
  gl.uniform2fv(scaleLocation, scale);
  
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 3000;
  objects.forEach((obj) => {
    gl.uniform2fv(translationLocation, obj.position);
    gl.drawArrays(primitiveType, offset, count);
  });
}
function drawSceneSingleObject() 
{
  webglUtils.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program);
  gl.enableVertexAttribArray(positionLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  var size = 2;
  var type = gl.FLOAT;
  var normalize = false;
  var stride = 0; 
  var offset = 0;
  gl.vertexAttribPointer(
  positionLocation, size, type, normalize, stride, offset);
  gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
  gl.uniform4fv(colorLocation, color);
  gl.uniform2fv(translationLocation, translation);
  gl.uniform2fv(rotationLocation, rotation);
  gl.uniform2fv(scaleLocation, scale);
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 18;
  gl.drawArrays(primitiveType, offset, count);
}
// ------------------------------------------------------------------------------------------------------------------


// ------------------------------------------------  UI ELEMENTS ---------------------------------------------------

webglLessonsUI.setupSlider("#x", { value: translation[0], slide: updatePosition(0), max: canvas.getBoundingClientRect().width });
webglLessonsUI.setupSlider("#y", { value: translation[1], slide: updatePosition(1), max: canvas.getBoundingClientRect().height });
webglLessonsUI.setupSlider("#angle", { slide: updateAngle, max: 360 });
webglLessonsUI.setupSlider("#scaleX", { value: scale[0], slide: updateScale(0), min: -10, max: 10, step: 0.1 });
webglLessonsUI.setupSlider("#scaleY", { value: scale[1], slide: updateScale(1), min: -10, max: 10, step: 0.1 });
webglLessonsUI.setupSlider("#Objects", { value: objectAmount, slide: updateObjectAmount, min: 1, max: 100 });

const container = document.querySelector("#Animations");
const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.checked = valueToggle; 
checkbox.onchange = (e) => updateToggle(e.target.checked);
const label = document.createElement("label");
label.textContent = "Animation";
label.prepend(checkbox);
container.appendChild(label);

const container_multiple_object = document.querySelector("#multiple_object");
const checkbox_multiple_object = document.createElement("input");
checkbox_multiple_object.type = "checkbox";
checkbox_multiple_object.checked = valueToggle; 
checkbox_multiple_object.onchange = (e) => updateToggleMultipleObject(e.target.checked);
const label_multiple_object = document.createElement("label");
label_multiple_object.textContent = "Multiple Objects";
label_multiple_object.prepend(checkbox_multiple_object);
container_multiple_object.appendChild(label_multiple_object);
// -----------------------------------------------------------------------------------------------------------------


// ---------------------------------------------------- UI FUNCTIONS --------------------------------------------------
function updateToggle(checked) 
{ 
  console.log("Toggle Animation:", checked);
  valueToggle = checked;
}

function updateToggleMultipleObject(checked)
{
  valueToggleMultipleObject = checked;
  if(valueToggleMultipleObject)
  {
    for (let i = 0; i < objectAmount; i++) addNewObject();
    setGeometry(gl);
  }
  else
  {
    setGeometrySingleObject(gl);
  }
}

function updateObjectAmount(event, ui) 
{
  objectAmount = ui.value;
  objects = [];
  for (let i = 0; i < objectAmount; i++) addNewObject();
  drawScene();
}

function updatePosition(index) 
{
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

function setGeometrySingleObject(gl) 
{
  gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array([
  // left column
  0, 0,
  30, 0,
  0, 150,
  0, 150,
  30, 0,
  30, 150,

  // top rung
  30, 0,
  100, 0,
  30, 30,
  30, 30,
  100, 0,
  100, 30,

  // middle rung
  30, 60,
  67, 60,
  30, 90,
  30, 90,
  67, 60,
  67, 90,
  ]),
  gl.STATIC_DRAW);
}
// ------------------------------------------------------------------------------------------------------------------

// Init objects and start animation
if(valueToggle)
{
  for (let i = 0; i < objectAmount; i++) addNewObject();
  setGeometry(gl);
}
function animate() {
  if (valueToggle) updateObjects();
  drawScene();
  requestAnimationFrame(animate);
}
animate();
