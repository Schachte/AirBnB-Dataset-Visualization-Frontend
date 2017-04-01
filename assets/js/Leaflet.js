


mapboxAccessToken = 'pk.eyJ1IjoiYXN1c21rcyIsImEiOiJjajBvdG81MXAwMDllMnFtcnljaTNlbDYzIn0.rZRcpOORbLfDgSu8OCz6yA';
divergentColors = ['#d73027','#fc8d59','#fee090','#ffffbf','#e0f3f8','#91bfdb','#4575b4']; //Red to blue

var mymap;
var info, geojsonLayer
var currentCityGeojson, neighbourhoodData, currentCriteria;

/*
 * Functions to create and update the map
 */

//TODO:  Modify this potentially to handle initialization
//create_map();
function create_map() {
    mymap = L.map('mapid');
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
        id: 'mapbox.light'
    }).addTo(mymap);
    geojsonLayer = L.geoJson(currentCityGeojson, {
        style: style,
        onEachFeature: addMouseListeners
    }).addTo(mymap);
}

//Remove the old layer and draw the new city and zoom to it.
function update_city(geojsonData) {
    currentCityGeojson = geojsonData;

    if(!mymap)
        create_map(geojsonData);

    mymap.removeLayer(geojsonLayer);
    currentCityGeojson = geojsonData;
    geojsonLayer = L.geoJson(currentCityGeojson).addTo(mymap);
    mymap.fitBounds(geojsonLayer.getBounds());
}

//Remove the map and redraw it with the new data that we're given.
function update_map_criteria(criteria, newNeighbourhoodData) {
    currentCriteria = criteria;
    if( newNeighbourhoodData ) {
        mymap.removeLayer(geojsonLayer);
        neighbourhoodData = modifyData( newNeighbourhoodData );
        geojsonLayer = L.geoJson(currentCityGeojson, {
            style : style,
            onEachFeature: addMouseListeners
        }).addTo(mymap);
        info.addTo(mymap);
    }
}


//Sets the neighbourhood data to be keyed by the region name for quicker look ups.
function modifyData( newNeighbourhoodData ) {
    dataDict = [];

    for(var i = 0; i < newNeighbourhoodData.length; i++ ) {
        regionData = newNeighbourhoodData[i];
        dataDict[regionData.neighborhood] = regionData;
    }
    return dataDict;
}


//Called for each neighbourhood to define its style
function style(feature) {
    var binNumber = 1;

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

    if( region && region.neighbourhood && neighbourhoodData[region.neighbourhood] ) {
        regionName = region.neighbourhood;
        regionData = neighbourhoodData[regionName];
        withCrit = regionData.averageWithCriteria;
        withoutCrit = regionData.averageWithoutCriteria;

        html = '<h4>' + regionName + '</h4>' +
        '<b>Average ' + currentCriteria + ' with the chosen criteria:</b> ' + withCrit + '<br/>' +
        '<b>Average ' + currentCriteria + ' without the chosen criteria:</b> ' + withoutCrit + '<br/>';
    } else {
        html = 'Unable to find the data for the neighbourhood.';
        console.log(region);
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

function addMouseListeners(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    });
}




