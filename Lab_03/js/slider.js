const ConfigSlider = (isEnabled = true, gl, DrawObject = null, algorithm = null) => {

  const slider = document.getElementById('slider');
  const sliderValue = document.getElementById('sliderValue');
  let currentValue = 50; // Giá trị mặc định

  if (slider && sliderValue) 
  {
      // Cấu hình ban đầu
      slider.min = 1;
      slider.max = 500;
      slider.value = currentValue;
      sliderValue.textContent = currentValue;
      slider.disabled = !isEnabled;

      // Lắng nghe sự kiện thay đổi giá trị
      const handleSliderChange = () => 
      {
          currentValue = slider.value;
          console.log(currentValue);
          sliderValue.textContent = currentValue;
          algorithm(gl, DrawObject, currentValue);
      };

      if (isEnabled) 
      {
        slider.addEventListener('input', handleSliderChange);
      } 
      else 
      {
        slider.removeEventListener('input', handleSliderChange);
      }

      // Trả về một object chứa hàm getValue để lấy giá trị hiện tại
      return {
          
          getValue: () => currentValue,
          setValue: (newValue) => {
              if (isEnabled && newValue >= slider.min && newValue <= slider.max) {
                  currentValue = newValue;
                  slider.value = newValue;
                  sliderValue.textContent = newValue;
              }
          }
      };
  } 
  else {
      console.warn('Slider hoặc Slider Value không tìm thấy!');
      return {
          getValue: () => currentValue,
          setValue: () => {}
      };
  }
};

export default ConfigSlider;