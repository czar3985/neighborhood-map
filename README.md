# Neighborhood Map

The neighborhood map project is a single page application 
featuring noteworthy spots marked on the map. Third-party APIs (Google Maps, Wikipedia
articles and Foursquare restaurant search) are used as data sources. A location filtering function and a list view
are included to provide users several ways of browsing the locations.

![Neighborhood Map App Screenshot](img\neighborhood_map_1346.jpg)


## Developer Notes

The implementation uses:
- MVVM design pattern of Knockout.js framework
- Asynchronous API requests to:
  - Google Maps
  - Wikipedia
  - Foursquare

## Usage

**1. Enter your Google Maps API key**

Refer to the guide in https://developers.google.com/maps/documentation/javascript/get-api-key
to get an API key. You may need to indicate some billing information
before you can proceed with acquiring an API key to be used for Google Maps API requests.

In `index.html`, replace `YOUR_KEY` in the code below with your key:
```html
<script async defer
        src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&v=3&callback=initMap">
</script>
```

**2. Replace Foursquare API Client ID and Client Secret**

Refer to the guide in https://developer.foursquare.com/docs/api
to get the required authentication parameters.

In `maps.js`, replace `CLIENT_ID` and `CLIENT_SECRET` in the function 
`searchFoursquare()` with your client id and secret:

```javascript
url: 'https://api.foursquare.com/v2/venues/search?' +
    'query=restaurant&limit=5&v=20180323&' +
    'client_id= CLIENT_ID' +
    'client_secret=CLIENT_SECRET' +
    'll=' + marker.position.lat() + ',' + marker.position.lng(),
```

## Attributions

The map style titled 'Unsaturated Browns' is from [Snazzy Maps](https://snazzymaps.com/).
