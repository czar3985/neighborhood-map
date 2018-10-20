var map;

//Initializes the map
function initMap() {
     //Creates a new map object.
     //Bohol, Philippines is at lat: 9.877085, long: 124.133168
     //Set center to Bilar, Bohol lat: 9.718134, lng: 124.088440 to better
     //view the tourist spots found mostly at the bottom part of Bohol
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 9.718134, lng: 124.088440 },
        zoom: 11
    });
}