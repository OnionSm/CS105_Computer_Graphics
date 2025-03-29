import DrawHeart from "./algorithm/heart.js";
import DrawBenzier from "./algorithm/benzier.js";
import DrawHermit from "./algorithm/hermit.js";
import DrawFlower from "./algorithm/flower.js";
import ConfigSlider from "./slider.js";
import ConfigTextArea from "./textarea.js";
import ConfigHermitInputField from "../hermit_input_field.js";
const ConfigDropdown = (gl, DrawObject = null) => 
{
    const slider_container = document.getElementById("slider_container");
    const text_area = document.getElementById("text_area");
    const hermit_input_container = document.getElementById("hermit_input_container");

    document.getElementById('myDropdown').addEventListener('change', function () 
    {
        const value = this.value;
        console.log(value);
        if(value == "heart")
        {
            slider_container.style.display = "flex";
            text_area.style.display = "none";
            hermit_input_container.style.display = "none";
            ConfigSlider(true, gl, DrawObject, DrawHeart);
        }
        else if (value == "benzier")
        {
            slider_container.style.display = "none";
            text_area.style.display = "flex";
            hermit_input_container.style.display = "none";
            ConfigTextArea(gl, DrawObject, DrawBenzier);
        }
        else if(value == "hermit")
        {
            slider_container.style.display = "none";
            text_area.style.display = "none";
            hermit_input_container.style.display = "flex";
            ConfigHermitInputField(gl, DrawObject,  DrawHermit);
        }
        else if(value == "flower")
        {
            slider_container.style.display = "flex";
            text_area.style.display = "none";
            hermit_input_container.style.display = "none";
            ConfigSlider(true, gl, DrawObject, DrawFlower);
        }
    });
}

export default ConfigDropdown;