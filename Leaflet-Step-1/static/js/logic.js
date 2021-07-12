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
//--- This will be run when L.geoJSON creates the point layer from the GeoJSON data ---//
function createCircleMarker(feature, latlng){
  // Change the values of these options to change the symbol's appearance
  let options = {
    radius: feature.properties.mag * 5,
    fillColor: "lightgreen", // ***** GO BACK TO THIS //
    color: "black",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  }
  return L.circleMarker(latlng, options);
}
//--- Called to select circle color ---//
function getColor(depth) {
  switch (depth) {
    case depth <= 10:
      return "#97DC21";
    case depth > 10 && depth <= 30:
      return "#EB9605";
    case depth > 30 && depth <= 50:
      return "#FF4D4D";
    case depth > 50 && depth <= 70:
      return "#97DC21";
    case depth > 70 && depth <= 90:
      return "#EB9605";
    case depth > 90:
      return "#FF4D4D";
    default:
      return "#000000";
  }
}


// Store our API endpoint as queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
  console.log(data.features);
  
  // Use Leaflet's geoJSON method to turn the data into a feature layer
  L.geoJSON(data.features, {
    // Call the function createCircleMarker - creates symbol for this layer
    pointToLayer: createCircleMarker,
    // Inline function to create pop up layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h4>" + feature.properties.place + "</h4><hr><p>" 
                      + new Date(feature.properties.time) + "</p>") } // ***** GO BACK TO THIS //
  }).addTo(myMap) 
  
});
