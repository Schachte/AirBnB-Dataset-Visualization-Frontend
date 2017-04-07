$(function() {
    let coor_plot_data;

    // $( window ).resize(function() {
    //   // var plot = d3.selectAll('#example')
    //   // plot.remove()
    //   d3.selectAll('#example').html("") //won't work in safari
		// 	renderPCPlot(coor_plot_data)
		// });

    let selected_city = 'Toronto'
    let filter_string='has_internet,has_pool'
    $.post( 'http://ec2-52-38-115-147.us-west-2.compute.amazonaws.com:8000/parallelcoord/', { neighborhood: null, city_name: selected_city, filters: filter_string} ) .done(function( data ) {
      coor_plot_data = data
      renderPCPlot(data)
    }, "json");
})

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
