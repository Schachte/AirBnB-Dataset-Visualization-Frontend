
$(function() {

  // var now = moment().endOf('day').toDate();
  // var yearAgo = moment().startOf('day').subtract(1, 'year').toDate();

  console.log("start heat-map")

  var price_data;

    $.getJSON('http:localhost:8000/summaries/daily/Toronto/All', function(data) {
      console.log("heatmap data")
      // console.log(data.dataPoints)
      console.log("average of average")
      // console.log(data.avgPrice)

    price_data = data.dataPoints.map((obj) => {
      obj.date = new Date(obj.date)
      // obj.date = new Date(Date.parse(obj.date)).toUTCString()
      return obj
    })

    console.log("Su data fetched and date converted")



    console.log("epoch date is")
    // console.log(new Date(2017,06,27).getTime() / 1000)

    var heatmap = calendarHeatmap()
                    .data(data)
                    .selector('.heatmap')
                    .tooltipEnabled(true)
                    // .colorRange(['#D8E6E7', '#218380'])
                    .colorRange(["#ff0000", "#ffffff", "#0000ff"])
                    // .colorRange(["#ef8a62", "#f7f7f7", "#67a9cf"])
                    .startDate(price_data[0].date)
                    .onClick(function (data) {
                      //console.log('data', data);
                    });
    heatmap();  // render the chart
});



})
