$(function() {
// console.log('ran');
$("#header").html('\
  <div id="selection_div_header">\
    <span class = "header_show" style="float: left">Show me statistics within </span>\
      <div class="city body cf">\
        <select class="city-selector">\
          <option class="city-select">Amsterdam</option>\
          <option class="city-select">Antwerp</option>\
          <option class="city-select">Asheville</option>\
          <option class="city-select">Athens</option>\
          <option class="city-select">Austin</option>\
          <option class="city-select">Barcelona</option>\
          <option class="city-select">Berlin</option>\
          <option class="city-select">Boston</option>\
          <option class="city-select">Brussels</option>\
          <option class="city-select">Chicago</option>\
          <option class="city-select">Copenhagen</option>\
          <option class="city-select">Denver</option>\
          <option class="city-select">Dublin</option>\
          <option class="city-select">Edinburgh</option>\
          <option class="city-select">Geneva</option>\
          <option class="city-select">Hong Kong</option>\
          <option class="city-select">London</option>\
          <option class="city-select">Los Angeles</option>\
          <option class="city-select">Madrid</option>\
          <option class="city-select">Mallorca</option>\
          <option class="city-select">Manchester</option>\
          <option class="city-select">Melbourne</option>\
          <option class="city-select">Montreal</option>\
          <option class="city-select">Nashville</option>\
          <option class="city-select">New Orleans</option>\
          <option class="city-select">New York City</option>\
          <option class="city-select">Northern Rivers</option>\
          <option class="city-select">Oakland</option>\
          <option class="city-select">Paris</option>\
          <option class="city-select">Portland</option>\
          <option class="city-select">Quebec City</option>\
          <option class="city-select">San Diego</option>\
          <option class="city-select">San Francisco</option>\
          <option class="city-select">Santa Cruz County</option>\
          <option class="city-select">Seattle</option>\
          <option class="city-select">Sydney</option>\
          <option class="city-select">Toronto</option>\
          <option class="city-select">Trentino</option>\
          <option class="city-select">Vancouver</option>\
          <option class="city-select">Venice</option>\
          <option class="city-select">Victoria</option>\
          <option class="city-select">Vienna</option>\
          <option class="city-select">Washington D.C</option>\
        </select>\
        <div class="custom-dropdown cf">\
          <input class="picked-city" type="text" placeholder="Select A City..">\
            <span class="btn city-button-disable-toggler"><i class="icon icon-caret-down"></i></span>\
            <ul class="custom-list2"></ul>\
          </div>\
        </div>\
      </div>\
      '
)
})
