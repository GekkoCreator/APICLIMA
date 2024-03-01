const resultado = document.querySelector('.container #resultado');
const formulario = document.querySelector('#weatherForm');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
    e.preventDefault();
   
    console.log('Buscando clima');

    const ciudad = document.querySelector('#city').value;
    const pais = document.querySelector('#country').value;

    consultarAPI(ciudad, pais);

    if (ciudad === '' || pais === ''){
        mostrarError('Ambos campos son obligatorios');
        return;
    }
}

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
    const temperaturaCelcius = (temperaturaKelvin - 273.15).toFixed(2);
    const descripcion = datos.weather[0].description;
    const ciudad = datos.name;

    resultado.innerHTML = `<p>El clima en ${ciudad} es ${temperaturaCelcius}°C. ${descripcion}</p>`;
    console.log(`El clima en ${ciudad} es ${temperaturaCelcius}°C. ${descripcion}`)
}

function mostrarError(mensaje) {
    resultado.innerHTML = `<p>${mensaje}</p>`;
    
}
