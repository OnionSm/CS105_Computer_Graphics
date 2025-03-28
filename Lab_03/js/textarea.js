const ConfigTextArea = (state = false, DrawBenzier = null, gl, vertices, DrawObject ,positionLocation) => {
    const text_area = document.getElementById("text_area");

    if (!text_area) {
        console.error("Element with id 'text_area' not found");
        return;
    }
    var vertices = [];
    // Enable the textarea if required
    text_area.disabled = !state;

    // Add an event listener for input change
    text_area.addEventListener('input', (event) => {
        const inputText = event.target.value.trim();
        const regex = /^\d+(,\d+)*$/;
        const result = regex.test(inputText);
        
        if (result) 
        {
            console.log("Chuỗi phù hợp");
            vertices = inputText.split(',').map(Number);
        } 
        else 
        {
            console.log("Chuỗi không phù hợp");
            vertices = [];
        }
        DrawBenzier(gl, vertices, DrawObject, positionLocation);
    });
    
    return {
        getVertices: () => vertices
    };
    
};

export default ConfigTextArea;