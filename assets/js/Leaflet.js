
/*
 * The only two functions that should be called from outside of this file are the following:
 * 
 *  Use update_city(geojson) to zoom to a new city and draw its neighbourhoods
 *  Use update_map_criteria(criteria, binData) to color the regions and create the tooltips.
 */ 



mapboxAccessToken = 'pk.eyJ1IjoiYXN1c21rcyIsImEiOiJjajBvdG81MXAwMDllMnFtcnljaTNlbDYzIn0.rZRcpOORbLfDgSu8OCz6yA';
divergentColors = ['#b2182b','#ef8a62','#fddbc7','#f7f7f7','#d1e5f0','#67a9cf','#2166ac']

var mymap;
var info, geojsonLayer
var currentCityGeojson, neighbourhoodData, currentCriteria;

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

//Remove the old layer and draw the new city and zoom to it.
function update_city(geojsonData) {
    currentCityGeojson = geojsonData;

    if(!mymap)
        create_map(geojsonData);

    if(geojsonLayer)
        mymap.removeLayer(geojsonLayer);

    geojsonLayer = L.geoJson(currentCityGeojson, {
        style: style,
        onEachFeature: addMouseListeners
    }).addTo(mymap);    mymap.fitBounds(geojsonLayer.getBounds());
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
        var regionData = newNeighbourhoodData[i];
        dataDict[regionData.neighborhood] = regionData;
    }
    return dataDict;
}


//Called for each neighbourhood to define its style
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

function addMouseListeners(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    });
}




