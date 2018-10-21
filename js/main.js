// Initial map data
var initialLocations = [
    { name: 'Chocolate Hills', location: { lat: 9.798818, lng: 124.167330 } },
    { name: 'Tarsier Conservation Area', location: { lat: 9.676270, lng: 124.091175 } },
    { name: 'Loboc Floating Restaurant', location: { lat: 9.635599, lng: 124.03034245 } },
    { name: 'Hinagdanan Cave', location: { lat: 9.625318, lng: 123.800927 } },
    { name: 'Panglao Beach', location: { lat: 9.626798, lng: 124.805699 } },
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

// Model goes here
var Location = function (data) {
    this.name = ko.observable(data.name);
};

// ViewModel goes here
var ViewModel = function () {
    var vm = this;  // Save in a variable for accessing when context changes

    // Populate the list of locations given the initial map data
    this.locationList = ko.observableArray([]);
    initialLocations.forEach(function (locationData) {
        vm.locationList.push(new Location(locationData));
    });

    // Remember which is the currently selected location
    // Initially, the first location in the list is selected
    this.currentLocation = ko.observable(this.locationList()[0]);

    // When a new location is selected from the list on the page,
    // reflect change in the currentLocation property
    this.changeSelected = function () {
        vm.currentLocation(this);
    };

    //Change the list element's css background color depending
    //on the location selected
    this.selectedLocationStatus = function (name) {
        if (name() === vm.currentLocation().name())
            return 'selected-location';
        else
            return 'not-selected-location';
    };
};

ko.applyBindings(new ViewModel());