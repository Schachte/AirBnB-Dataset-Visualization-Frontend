
/*
 * The only two functions that should be called from outside of this file are the following:
 *
 *  Use update_city(geojson) to zoom to a new city and draw its neighbourhoods
 *  Use update_map_criteria(criteria, binData) to color the regions and create the tooltips.
 */

var geojsonUrl = "http://ec2-52-38-115-147.us-west-2.compute.amazonaws.com:8000/geojson/";

mapboxAccessToken = 'pk.eyJ1IjoiYXN1c21rcyIsImEiOiJjajBvdG81MXAwMDllMnFtcnljaTNlbDYzIn0.rZRcpOORbLfDgSu8OCz6yA';
divergentColors = ['#b2182b','#ef8a62','#fddbc7','#f7f7f7','#d1e5f0','#67a9cf','#2166ac']

var mymap;
var info, geojsonLayer
var currentCityGeojson, neighbourhoodData, currentCriteria;
var legend, currentLegendData = new Array();

/*
 * Functions to create and update the map
 */

//TODO:  Modify this potentially to handle initialization
create_map();
function create_map() {
    mymap = L.map('mapid').setView([37.8, -96], 2);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
        id: 'mapbox.light'
    }).addTo(mymap);
}

function update_city(cityName) {

    var escapedCityName = cityName.replace(" ", "_");
    $.get(geojsonUrl + escapedCityName, function(response) {
        update_geojson(response);

    }).error(function() {
        "Could not get geojson data from the webservice.";
    });

}
//Remove the old layer and draw the new city and zoom to it.
function update_geojson(geojsonData) {
    currentCityGeojson = JSON.parse(geojsonData);
    if(!mymap)
        create_map(geojsonData);

    if(geojsonLayer)
        mymap.removeLayer(geojsonLayer);

    geojsonLayer = L.geoJson(currentCityGeojson, {
        style: style,
        onEachFeature: addMouseListeners
    }).addTo(mymap);
    mymap.fitBounds(geojsonLayer.getBounds());
}

//Remove the map and redraw it with the new data that we're given.
function update_map_criteria(criteria, newNeighbourhoodData) {
    currentCriteria = criteria;
    if( newNeighbourhoodData ) {
        mymap.removeLayer(geojsonLayer);
        neighbourhoodData = modifyData( newNeighbourhoodData.Data );
        geojsonLayer = L.geoJson(currentCityGeojson, {
            style : style,
            onEachFeature: addMouseListeners
        }).addTo(mymap);
        info.addTo(mymap);

        update_legend(newNeighbourhoodData.Summary);
    }
}

//Set the new legend data, remove the legend, and readd it which will put the new values in the legend.
function update_legend(legendData) {
    currentLegendData = new Array();
    //Create an array that holds the bin intervals
    minValue = parseInt(legendData.min);
    interval = parseInt(legendData.interval);
    for(var i = 0; i <= 7; i++)
        currentLegendData.push(minValue + interval * i);

    //Remove the legend then add it back with the new values
    mymap.removeControl(legend);
    legend.addTo(mymap);
}


//Sets the neighbourhood data to be keyed by the region name for quicker look ups.
function modifyData( newNeighbourhoodData ) {
    dataDict = [];

    for(var i = 0; i < newNeighbourhoodData.length; i++ ) {
        var regionData = newNeighbourhoodData[i];
        dataDict[regionData.neighborhood] = regionData;
    }
    return dataDict;
}


//Called for each neighbourhood to define its style
//TODO: If no bin exists, default to 4 (not being handled right now)
function style(feature) {
    var binNumber = 4;

    //Get the bin number for the region we are looking at
    if( neighbourhoodData ){
        var neighbourhoodName = feature.properties.neighbourhood;
        var dataFromService = neighbourhoodData[neighbourhoodName];
        if( dataFromService )
            binNumber = dataFromService.bin;
    }

    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        fillOpacity: 0.9,
        fillColor: getColor(binNumber)
    };

}

//Return the divergent color.
function getColor(binNumber) {

    if( !binNumber ) return divergentColors[4];

    if( binNumber < 1 || binNumber > 7) {
        console.log("Invalid value passed to getColor, value between 1 and 7 expected.");
        return divergentColors[4];
    }
    //Because the bins are 1 indexed and the array is 0 indexed.
    return divergentColors[binNumber - 1];
}


/*
 * Set up mouse event listeners
 */

info = L.control();
//Add and Update the tooltip in the corner
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (region) {

    var html = "";


    if( region ) {
        //If it's a valid region that we could find in the geojson
        if( region.neighbourhood && neighbourhoodData[region.neighbourhood] ) {
            regionName = region.neighbourhood;
            regionData = neighbourhoodData[regionName];
            withCrit = regionData.averageWithCriteria;
            withoutCrit = regionData.averageWithoutCriteria;

            html = '<h4>' + regionName + '</h4>' +
            '<b>Average ' + currentCriteria + ' with the chosen criteria:</b> ' + withCrit + '<br/>' +
            '<b>Average ' + currentCriteria + ' without the chosen criteria:</b> ' + withoutCrit + '<br/>';
        //If we couldn't find it in the geojson then there were no listings in that region..... or special chars messed up the finding
        } else {
            html = 'No listings found in this neighbourhood.';
        }
    //Nothing has been selected
    } else {
        html = 'Please hover over a region to see details.';
    }

    this._div.innerHTML = html;
};

info.addTo(mymap);

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojsonLayer.resetStyle(e.target);
    info.update();
}

//Notify everyone else that a region was clicked
function notifyOfRegionClick(e) {
    console.log(e);
    regionName = e.target.feature.properties.neighbourhood;
    didClickChoroplethMap(regionName);
}

function addMouseListeners(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: notifyOfRegionClick
    });
}



/*
 *  Add the legend
 */
legend = L.control({position:'bottomright'});


legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend')

    if( currentLegendData.length == 8 ) {

        div.innerHTML += 'Percent difference above average<br>'

        //Loop through each color in the bin
        for (var i = currentLegendData.length - 2; i >= 0 ; i--) {
            div.innerHTML += '<i style="background:' + getColor(i + 1) + '"></i> ' + currentLegendData[i] + ' to ' + currentLegendData[i + 1] + '<br>';
        }

    }
    return div;

}
legend.addTo(mymap);


var austinDefaultData = {
  "Data": [
    {
      "percentDifference": null,
      "neighborhood": "78701",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "328.99",
      "totalAverage": "328.99"
    },
    {
      "percentDifference": null,
      "neighborhood": "78702",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "311.18",
      "totalAverage": "311.18"
    },
    {
      "percentDifference": null,
      "neighborhood": "78703",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "491.32",
      "totalAverage": "491.32"
    },
    {
      "bin": 1,
      "neighborhood": "78704",
      "percentDifference": 76.06,
      "averageWithCriteria": "700.00",
      "averageWithoutCriteria": "314.05",
      "totalAverage": "314.29"
    },
    {
      "percentDifference": null,
      "neighborhood": "78705",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "186.16",
      "totalAverage": "186.16"
    },
    {
      "percentDifference": null,
      "neighborhood": "78717",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "66.00",
      "totalAverage": "66.00"
    },
    {
      "percentDifference": null,
      "neighborhood": "78721",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "245.09",
      "totalAverage": "245.09"
    },
    {
      "percentDifference": null,
      "neighborhood": "78722",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "181.87",
      "totalAverage": "181.87"
    },
    {
      "percentDifference": null,
      "neighborhood": "78723",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "256.94",
      "totalAverage": "256.94"
    },
    {
      "percentDifference": null,
      "neighborhood": "78724",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "340.16",
      "totalAverage": "340.16"
    },
    {
      "percentDifference": null,
      "neighborhood": "78725",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "273.53",
      "totalAverage": "273.53"
    },
    {
      "percentDifference": null,
      "neighborhood": "78726",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "140.29",
      "totalAverage": "140.29"
    },
    {
      "percentDifference": null,
      "neighborhood": "78727",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "107.03",
      "totalAverage": "107.03"
    },
    {
      "percentDifference": null,
      "neighborhood": "78728",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "56.75",
      "totalAverage": "56.75"
    },
    {
      "percentDifference": null,
      "neighborhood": "78729",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "73.62",
      "totalAverage": "73.62"
    },
    {
      "percentDifference": null,
      "neighborhood": "78730",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "515.10",
      "totalAverage": "515.10"
    },
    {
      "percentDifference": null,
      "neighborhood": "78731",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "343.51",
      "totalAverage": "343.51"
    },
    {
      "percentDifference": null,
      "neighborhood": "78732",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "584.92",
      "totalAverage": "584.92"
    },
    {
      "percentDifference": null,
      "neighborhood": "78733",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "248.69",
      "totalAverage": "248.69"
    },
    {
      "percentDifference": null,
      "neighborhood": "78734",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "459.52",
      "totalAverage": "459.52"
    },
    {
      "percentDifference": null,
      "neighborhood": "78735",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "595.38",
      "totalAverage": "595.38"
    },
    {
      "percentDifference": null,
      "neighborhood": "78736",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "257.60",
      "totalAverage": "257.60"
    },
    {
      "percentDifference": null,
      "neighborhood": "78737",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "506.38",
      "totalAverage": "506.38"
    },
    {
      "percentDifference": null,
      "neighborhood": "78738",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "194.80",
      "totalAverage": "194.80"
    },
    {
      "percentDifference": null,
      "neighborhood": "78739",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "129.57",
      "totalAverage": "129.57"
    },
    {
      "percentDifference": null,
      "neighborhood": "78741",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "202.44",
      "totalAverage": "202.44"
    },
    {
      "percentDifference": null,
      "neighborhood": "78744",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "162.41",
      "totalAverage": "162.41"
    },
    {
      "percentDifference": null,
      "neighborhood": "78745",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "189.94",
      "totalAverage": "189.94"
    },
    {
      "percentDifference": null,
      "neighborhood": "78746",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "466.64",
      "totalAverage": "466.64"
    },
    {
      "percentDifference": null,
      "neighborhood": "78747",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "93.17",
      "totalAverage": "93.17"
    },
    {
      "percentDifference": null,
      "neighborhood": "78748",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "137.09",
      "totalAverage": "137.09"
    },
    {
      "percentDifference": null,
      "neighborhood": "78749",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "252.19",
      "totalAverage": "252.19"
    },
    {
      "percentDifference": null,
      "neighborhood": "78750",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "247.36",
      "totalAverage": "247.36"
    },
    {
      "percentDifference": null,
      "neighborhood": "78751",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "193.76",
      "totalAverage": "193.76"
    },
    {
      "percentDifference": null,
      "neighborhood": "78752",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "146.83",
      "totalAverage": "146.83"
    },
    {
      "percentDifference": null,
      "neighborhood": "78753",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "165.31",
      "totalAverage": "165.31"
    },
    {
      "percentDifference": null,
      "neighborhood": "78754",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "102.33",
      "totalAverage": "102.33"
    },
    {
      "percentDifference": null,
      "neighborhood": "78756",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "216.33",
      "totalAverage": "216.33"
    },
    {
      "percentDifference": null,
      "neighborhood": "78757",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "197.24",
      "totalAverage": "197.24"
    },
    {
      "percentDifference": null,
      "neighborhood": "78758",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "138.29",
      "totalAverage": "138.29"
    },
    {
      "percentDifference": null,
      "neighborhood": "78759",
      "averageWithCriteria": null,
      "averageWithoutCriteria": "116.89",
      "totalAverage": "116.89"
    }
  ],
  "Summary": {
    "interval": "1.00",
    "min": "76.06"
  }
}
