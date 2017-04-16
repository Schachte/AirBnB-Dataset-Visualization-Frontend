// $(function() {



  function renderBarPlot(data1) {


  google.charts.load("current", {packages:["corechart", "bar"]});
  google.charts.setOnLoadCallback(drawChart);
  google.charts.setOnLoadCallback(drawChart2);
  google.charts.setOnLoadCallback(drawChart3);
  google.charts.setOnLoadCallback(drawChart4);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ["Element", "Price", { role: "style" } ],
      ["$ With Amenities", parseFloat(data1[0].priceWithCriteria), "#795548"],
      ["$ Without Amenities", parseFloat(data1[0].priceWithoutCriteria), "#607D8B"],
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
                     { calc: "stringify",
                       sourceColumn: 1,
                       type: "string",
                       role: "annotation" },
                     2]);

    var options = {
      title: "Average Rental Price",
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
      ["Stays With Amenities", parseFloat(data1[0].rpmWithCriteria), "#795548"],
      ["Stays Without Amenities", parseFloat(data1[0].rpmWithoutCriteria), "#607D8B"],
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
                     { calc: "stringify",
                       sourceColumn: 1,
                       type: "string",
                       role: "annotation" },
                     2]);

    var options = {
      title: "Average Monthly Stays",
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
      ["Listings With Amenities", parseFloat(data1[0].listingWithCriteria), "#795548"],
      ["Listings Without Amenities", parseFloat(data1[0].listingWithoutCriteria), "#607D8B"],
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
                     { calc: "stringify",
                       sourceColumn: 1,
                       type: "string",
                       role: "annotation" },
                     2]);

    var options = {
      title: "Number of Listings",
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
      ["Monthly Income With Amenities", parseFloat(data1[0].emiWithCriteria), "#795548"],
      ["Monthly Income Without Amenities", parseFloat(data1[0].emiWithoutCriteria), "#607D8B"],
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
                     { calc: "stringify",
                       sourceColumn: 1,
                       type: "string",
                       role: "annotation" },
                     2]);

    var options = {
      title: "Estimated Monthly Income",
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
 // })
