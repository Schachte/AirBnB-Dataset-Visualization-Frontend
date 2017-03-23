
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

  $.getJSON('http://ec2-35-167-247-179.us-west-2.compute.amazonaws.com:8000/summaries/daily/Vienna/', function(data) {
    //data is the JSON string

    price_data = data.map((obj) => {
      obj.date = new Date(obj.date)
      return obj
    })

    // console.log("Su")
    // console.log(price_data)
    var i;
    var total_avg_price=0;
    console.log("Su")
    for (i=0; i< price_data.length;i++) {
      total_avg_price = total_avg_price + parseFloat(price_data[i].average_price)
      // console.log(total_avg_price)
    }

    avg_tot_avg = total_avg_price/i;

    console.log("Suhasini prints date")
    console.log(price_data[0].date)

    console.log("average price of entire city is -")
    console.log(avg_tot_avg)

    var heatmap = calendarHeatmap()
                    .data(price_data)
                    .selector('.heatmap')
                    .tooltipEnabled(true)
                    // .colorRange(['#D8E6E7', '#218380'])
                    .colorRange(["#ff0000", "#ffffff", "#0000ff"])
                    // .colorRange(["#ef8a62", "#f7f7f7", "#67a9cf"])
                    .startDate(price_data[0].date)
                    .onClick(function (data) {
                      console.log('data', data);
                    });
    heatmap();  // render the chart
});



})
