var map;

//Initializes the map
function initMap() {
    // Style Name: Unsaturated Browns
    // From: https://snazzymaps.com/style/70/unsaturated-browns
    var styles = [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "hue": "#ff4400"
                },
                {
                    "saturation": -68
                },
                {
                    "lightness": -4
                },
                {
                    "gamma": 0.72
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon"
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry",
            "stylers": [
                {
                    "hue": "#0077ff"
                },
                {
                    "gamma": 3.1
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                {
                    "hue": "#00ccff"
                },
                {
                    "gamma": 0.44
                },
                {
                    "saturation": -33
                }
            ]
        },
        {
            "featureType": "poi.park",
            "stylers": [
                {
                    "hue": "#44ff00"
                },
                {
                    "saturation": -23
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "hue": "#007fff"
                },
                {
                    "gamma": 0.77
                },
                {
                    "saturation": 65
                },
                {
                    "lightness": 99
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "gamma": 0.11
                },
                {
                    "weight": 5.6
                },
                {
                    "saturation": 99
                },
                {
                    "hue": "#0091ff"
                },
                {
                    "lightness": -86
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
                {
                    "lightness": -48
                },
                {
                    "hue": "#ff5e00"
                },
                {
                    "gamma": 1.2
                },
                {
                    "saturation": -23
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "saturation": -64
                },
                {
                    "hue": "#ff9100"
                },
                {
                    "lightness": 16
                },
                {
                    "gamma": 0.47
                },
                {
                    "weight": 2.7
                }
            ]
        }
    ];

     //Creates a new map object.
     //Bohol, Philippines is at lat: 9.877085, lng: 124.133168
     //Set center to Bilar, Bohol lat: 9.718134, lng: 124.088440 to better
     //view the tourist spots found mostly at the bottom part of Bohol
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 9.718134, lng: 124.088440 },
        styles: styles,
        zoom: 10
    });

    var locationList = [
        { name: 'Chocolate Hills', location: { lat: 9.798818, lng: 124.167330 } },
        { name: 'Tarsier Conservation Area', location: { lat: 9.676270, lng: 124.091175 } },
        { name: 'Loboc Floating Restaurant', location: { lat: 9.635599, lng: 124.03034245 } },
        { name: 'Hinagdanan Cave', location: { lat: 9.625318, lng: 123.800927 } },
        { name: 'Panglao Island Beaches', location: { lat: 9.555232, lng: 123.803524 } },
        { name: 'Balicasag Island', location: { lat: 9.516485, lng: 123.683309 } },
        { name: 'Baclayon Church', location: { lat: 9.622828, lng: 123.912447 } },
        { name: 'Python Sanctuary', location: { lat: 9.614213, lng: 123.939295 } },
        { name: 'Sipatan Twin Hanging Bridge', location: { lat: 9.675264, lng: 124.047947 } },
        { name: 'Dauis Church', location: { lat: 9.625919, lng: 123.864937 } },
        { name: 'Bohol Bee Farm', location: { lat: 9.575847, lng: 123.826945 } },
        { name: 'Blood Compact Shrine', location: { lat: 9.627513, lng: 123.879135 } },
        { name: 'Butterflies Conservation Center', location: { lat: 9.697643, lng: 124.100070 } },
        { name: 'Virgin Island', location: { lat: 9.558371, lng: 123.722485 } },
        { name: 'Shell Museum', location: { lat: 9.580495, lng: 123.748747 } },
        { name: 'Bilar Man-Made Forest', location: { lat: 9.664285, lng: 124.078474 } },
        { name: 'Loboc Ecotourism Adventure Park', location: { lat: 9.656049, lng: 124.023793 } }
    ];

    // One infoWindow for all markers
    var infoWindow = new google.maps.InfoWindow();

    // Create an array of markers from the list of locations
    var markers = [];
    for (var i = 0; i < locationList.length; i++) {
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
        }, i * 200, locationList[i]);
    }
}