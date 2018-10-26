var map;            // Google map of the area to be explored
var markers = [];   // Array of noted spots in the map
var infoWindow;     // Display data for the selected marker

//
// Initializes the map
//
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
            // Use IIFE to pass the correct arguments to the listeners
            // added in the loop
            marker.addListener('click', (function (markerObject) {
                return function () {
                    var marker = markerObject.marker;
                    var index = markerObject.id;

                    // Open the info window
                    setUpInfoWindow(marker);

                    // Animate the marker when clicked
                    if (marker.getAnimation() !== null) {
                        marker.setAnimation(null);
                    } else {
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                        window.setTimeout(function () {
                            marker.setAnimation(null);
                        }, 750);
                    }

                    // For changing the selected location in the sidebar
                    currentMarker = index;
                };
            })({ marker, id:data.id }));
        }, i * 200, initialLocations[i]);
    }

    // First marker is clicked initially after all markers are dropped
    window.setTimeout(function () {
        new google.maps.event.trigger(markers[0], 'click');
    }, initialLocations.length * 200);
}

//
//  When marker is clicked, set up and display the marker's infoWindow
//
function setUpInfoWindow(marker) {
    if (infoWindow.marker !== marker) {

        // Send the API requests
        searchWikipedia(marker);
        searchFoursquare(marker);

        // Bind the info window to the marker that was clicked
        infoWindow.marker = marker;

        // While waiting for the asynchronous API requests to be completed,
        // open infoWindow with placeholder text
        infoWindow.setContent('<b>' + marker.title + '</b><br /><br />' +
            '<b>Relevant Articles:</b><br /><i>(Powered by Wikipedia)</i>' +
            '<br/><i>Retrieving...</i><br /><br />' +
            '<b>Restaurants Nearby:</b><br /><i>(Powered by Foursquare)</i>' +
            '<br /><i>Retrieving...</i>');
        infoWindow.open(map, marker);

        // Remove associated marker if the infoWindow is closed
        infoWindow.addListener('closeclick', function () {
            infoWindow.setMarker = null;
        });
    }
}

// Defaults for API request responses
var wikiLinks = '<i>None found at this time</i>';
var restaurantsNearby = '<i>None found at this time</i>';

//
// Update Info Window
//
function updateInfoWindow(marker) {
    // Indicate the new infoWindow content when API requests are completed
    infoWindow.setContent('<b>' + marker.title + '</b><br /><br />' +
        '<b>Relevant Articles:</b><br /><i>(Powered by Wikipedia)</i><br />' +
        '<ul>' + wikiLinks + '</ul>' +
        '<b>Restaurants Nearby:</b><br /><i>(Powered by Foursquare)</i>' +
        '<ul>' + restaurantsNearby + '</ul>');

    // Reopen the infoWindow to allow map panning
    // so that all of the infoWindows contents can be seen
    infoWindow.open(map, marker);
}

//
// Wikipedia article search function
//
function searchWikipedia(marker) {
    var links = '';

    // Stop search when nothing found after the specified time
    var timeout = setTimeout(function () {
        wikiLinks = '<i>None found at this time</i>';
        updateInfoWindow();
    }, 5000);

    // Asynchronous call to wikipedia
    $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?' +
            'format=json&action=opensearch&search=' +
            marker.title,
        dataType: 'jsonp',
        success: function (response) {
            articles = response[1];

            // Build the article list for the HTML
            $.each(articles, function (index, article) {
                links += '<li>' + '<a href="https://en.wikipedia.org/wiki/' +
                    article + '">' + article + '</a>' + '</li>';
            });

            clearTimeout(timeout);

            // No response/data returned from the API request
            if (links === '')
                links = '<i>None found at this time</i>';

            // Update info window with the list of articles
            wikiLinks = links;
            updateInfoWindow(marker);
        }
    });
}

//
// Foursquare restaurant search function
//
function searchFoursquare(marker) {
    var restaurants = '';

    // Stop search when nothing found after the specified time
    var timeout = setTimeout(function () {
        restaurantsNearby = '<i>None found at this time</i>';
        updateInfoWindow();
    }, 5000);

    // Asynchronous call to foursquare
    $.ajax({
        url: 'https://api.foursquare.com/v2/venues/search?' +
            'query=restaurant&limit=5&v=20180323&' +
            'client_id= CLIENT_ID&' +
            'client_secret=CLIENT_SECRET&' +
            'll=' + marker.position.lat() + ',' + marker.position.lng(),
        dataType: 'json',
        success: function (response) {
            // Build the restaurant list for the HTML
            venues = response['response']['venues'];
            $.each(venues, function (index, venue) {
                restaurants += '<li>' + venue.name + '</li>';
            });
            clearTimeout(timeout);

            // No response/data returned from the API request
            if (restaurants === '')
                restaurants = '<i>None found at this time</i>';

            // Update info window with the list of restaurants
            restaurantsNearby = restaurants;
            updateInfoWindow(marker);
        }
    });
}