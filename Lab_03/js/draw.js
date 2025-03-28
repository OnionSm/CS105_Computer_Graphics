"use strict";

import ConfigDropdown from "./dropdown.js";

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector("#canvas");
const gl = canvas.getContext("webgl");
if (!gl) {
  throw new Error("WebGL not supported");
}
console.log(`width ${gl.canvas.width}`);
console.log(`width hiển thị thực tế (getBoundingClientRect): ${canvas.getBoundingClientRect().width}`);

// Setup GLSL program

const program = gl.createProgram();


// // Look up attributes and uniforms
// const positionLocation = gl.getAttribLocation(program, "a_position");
// const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
// const colorLocation = gl.getUniformLocation(program, "u_color");
// const translationLocation = gl.getUniformLocation(program, "u_translation");
// const rotationLocation = gl.getUniformLocation(program, "u_rotation");
// const scaleLocation = gl.getUniformLocation(program, "u_scale");

let color = [Math.random(), Math.random(), Math.random(), 1];





const a = 1.0, b = 0.0, c = 0.0;
const vertices = [];
const numPoints = 100;
const xMin = -1, xMax = 1;

for (let i = 0; i <= numPoints; i++) {
    let x = xMin + (i / numPoints) * (xMax - xMin);
    let y = a * x * x + b * x + c;
    vertices.push(x, y);
}
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

const vertexShaderSource = `
    attribute vec2 a_position;
    void main() {
        gl_Position = vec4(a_position, 0, 1);
    }
`;

const fragmentShaderSource = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(1, 0, 0, 1);
    }
`;

function createShader(gl, type, source) 
{
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) 
    {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) 
{
    console.error(gl.getProgramInfoLog(program));
}
const positionLocation = gl.getAttribLocation(program, "a_position");

function DrawObject() 
{
  gl.useProgram(program);
  
  gl.enableVertexAttribArray(positionLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  gl.clearColor(1, 1, 1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.LINE_STRIP, 0, vertices.length / 2);

}
// DrawObject();

document.addEventListener("DOMContentLoaded", () => {
  ConfigDropdown(gl, vertices, () => DrawObject(), positionLocation);
});

