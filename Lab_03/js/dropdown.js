import DrawHeart from "./algorithm/heart.js";
import DrawBenzier from "./algorithm/benzier.js";
import DrawHermit from "./algorithm/hermit.js";
import DrawFlower from "./algorithm/flower.js";
import ConfigSlider from "./slider.js";
import ConfigTextArea from "./textarea.js";
import ConfigHermitInputField from "../hermit_input_field.js";
const ConfigDropdown = (gl, vertices, DrawObject = null, positionLocation) => 
{
    document.getElementById('myDropdown').addEventListener('change', function () 
    {
        const value = this.value;
        const links = {
            'heart': DrawHeart,
            'benzier': DrawBenzier,
            'hermit': DrawHermit,
            'flower': DrawFlower,
        };
        if(value == "heart")
        {
            const sliderControl = ConfigSlider(true, DrawHeart, gl, vertices, DrawObject);
            ConfigTextArea(false);
        }
        else if (value == "benzier")
        {
            ConfigSlider(false);
            const textarea = ConfigTextArea(true, DrawBenzier, gl, vertices, DrawObject ,positionLocation);
            // links[value](gl, textarea.getVertices());
        }
        else if(value == "hermit")
        {
            ConfigHermitInputField(gl, DrawHermit, DrawObject, positionLocation);
        }
    });
}

export default ConfigDropdown;