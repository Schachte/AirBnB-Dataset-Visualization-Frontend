
$(function() {

  var now = moment().endOf('day').toDate();
  var yearAgo = moment().startOf('day').subtract(1, 'year').toDate();
  var chartData = d3.time.days(yearAgo, now).map(function (dateElement) {
    return {
      date: dateElement,
      count: (dateElement.getDay() !== 0 && dateElement.getDay() !== 6) ? Math.floor(Math.random() * 60) : Math.floor(Math.random() * 10)
    };
  });

  console.log(chartData)

  var price_data;

  $.getJSON('http://ec2-35-167-247-179.us-west-2.compute.amazonaws.com:8000/summaries/daily/Toronto/', function(data) {
    //data is the JSON string

    price_data = data.map((obj) => {
      obj.date = new Date(obj.date)
      return obj
    })

    console.log(price_data)
    var heatmap = calendarHeatmap()
                    .data(price_data)
                    .selector('.heatmap')
                    .tooltipEnabled(true)
                    .colorRange(['#f4f7f7', '#79a8a9'])
                    .startDate(price_data[0].date)
                    .onClick(function (data) {
                      console.log('data', data);
                    });
    heatmap();  // render the chart
});



})
