function renderHeatMap(city, neighborhood) {

  var price_data;

    $.getJSON('http://ec2-52-38-115-147.us-west-2.compute.amazonaws.com:8000/summaries/daily/'+ city +'/' + neighborhood, function(data) {

      price_data = data.dataPoints.map((obj) => {
        obj.date = new Date(obj.date)
        return obj
      })

      var heatmap = calendarHeatmap()
                      .data(data)
                      .selector('.heatmap')
                      .tooltipEnabled(true)
                      .colorRange(["#ff0000", "#ffffff", "#0000ff"])
                      .startDate(price_data[0].date)
                      .onClick(function (data) {
                      });
      heatmap();  // render the chart
    });

}
