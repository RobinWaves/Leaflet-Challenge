# Leaflet-Challenge - Visualizing Data with Leaflet

![USGS-Logo](Leaflet-Step-1/images/1-Logo.png)

The United States Geological Survey is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. 

Using a new set of tools, this challenge seeks to visualze their data allowing them to better educate the public and other organizations (and hopefully secure more funding..) on issues facing our planet.  We visualize earthquake and tectonic data specifically focusing on a meaningful way to display it.

### Level 1: Basic Visualization

![BasicMap](Leaflet-Step-1/images/Basic.png)

The first task is visualizing an earthquake data set.  YOu can find the dataset here: [USGS GeoJSON Past 7 Days](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson).  Data is updated every five minutes.
* Leaflet-Step-1
   * images - images for readme, html and basic screenshot
   * static
      * css
         * style.css
      * js
         * config.js - contains public mapbox key
         * logic.js - main file to run for analysis
   * index.html - main file to run for analysis

2. **Import & Visualize the Data**

   Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.

   * Your data markers should reflect the magnitude of the earthquake by their size and and depth of the earth quake by color. Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.

   * **HINT** the depth of the earth can be found as the third coordinate for each earthquake.

   * Include popups that provide additional information about the earthquake when a marker is clicked.

   * Create a legend that will provide context for your map data.

   * Your visualization should look something like the map above.

- - -

### Level 2: More Data (Optional)

![5-Advanced](Leaflet-Step-1/Images/5-Advanced.png)

The USGS wants you to plot a second data set on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in a second data set and visualize it along side your original set of data. Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.

In this step we are going to..

* Plot a second data set on our map.

* Add a number of base maps to choose from as well as separate out our two different data sets into overlays that can be turned on and off independently.

* Add layer controls to our map.

* Leaflet-Step-2
   * images - image for html, and bonus screenshots (3)
   * static
      * css
         * style.css
      * js
         * config.js - contains public mapbox key
         * logic.js - main file to run for analysis
   * index.html - main file to run for analysis

- - -

### Assessment

Your final product will be assessed on the following metrics:

* Completion of assigned tasks

* Visual appearance

* Professionalism

* Ensure your repository has regular commits (i.e. 20+ commits) and a thorough README.md file

**Good luck!**

## Rubric

[Unit 17 Rubric - Leaflet Homework - Visualizing Data with Leaflet](https://docs.google.com/document/d/1h1iH67V7UKOitS6K3nRrnOYbx-3KwEDC6ZWzpzDKxLc/edit?usp=sharing)

- - -

© 2021 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.
