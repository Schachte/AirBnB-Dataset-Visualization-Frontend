$(function() {


  function renderBarGraphPlot(selected_city, selected_neighborhood, filter_string) {
      document.getElementById('example').innerHTML = ''
      $.post( 'http://ec2-52-38-115-147.us-west-2.compute.amazonaws.com:8000/parallelcoord/', { city_name: "Brussels", metric: "price", filters: "has_pool", min_price: 12, max_price: 100, min_staycount: 1, max_staycount: 100, min_est_monthly_income: 1, max_est_monthly_income: 10000} ) .done(function( data ) {
        bar_data = data
        renderBarPlot(data)
      }, "json");
  }

  function renderBarPlot(data) {

  google.charts.load("current", {packages:["corechart", "bar"]});
  google.charts.setOnLoadCallback(drawChart);
  google.charts.setOnLoadCallback(drawChart2);
  google.charts.setOnLoadCallback(drawChart3);
  google.charts.setOnLoadCallback(drawChart4);
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ["Element", "Price", { role: "style" } ],
      ["$ With Amenities", data.priceWithCriteria, "#87D37C"],
      ["$ Without Amenities", data.priceWithoutCriteria, "#fa8666"],
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
                     { calc: "stringify",
                       sourceColumn: 1,
                       type: "string",
                       role: "annotation" },
                     2]);

    var options = {
      title: "Average Rental Price Based on Amenities In Brussels",
      bar: {groupWidth: "100%"},
      legend: { position: "none" },
      chartArea: {width: '80%', height: '40%'},
      height: 150,
      hAxis: {
        title: 'Price',
        minValue: 0
      },
      vAxis: {
        textPosition: 'none'
      }
    };
    var chart = new google.visualization.BarChart(document.getElementById("avg_price_chart"));
    chart.draw(view, options);
  }

  function drawChart2() {
    var data = google.visualization.arrayToDataTable([
      ["Element", "Stays", { role: "style" } ],
      ["Stays With Amenities", 8.94, "#87D37C"],
      ["Stays Without Amenities", 10.49, "#fa8666"],
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
                     { calc: "stringify",
                       sourceColumn: 1,
                       type: "string",
                       role: "annotation" },
                     2]);

    var options = {
      title: "Average Monthly Stays Based on Amenities In Brussels",
      bar: {groupWidth: "100%"},
      legend: { position: "none" },
      chartArea: {width: '80%', height: '40%'},
      height: 150,
      hAxis: {
        title: 'Stay Count',
        minValue: 0
      },
      vAxis: {
        textPosition: 'none'
      }
    };
    var chart2 = new google.visualization.BarChart(document.getElementById("avg_monthly_stays_chart"));
    chart2.draw(view, options);
  }

  function drawChart3() {
    var data = google.visualization.arrayToDataTable([
      ["Element", "Listings", { role: "style" } ],
      ["Listings With Amenities", 8.94, "#87D37C"],
      ["Listings Without Amenities", 10.49, "#fa8666"],
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
                     { calc: "stringify",
                       sourceColumn: 1,
                       type: "string",
                       role: "annotation" },
                     2]);

    var options = {
      title: "Number of Listings Based on Amenities In Brussels",
      bar: {groupWidth: "100%"},
      legend: { position: "none" },
      chartArea: {width: '80%', height: '40%'},
      height: 150,
      hAxis: {
        title: 'Number of Listings',
        minValue: 0
      },
      vAxis: {
        textPosition: 'none'
      }
    };
    var chart2 = new google.visualization.BarChart(document.getElementById("num_listings"));
    chart2.draw(view, options);
  }

  function drawChart4() {
    var data = google.visualization.arrayToDataTable([
      ["Element", "Estimated Monthly Income", { role: "style" } ],
      ["Monthly Income With Amenities", 8.94, "#87D37C"],
      ["Monthly Income Without Amenities", 10.49, "#fa8666"],
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
                     { calc: "stringify",
                       sourceColumn: 1,
                       type: "string",
                       role: "annotation" },
                     2]);

    var options = {
      title: "Estimated Monthly Income Based on Amenities In Brussels",
      bar: {groupWidth: "100%"},
      legend: { position: "none" },
      chartArea: {width: '80%', height: '40%'},
      height: 150,
      hAxis: {
        title: 'Estimated Monthly Income',
        minValue: 0
      },
      vAxis: {
        textPosition: 'none'
      }
    };
    var chart2 = new google.visualization.BarChart(document.getElementById("monthly_income_chart"));
    chart2.draw(view, options);
  }
}
})
