$(function() {
    let selected_city = 'Toronto'
    let filter_string='has_internet,has_pool'
    $.post( 'http://ec2-52-38-115-147.us-west-2.compute.amazonaws.com:8000/parallelcoord/', { neighborhood: null, city_name: selected_city, filters: filter_string} ) .done(function( data ) {
      renderPCPlot(data)
    }, "json");
})

function renderPCPlot(data) {
  var parcoords = d3.parcoords()("#example")
      .alpha(0.4)
      .width(1200)
      .data(data)
      .hideAxis(["name"])
      .composite("darker")
      .render()
      .shadows()
      .mode("queue")
      .reorderable()
      .brushMode("1D-axes");  // enable brushing

  d3.select('#btnReset').on('click', function() {parcoords.brushReset();})

}
