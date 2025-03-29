const DrawFlower = (gl, DrawObject, n) =>
{
  console.log("Drawing Flower");
  var step = 2* Math.PI / 100;
  var vertices = [];
  for(var i = 0; i <= 2 * Math.PI; i+= step)
  {
    var x = Math.cos(n * i) * Math.cos(i);
    var y = Math.cos(n * i) * Math.sin(i);
    vertices.push(x ,y);
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  DrawObject();
}

export default DrawFlower;