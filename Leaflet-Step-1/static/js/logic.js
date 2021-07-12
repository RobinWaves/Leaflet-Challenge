// Create the map 
var myMap = L.map('map', {
  center: [39.8283 , -98.5795],
  zoom: 5
});

// Create the tile layer that will be the background of our map
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
}).addTo(myMap);

function getColor(depth) {
  switch (depth) {
    case depth <= 5:
    return "#97DC21";
  case depth > 5 && depth <= 10:
    return "#EB9605";
  case depth > 10:
    return "#FF4D4D";
  default:
    return "#000000";
  }
}

//--- This will be run when L.geoJSON creates the point layer from the GeoJSON data ---//
function createCircleMarker(feature, latlng){
  // Change the values of these options to change the symbol's appearance
  let options = {
    radius: feature.properties.mag * 5,
    fillColor: "lightgreen",
    color: "black",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  }
  return L.circleMarker(latlng, options);
}
//--------------------------------------------------//
// Store our API endpoint as queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
  // Use Leaflet's geoJSON method to turn the data into a feature layer
  L.geoJSON(data.features, {
    // Call the function createCircleMarker - creates symbol for this layer
    pointToLayer: createCircleMarker 
  }).addTo( myMap )
});