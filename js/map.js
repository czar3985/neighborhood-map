var map;

//Initializes the map
function initMap() {
     //Creates a new map object.
     //Bohol, Philippines is at lat: 9.877085, lng: 124.133168
     //Set center to Bilar, Bohol lat: 9.718134, lng: 124.088440 to better
     //view the tourist spots found mostly at the bottom part of Bohol
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 9.718134, lng: 124.088440 },
        zoom: 11
    });

    //First marker location
    var chocolate_hills = { lat: 9.831103, lng: 124.139719 };

    //Make 1st marker appear
    var marker = new google.maps.Marker({
        position: chocolate_hills,
        map: map,
        title: 'Chocolate Hills'
    });

    // First infoWindow
    var infoWindow = new google.maps.InfoWindow({
        content: marker.title
    });

    // Event listener the opens the infoWindow when marker is clicked
    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    });
}