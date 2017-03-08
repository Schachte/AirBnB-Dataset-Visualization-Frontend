
$(function() {

  var now = moment().endOf('day').toDate();
  var yearAgo = moment().startOf('day').subtract(1, 'year').toDate();
  var chartData = d3.time.days(yearAgo, now).map(function (dateElement) {
    return {
      date: dateElement,
      count: (dateElement.getDay() !== 0 && dateElement.getDay() !== 6) ? Math.floor(Math.random() * 60) : Math.floor(Math.random() * 10)
    };
  });

  var heatmap = calendarHeatmap()
                  .data(chartData)
                  .selector('.heatmap')
                  .tooltipEnabled(true)
                  .colorRange(['#f4f7f7', '#79a8a9'])
                  .onClick(function (data) {
                    console.log('data', data);
                  });
  heatmap();  // render the chart

})
