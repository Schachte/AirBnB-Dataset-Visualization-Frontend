$(function() {

  var m2 = [
    [6,2,8],
    [9,1,3],
    [0,7,6]
  ];

  var blue_to_brown = d3.scale.linear()
    .domain([9, 50])
    .range(["steelblue", "brown"])
    .interpolate(d3.interpolateLab);
  var color = function(d) { return blue_to_brown(d['economy (mpg)']); };
  var parcoords = d3.parcoords()("#example")
      // .color(color)
      .alpha(0.4)
      // .data(m2)
      // .hideAxis(["name"])
      // .composite("darker")
      // .render()
      // .shadows()
      // .reorderable()
      // .brushMode("1D-axes");  // enable brushing
  // load csv file and create the chart
  d3.csv('./cars.csv', function(data) {
    parcoords
      .data(data)
      .hideAxis(["name"])
      .composite("darker")
      .render()
      .shadows()
      .reorderable()
      .brushMode("1D-axes")  // enable brushing
      .alpha(0.4)
  });
  var sltBrushMode = d3.select('#sltBrushMode')
  sltBrushMode.selectAll('option')
    .data(parcoords.brushModes())
    .enter()
      .append('option')
      .text(function(d) { return d; });
  sltBrushMode.on('change', function() {
    parcoords.brushMode(this.value);
    switch(this.value) {
    case 'None':
      d3.select("#pStrums").style("visibility", "hidden");
      d3.select("#lblPredicate").style("visibility", "hidden");
      d3.select("#sltPredicate").style("visibility", "hidden");
      d3.select("#btnReset").style("visibility", "hidden");
      break;
    case '2D-strums':
      d3.select("#pStrums").style("visibility", "visible");
      break;
    default:
      d3.select("#pStrums").style("visibility", "hidden");
      d3.select("#lblPredicate").style("visibility", "visible");
      d3.select("#sltPredicate").style("visibility", "visible");
      d3.select("#btnReset").style("visibility", "visible");
      break;
    }
  });
  sltBrushMode.property('value', '1D-axes');
  d3.select('#btnReset').on('click', function() {parcoords.brushReset();})
  d3.select('#sltPredicate').on('change', function() {
    parcoords.brushPredicate(this.value);
  });
})
