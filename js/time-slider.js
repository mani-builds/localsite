
function initTimeSlider() {
    const sliderContainer = document.createElement('div');
    sliderContainer.id = 'time-slider-container';
    sliderContainer.style.padding = '10px';
    sliderContainer.innerHTML = `
        <label for="time-slider">Time:</label>
        <input type="range" id="time-slider" min="0" max="23" value="12" style="width: 200px;"/>
        <span id="time-slider-value">12:00 GMT</span>
        <br>
        <label for="date-slider">Date:</label>
        <input type="range" id="date-slider" min="1" max="365" value="1" style="width: 200px;"/>
        <span id="date-slider-value">Jan 1</span>
    `;

    const globalMapHolder = document.getElementById('globalMapHolder');
    if (globalMapHolder) {
        globalMapHolder.parentNode.insertBefore(sliderContainer, globalMapHolder);
    }

    const timeSlider = document.getElementById('time-slider');
    const timeValue = document.getElementById('time-slider-value');
    const dateSlider = document.getElementById('date-slider');
    const dateValue = document.getElementById('date-slider-value');

    function updateMap() {
        const date = new Date('2022-01-01');
        date.setDate(date.getDate() + parseInt(dateSlider.value) - 1);
        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');

        const hour = parseInt(timeSlider.value).toString().padStart(2, '0');
        const timeString = `${hour}:00 GMT`;
        timeValue.textContent = timeString;

        const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        dateValue.textContent = dateString;

        const latLonZoom = "-115.84,31.09,1037"; // default value from localsite.js
        const newUrl = `https://earth.nullschool.net/#${year}/${month}/${day}/${hour}00Z/wind/surface/level/orthographic=${latLonZoom}`;
        
        const iframe = document.getElementById('mainframe');
        if (iframe) {
            iframe.src = newUrl;
        }
        
        const mapText = document.getElementById('mapText');
        if(mapText){
             mapText.innerHTML = `NO<sub>2</sub> - ${month}/${day}/${year} ${hour}:00 GMT`;
        }
    }

    timeSlider.addEventListener('input', updateMap);
    dateSlider.addEventListener('input', updateMap);

    // Initial map load
    updateMap();
}
