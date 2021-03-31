const cityForm = document.querySelector('form')
const card = document.querySelector('.card')
const details = document.querySelector('.details')
const time = document.querySelector('img.time')
const icon = document.querySelector('.icon img')


const updateUI = (data) => {
    // destructuring properties

    const { cityDetails, weather } = data

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `
        // Update nigth and days and icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    let timeSource = null
    if (weather.IsDayTime) {
        timeSource = 'img/day.svg'
    } else {
        timeSource = 'img/night.svg'
    }
    time.setAttribute('src', timeSource);

    //remove the d-none if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none')
    }
}

//function to update city
const updateCity = async(city) => {
    const cityDetails = await getCity(city)
    const weather = await getWeather(cityDetails.Key)

    return {
        cityDetails,
        weather
    }
}

cityForm.addEventListener('submit', e => {
    // prevent the page to reload
    e.preventDefault();

    const city = cityForm.city.value.trim();
    // clear the form field
    cityForm.reset()
        // update the ui with the new city
    updateCity(city).then(data => {
        updateUI(data)
    }).catch(err => console.log(err))
})