// Model
var Location = function (data) {
    this.name = ko.observable(data.name);
    this.visible = ko.observable(data.visible);
};

// ViewModel
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
    this.currentLocation = ko.observable(this.locationList()[0]);

    // Initially, list of locations is shown
    this.showList = ko.observable(true);

    //
    //   EVENTS
    //

    // When a new location is selected from the list on the page,
    // reflect change in the currentLocation property
    this.changeSelected = function () {
        vm.currentLocation(this);
    };

    // Toggle showList when hamburger icon is clicked
    this.toggleListDisplay = function () {
        this.showList(!this.showList());
    };

    this.filterList = function () {
        var searchKeyword = $('.search-field').val().toLowerCase();

        this.locationList().forEach(function (locationData) {
            if (locationData.name().toLowerCase().includes(searchKeyword))
                locationData.visible(true);
            else
                locationData.visible(false);
        });
    };

    //
    //   CSS CHANGES
    //

    this.listItemStyle = function (name, visible) {
        var cssStyle = '';

        //Change the list element's css background color depending
        //on the location selected
        if (name() === vm.currentLocation().name())
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

    // Change the sidebar's css width depending on showList value
    this.mapDisplayStatus = ko.pureComputed(function () {
        return this.showList() ? 'map-small-display' : 'map-big-display';
    }, this);
};

ko.applyBindings(new ViewModel());