$(function() {
    let selected_city = 'Toronto'
    let filter_string='has_internet,has_pool'
    $.post( 'http://ec2-52-38-115-147.us-west-2.compute.amazonaws.com:8000/parallelcoord/', { neighborhood: null, city_name: selected_city, filters: filter_string} ) .done(function( data ) {
      renderPCPlot(data)
    }, "json");
})

function renderPCPlot(data) {
  var m2 = [
    {
      'price': 6,
      'stay count': 2,
      'est monthly income': 8
    },
    {
      'price': 9,
      'stay count': 1,
      'est monthly income': 3
    },
    {
      'price': 0,
      'stay count': 7,
      'est monthly income': 6
    }
  ];
  
  function resize() {
    width = parseInt(d3.select("#example").style("width")) - margin.left - margin.right,
    height = parseInt(d3.select("#example").style("height")) - margin.top - margin.bottom;

    x.rangePoints([0, width], 1);

    d3.values(y).forEach(function(scale) {
      scale.range([height, 0])
    })

    svg.selectAll(".line").attr("d", path);

    g = svg.selectAll(".dimension")
      .attr("transform", function(d) {
        return "translate(" + x(d) + ")";
      });

    g.selectAll(".axis").call(axis.scale(y[d]))
}

  var blue_to_brown = d3.scale.linear()
    .domain([9, 50])
    .range(["steelblue", "brown"])
    .interpolate(d3.interpolateLab);
  var color = function(d) { return blue_to_brown(d['economy (mpg)']); };
  var parcoords = d3.parcoords()("#example")
      .color(color)
      .alpha(0.4)
      .width(900)
      .data(data)
      .hideAxis(["name"])
      .composite("darker")
      .render()
      .shadows()
      .mode("queue")
      .reorderable()
      .brushMode("1D-axes");  // enable brushing
  // load csv file and create the chart
  // d3.csv('./cars.csv', function(data) {
  //   parcoords
  //     .data(data)
  //     .hideAxis(["name"])
  //     .composite("darker")
  //     .render()
  //     .shadows()
  //     .reorderable()
  //     .brushMode("1D-axes")  // enable brushing
  //     .alpha(0.4)
  // });
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
}
