const DrawHermit = (gl, point_a, point_b, vector_a, vector_b, DrawObject = null, positionLocation) => {
  console.log("Drawing Hermite with control points:", point_a, point_b);

  if (!point_a || !point_b || !vector_a || !vector_b) {
      console.error("All input parameters (point_a, point_b, vector_a, vector_b) must be provided.");
      return;
  }

  const newVertices = [];
  
  for (let t = 0; t <= 1; t += 0.05) 
  {
      const t2 = t * t;
      const t3 = t2 * t;

      const h00 = 2 * t3 - 3 * t2 + 1;
      const h10 = t3 - 2 * t2 + t;
      const h01 = -2 * t3 + 3 * t2;
      const h11 = t3 - t2;

      const x = h00 * point_a.x + h10 * vector_a.x + h01 * point_b.x + h11 * vector_b.x;
      const y = h00 * point_a.y + h10 * vector_a.y + h01 * point_b.y + h11 * vector_b.y;

      newVertices.push(x / gl.canvas.width, y / gl.canvas.height);
  }

  console.log(newVertices);
  // Gửi dữ liệu mới vào WebGL buffer
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(newVertices), gl.STATIC_DRAW);

  DrawObject();
};

export default DrawHermit;
