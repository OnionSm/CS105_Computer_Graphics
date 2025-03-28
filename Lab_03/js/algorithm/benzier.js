const factorial = (num) => {
    if (num === 0 || num === 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) {
        result *= i;
    }
    return result;
};

const binomialCoefficient = (n, i) => {
    return factorial(n) / (factorial(i) * factorial(n - i));
};

const DrawBezier = (gl, vertices, DrawObject = null, positionLocation) => {
    console.log("Drawing Bezier with", vertices.length / 2, "control points");

    if (!vertices || vertices.length < 4 || vertices.length % 2 !== 0) {
        console.error("Vertices array must contain an even number of values (at least 2 points).");
        return;
    }

    const n = vertices.length / 2 - 1; // Bậc của Bezier
    const controlPoints = [];

    for (let i = 0; i < vertices.length; i += 2) {
        controlPoints.push({ x: vertices[i], y: vertices[i + 1] });
    }

    const newVertices = [];

    for (let t = 0.0; t <= 1.0; t += 0.05) 
    {
        let x = 0, y = 0;

        for (let i = 0; i <= n; i++) 
        {
            const bernstein = binomialCoefficient(n, i) * Math.pow(1 - t, n - i) * Math.pow(t, i);
            x += bernstein * controlPoints[i].x;
            y += bernstein * controlPoints[i].y;
        }

        newVertices.push(x / gl.canvas.width, y / gl.canvas.height);
        
    }
    console.log(newVertices);
    // Gửi dữ liệu mới vào WebGL buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(newVertices), gl.STATIC_DRAW);

   
    DrawObject();
};

export default DrawBezier;
