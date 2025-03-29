const DrawHeart = (gl, DrawObject = null, a) => {
  console.log("Drawing Heart with a =", a);
  var scale = 0.05;
  var steps = 500;
  // Reset vertices array
  var vertices = [];
  
  const minX = -Math.sqrt(200); // Giới hạn toán học của hàm √(33 - x²)
  const maxX = Math.sqrt(200);
  const step = (maxX - minX) / steps;

  // Tính toán các điểm
  for (let x = minX; x <= maxX; x += step) 
  {
    const y = Math.pow(Math.abs(x), 2/3) + 
              0.8 * Math.sqrt(200 - x**2) * // Đảm bảo không âm
              Math.sin(0.01 * a * Math.PI * x);
    
    vertices.push(x * scale, y  * scale);  // Top
  }

  // Cập nhật buffer
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  DrawObject();
  
  return vertices.length / 3; // Trả về số lượng vertices
}

export default DrawHeart;
