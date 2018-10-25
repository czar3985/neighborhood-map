var map;
var markers = [];
var infoWindow; // One infoWindow for all markers

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

    // Create an infoWindow object
    infoWindow = new google.maps.InfoWindow();

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

            // Event listener when marker is clicked
            marker.addListener('click', (function (markerCopy) {
                return function () {
                    // Open the info window
                    setUpInfoWindow(markerCopy);

                    // Animate the marker when clicked
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

    // First marker is clicked initially after all markers are dropped on the map
    window.setTimeout(function () {
        new google.maps.event.trigger(markers[0], 'click');
    }, initialLocations.length * 200);
}

function setUpInfoWindow(marker) {
    if (infoWindow.marker !== marker) {

        searchWikipedia(marker);
        searchFoursquare(marker);

        infoWindow.marker = marker;
        infoWindow.setContent('<b>' + marker.title + '</b><br /><br />' +
            'Relevant Wikipedia Articles:<br/><i>Retrieving...</i>' +
            'Restaurants Nearby:<br /><i>Retrieving...</i>');
        infoWindow.open(map, marker);

        // Remove associated marker if the infoWindow is closed
        infoWindow.addListener('closeclick', function () {
            infoWindow.setMarker = null;
        });
    }
}

var wikiLinks = '<i>None found at this time</i>';
var restaurantsNearby = '<i>None found at this time</i>';

// Update Info Window
function updateInfoWindow(marker) {
    infoWindow.setContent('<b>' + marker.title + '</b><br /><br />' +
        'Relevant Wikipedia Articles:' +
        '<ul>' + wikiLinks + '</ul>' +
        'Restaurants Nearby:' +
        '<ul>' + restaurantsNearby + '</ul>');
    infoWindow.open(map, marker);
}

function searchWikipedia(marker) {
    var links = '';

    var timeout = setTimeout(function () {
        wikiLinks = '<i>None found at this time</i>';
        updateInfoWindow();
    }, 5000);

    $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=' +
            marker.title,
        dataType: "jsonp",
        success: function (response) {
            articles = response[1];
            $.each(articles, function (index, article) {
                links += "<li>" + "<a href='https://en.wikipedia.org/wiki/"
                    + article + "'>" + article + "</a>" + "</li>";
            });
            clearTimeout(timeout);
            if (links === '')
                links = '<i>None found at this time</i>';

            wikiLinks = links;
            updateInfoWindow(marker);
        }
    });
}

function searchFoursquare(marker) {
    var restaurants = '';

    var timeout = setTimeout(function () {
        restaurantsNearby = '<i>None found at this time</i>';
        updateInfoWindow();
    }, 5000);

    $.ajax({
        url: 'https://api.foursquare.com/v2/venues/search?' +
            'query=restaurant&limit=5&v=20180323&' +
            'client_id= BG0BB2V1COPP0FG1BJFGIPT14KAGKTYE4FPKFHIBRKVLDIST&' +
            'client_secret=PJI0EARPCYSZ32NP5RGYZ3BWKO3R5LGB2CW30BV2QJMKVXIJ&' +
            'll=' + marker.position.lat() + ',' + marker.position.lng(),
        dataType: "json",
        success: function (response) {
            venues = response['response']['venues'];
            $.each(venues, function (index, venue) {
                restaurants += "<li>" + venue.name + "</li>";
            });
            clearTimeout(timeout);
            if (restaurants === '')
                restaurants = '<i>None found at this time</i>';

            restaurantsNearby = restaurants;
            updateInfoWindow(marker);
        }
    });
}