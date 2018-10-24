var map;
var markers = [];

//Initializes the map
function initMap() {
     //Creates a new map object.
     //Bohol, Philippines is at lat: 9.877085, lng: 124.133168
     //Set center to Bilar, Bohol lat: 9.718134, lng: 124.088440 to better
     //view the tourist spots found mostly at the bottom part of Bohol
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 9.718134, lng: 124.088440 },
        styles: styles,
        zoom: 10
    });

    // One infoWindow for all markers
    var infoWindow = new google.maps.InfoWindow();

    // Create the array of markers from the list of locations
    for (var i = 0; i < initialLocations.length; i++) {
        var marker;

        // Push the marker per location in the markers array
        // Animate by dropping one by one
        window.setTimeout(function (data) {
            marker = new google.maps.Marker({
                map: map,
                title: data.name,
                position: data.location,
                animation: google.maps.Animation.DROP
            });
            markers.push(marker);

            // Event listener the opens the infoWindow when marker is clicked
            marker.addListener('click', (function (markerCopy) {
                return function () {
                    infoWindow.setContent(markerCopy.title);
                    infoWindow.open(map, markerCopy);
                };
            })(marker));

            // Event listener that animates the marker when clicked
            marker.addListener('click', (function (markerCopy) {
                return function () {
                    if (markerCopy.getAnimation() !== null) {
                        markerCopy.setAnimation(null);
                    } else {
                        markerCopy.setAnimation(google.maps.Animation.BOUNCE);
                        window.setTimeout(function () { markerCopy.setAnimation(null); }, 750);
                    }
                };
            })(marker));
        }, i * 200, initialLocations[i]);
    }
}