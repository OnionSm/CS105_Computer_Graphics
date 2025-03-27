import DrawHeart from "./algorithm/heart.js";
import DrawBenzier from "./algorithm/benzier.js";
import DrawHermit from "./algorithm/hermit.js";
import DrawFlower from "./algorithm/flower.js";
import ConfigSlider from "./slider.js";
const ConfigDropdown = (gl, vertices, DrawObject = null) => 
{
    document.getElementById('myDropdown').addEventListener('change', function () {
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
            
        }
        else
        {
            ConfigSlider(false);
            links[value](gl, vertices);
        }
    });
}

export default ConfigDropdown;