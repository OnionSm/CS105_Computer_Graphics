const ConfigHermitInputField = (gl, DrawHermit, DrawObject, positionLocation) => {
    const point_a_x = document.getElementById("point_a_x");
    const point_a_y = document.getElementById("point_a_y");
    const point_b_x = document.getElementById("point_b_x");
    const point_b_y = document.getElementById("point_b_y");
    const vector_a_x = document.getElementById("vector_a_x");
    const vector_a_y = document.getElementById("vector_a_y");
    const vector_b_x = document.getElementById("vector_b_x");
    const vector_b_y = document.getElementById("vector_b_y");

    const updateAndDraw = () => {
        const point_a = { x: parseFloat(point_a_x.value), y: parseFloat(point_a_y.value) };
        const point_b = { x: parseFloat(point_b_x.value), y: parseFloat(point_b_y.value) };
        const vector_a = { x: parseFloat(vector_a_x.value), y: parseFloat(vector_a_y.value) };
        const vector_b = { x: parseFloat(vector_b_x.value), y: parseFloat(vector_b_y.value) };
        
        DrawHermit(gl, point_a, point_b, vector_a, vector_b, DrawObject, positionLocation);
    };

    point_a_x.oninput = updateAndDraw;
    point_a_y.oninput = updateAndDraw;
    point_b_x.oninput = updateAndDraw;
    point_b_y.oninput = updateAndDraw;
    vector_a_x.oninput = updateAndDraw;
    vector_a_y.oninput = updateAndDraw;
    vector_b_x.oninput = updateAndDraw;
    vector_b_y.oninput = updateAndDraw;
};

export default ConfigHermitInputField;
