'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
let map, mapEvent;
if (navigator.geolocation) {
  // getCurrentPosition takes two functions, first one when location can be retreived succesfully
  // and another when its not and error will be displayed
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
      const { latitude } = position.coords;
      const { longitude } = position.coords;

      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
      const coords = [latitude, longitude];

      //Code added from Leaflet
      // While working with multiple scripts, if we have global variable in some other script(before), we can use it in another script(after) as well

      //map(id) -> id of the div element where you want Map to be embedded
      //setView(Array of coordinate, zoomValue)
      map = L.map('map').setView(coords, 10);

      // Theme can be changed using tileLayer link

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      //map.on is the function built in leaflet to handle click events
      map.on('click', function (mapE) {
        mapEvent = mapE;
        form.classList.remove('hidden');
        inputDuration.focus();
      });
    },
    function () {
      alert('Could not get you position');
    }
  );
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  // Clear input fields

  inputDistance.value =
    inputCadence.value =
    inputDuration.value =
    inputElevation.value =
      '';

  // Display marker

  console.log(mapEvent);
  //mapEvent contains the latitude and longitude where we click on the map in latlng object
  const { lat, lng } = mapEvent.latlng;

  // L.marker sets the blue marker on the map and bindPopup will add the message
  L.marker([lat, lng])
    .addTo(map)

    // .bindPopup('Workout')
    // L.popup contains various parameters that we can specify
    .bindPopup(
      L.popup({
        maxwidth: 250,
        minwidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    //setPopupContent sets the text for the popup
    .setPopupContent('Workout')
    .openPopup();
});

// Changing Cadence to Elevation when Type of workout is changed
inputType.addEventListener('change',function(){
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
})