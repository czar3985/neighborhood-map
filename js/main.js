//
// Location Data
//
var Location = function (data) {
    this.name = ko.observable(data.name);
    this.visible = ko.observable(data.visible);
    this.id = ko.observable(data.id);
};

//
// ViewModel
//
var ViewModel = function () {
    var vm = this;  // Save in a variable for accessing when context changes

    //
    //   INITIALIZATIONS
    //

    // Populate the list of locations given the initial map data
    this.locationList = ko.observableArray([]);
    initialLocations.forEach(function (locationData) {
        vm.locationList.push(new Location(locationData));
    });

    // Remember which is the currently selected location
    // Initially, the first location in the list is selected
    this.currentLocation = ko.observable(currentMarker);

    // Initially, list of locations (sidebar) is shown
    this.showList = ko.observable(true);

    //
    //   EVENTS
    //

    // New location is selected from the list
    this.changeSelected = function () {
        // Reflect change in the currentLocation property
        vm.currentLocation(this.id());

        // Trigger a click to the corresponding map marker
        if (isMapLoaded)
            new google.maps.event.trigger(markers[this.id()], 'click');
    };

    // The map is clicked
    this.checkMapSelection = function () {
        // Update the observable of the selected location
        vm.currentLocation(currentMarker);
    };

    // Toggle showList when hamburger icon is clicked
    this.toggleListDisplay = function () {
        this.showList(!this.showList());
    };

    // Filter the list and map markers
    this.filter = function () {
        var searchKeyword = $('.search-field').val().toLowerCase();
        var isFirstFound = false;

        // Close infoWindow in case it is open for a hidden marker
        if (infoWindow)
            infoWindow.close();

        // Set the visible property to be used for list items' styles
        // Set the marker's visibility in the map
        this.locationList().forEach(function (locationData) {
            if (locationData.name().toLowerCase().includes(searchKeyword)) {
                locationData.visible(true);
                if (markers[locationData.id()])
                    markers[locationData.id()].setVisible(true);

                if (!isFirstFound) {
                    isFirstFound = true;

                    // Set first location in filtered list as selected item
                    // Trigger marker click
                    vm.currentLocation(locationData.id());

                    if (isMapLoaded)
                        new google.maps.event.trigger(markers[locationData.id()],
                            'click');
                }
            }
            else {
                locationData.visible(false);
                if (markers[locationData.id()])
                    markers[locationData.id()].setVisible(false);
            }
        });
    };

    //
    //   CSS CHANGES
    //

    this.listItemStyle = function (name, visible) {
        var cssStyle = '';

        //Change the list element's css background color depending
        //on the location selected
        if (name() === vm.locationList()[vm.currentLocation()].name())
            cssStyle += 'selected-location ';
        else
            cssStyle += 'not-selected-location ';

        // Change visibility status depending on filter results
        if (visible() === true)
            cssStyle += 'item-visible';
        else
            cssStyle += 'item-not-visible';

        return cssStyle;
    };

    // Change the sidebar's css width depending on showList value
    this.sidebarDisplayStatus = ko.pureComputed(function () {
        return this.showList() ? 'sidebar-showing' : 'sidebar-not-showing';
    }, this);

    // Change the map's position depending on showList value
    this.mapDisplayStatus = ko.pureComputed(function () {
        return this.showList() ? 'map-small-display' : 'map-big-display';
    }, this);
};

ko.applyBindings(new ViewModel());