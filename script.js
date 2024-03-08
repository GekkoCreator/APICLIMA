document.addEventListener('DOMContentLoaded', function() {
    const countrySelect = document.getElementById('country');
    const weatherForm = document.getElementById('weatherForm');
    const weatherInfo = document.getElementById('weatherInfo');

    const countries = [
        "Argentina", "Australia", "Brasil", "Canadá", "China", "Colombia", "Francia", "Alemania", "India", "Italia", 
        "Japón", "México", "Rusia", "Sudáfrica", "España", "Reino Unido", "Estados Unidos", "Corea del Sur", 
        "Chile", "Egipto", "Grecia", "Indonesia", "Irán", "Ecuador", "Venezuela", "Malasia", "Nigeria", "Pakistán", 
        "Arabia Saudita"
      
    ];

    // Llenar la lista de países
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });

    function consultarAPI(ciudad, pais) {
        const apiKey = '5c03d1e0adcad79818ce7edba53b5396';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;

        fetch(url)
            .then(respuesta => respuesta.json())
            .then(datos => {
                mostrarClima(datos); 
            })
            .catch(error => {
                console.error('Error:', error);
                mostrarError('Hubo un error al consultar el clima');
            });
    }

    function mostrarClima(datos) {
        const temperaturaKelvin = datos.main.temp;
        const temperaturaCelsius = Math.round(temperaturaKelvin - 273.15);
        const descripcion = datos.weather[0].description;
        const icono = datos.weather[0].icon;
    
        weatherInfo.innerHTML = `
            <img src="http://openweathermap.org/img/w/${icono}.png" alt="${descripcion}" style="width: 100px;">
            <h2>${datos.name}, ${datos.sys.country}</h2>
            <p>${temperaturaCelsius}°C</p>
        `;
    }
    
