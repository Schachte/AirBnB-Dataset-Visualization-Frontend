
$(function() {

  // var now = moment().endOf('day').toDate();
  // var yearAgo = moment().startOf('day').subtract(1, 'year').toDate();


  var price_data;



    // $.getJSON('http://ec2-52-38-115-147.us-west-2.compute.amazonaws.com:8000/summaries/daily/Toronto/University', function(data) {
    $.getJSON('http://localhost:8000/summaries/daily/Toronto/University', function(data) {


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
