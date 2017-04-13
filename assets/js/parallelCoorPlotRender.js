function renderParallelCoorPlot(selected_city, selected_neighborhood, filter_string) {
    document.getElementById('example').innerHTML = ''
    $.post( 'http://ec2-52-38-115-147.us-west-2.compute.amazonaws.com:8000/parallelcoord/', { neighborhood: selected_neighborhood, city_name: selected_city, filters: filter_string} ) .done(function( data ) {
      coor_plot_data = data
      renderPCPlot(data)
    }, "json");
}

function renderPCPlot(data) {

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

  d3.select('#btnReset').on('click', function() {parcoords.brushReset();})

  parcoords.on("brushend", function(data) {
    let price_max = Math.max.apply(Math,data.map(function(o){return o['Price'];}))
    let price_min = Math.min.apply(Math,data.map(function(o){return o['Price'];}))
    let income_max = Math.max.apply(Math,data.map(function(o){return o['Estimated Monthly Income'];}))
    let income_min = Math.min.apply(Math,data.map(function(o){return o['Estimated Monthly Income'];}))
    let stay_max = Math.max.apply(Math,data.map(function(o){return o['Estimated Montly Stay'];}))
    let stay_min = Math.min.apply(Math,data.map(function(o){return o['Estimated Montly Stay'];}))

  })

}
