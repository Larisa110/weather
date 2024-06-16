const apiKey = '39cea7da27297f36fc94608030d0ae70';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim(); // Удаляем лишние пробелы из введенного текста
    if (location) {
        fetchWeather(location);
    } else {
        console.error('Введите название города');
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Не удалось получить данные о погоде');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.main && data.main.temp !== undefined && data.weather && data.weather.length > 0 && data.weather[0].description) {
                locationElement.textContent = data.name;
                temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
                descriptionElement.textContent = data.weather[0].description;
            } else {
                throw new Error('Данные о погоде недоступны или некорректны');
            }
        })
        .catch(error => {
            console.error('Ошибка получения данных о погоде:', error.message);
            locationElement.textContent = 'Ошибка!';
            temperatureElement.textContent = '';
            descriptionElement.textContent = '';
        });
}
