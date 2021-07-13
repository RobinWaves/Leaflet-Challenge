//--- Creates the circle layer from the GeoJSON data ---//
function createCircleMarker(feature, latlng){
  // Change the values of these options to change the symbol's appearance
  let options = {
    radius: getRadius(feature.properties.mag),
    fillColor: getColor(feature.geometry.coordinates[2]),
    color: "black",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  }
  return L.circleMarker(latlng, options);
}

// Gives each earthquake a different radius based on it's magnitude
function getRadius(magnitude) {
  return Math.sqrt(magnitude) * 8;
}

//--- Called to select circle color ---//
function getColor(depth) {
  switch (true) {
    case (depth <= 10):
      return "#39FF14";
    case (depth >= 10 && depth <= 30):
      return "#DEFF00";
    case (depth > 30 && depth <= 50):
      return "#FCAE1E";
    case (depth > 50 && depth <= 70):
      return "#FF6700";
    case (depth > 70 && depth <= 90):
      return "#F89880";
    case (depth > 90):
      return "#FE019A";
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
    // Function to create pop up layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place + "</h3><p>" 
                      + new Date(feature.properties.time) + "</p><p> Magnitude: " 
                      + feature.properties.mag + "</p><p> Depth: " 
                      + feature.geometry.coordinates[2] + "</p>")
    }
  })

// Create base layers - grayscale, satellite, and outdoors
var grayscalemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});
var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "satellite-v9",
  accessToken: API_KEY
});
// var outdoorsmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: " ",
//   accessToken: API_KEY
// });
// Create a base map object
var baseMaps = {
  "Satellite": satellitemap,
  "Grayscale": grayscalemap  
  //"Outdoors": ourdoorsmap
};

// Define map object
var myMap = L.map('map', {
  center: [39.8283 , -98.5795],
  zoom: 5,
  layers: [satellitemap, ]
});

//Add layer control to the map
L.control.layers(baseMaps {
  collapsed: false
}).addTo(myMap);

  // Set up the legend
  var legend = L.control({ position: "bottomright" });

  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");

    var limits = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"];
    var colors = ["#39FF14", "#DEFF00", "#FCAE1E", "#FF6700", "#F89880", "#FE019A", "#000000"];
    labels = [];

    limits.forEach((limit, i) => {    
      labels.push("<li><div class=\"color-box\" style=\"background-color: " 
                  + colors[i] + "\"></div><span>" + limits[i] +"</span></li>");
    });
    div.innerHTML += "<ul>" + labels.join("") + "</ul>";

      return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);
});
