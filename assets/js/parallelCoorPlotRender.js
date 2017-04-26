function renderParallelCoorPlot(city, selected_neighborhood, filter_string, callback) {
    // console.log("HEREA")
    document.getElementById('example').innerHTML = ''
    $.post( 'http://ec2-52-38-115-147.us-west-2.compute.amazonaws.com:8000/parallelcoord/', { neighborhood: selected_neighborhood, city_name: city, filters: filter_string} ) .done(function( data ) {
      // console.log("RESPONSE")
      // console.log(data)
      // console.log(selected_neighborhood)
      // console.log(city)
      // console.log(filter_string)
      renderPCPlot(data, callback)
    }, "json");

}

function renderPCPlot(data, callback) {

  var parcoords = d3.parcoords()("#example")
      .alpha(0.4)
      .data(data)
      .hideAxis(["name"])
      .composite("darker")
      .render()
      .shadows()
      .mode("queue")
      .reorderable()
      .brushMode("1D-axes");  // enable brushing

  d3.select('#btnReset').on('click', function() {
    parcoords.brushReset();
    get_filter_ranges(data, () => {})
    onParallelCoordinatePlotBrush()
  })

  get_filter_ranges(data, callback)

  parcoords.on("brushend", function(data) {
    get_filter_ranges(data, () => {})
    onParallelCoordinatePlotBrush()
  })

}

function get_filter_ranges(data, callback) {
  let price_max = Math.max.apply(Math,data.map(function(o){return o['Price'];}))
  let price_min = Math.min.apply(Math,data.map(function(o){return o['Price'];}))
  let income_max = Math.max.apply(Math,data.map(function(o){return o['Estimated Monthly Income'];}))
  let income_min = Math.min.apply(Math,data.map(function(o){return o['Estimated Monthly Income'];}))
  let stay_max = Math.max.apply(Math,data.map(function(o){return o['Estimated Monthly Stay'];}))
  let stay_min = Math.min.apply(Math,data.map(function(o){return o['Estimated Monthly Stay'];}))

  if (data.length == 0) {
    price_max = 10000000
    price_min = 0
    income_max = 10000000
    income_min = 0
    stay_max = 10000000
    stay_min = 0
  }
  // console.log("HERE1")
   update_filter_ranges(price_max, price_min, income_max, income_min, stay_max, stay_min)
   callback()
}
