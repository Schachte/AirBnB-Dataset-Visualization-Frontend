function post_amenities(city, filters, metric) {
  $.post( "http://ec2-52-38-115-147.us-west-2.compute.amazonaws.com:8000/amenities/", { "city_name": ""+city+"", "metric": ""+metric+"", "filters": filters }, function( data ) {
    update_city(city);
     update_map_criteria(metric, data);
     console.log(data);
  });
}
