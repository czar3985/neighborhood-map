// Initial map data
var initialLocations = [];

// Model goes here
var Location = function (data) {
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
};

ko.applyBindings(new ViewModel());