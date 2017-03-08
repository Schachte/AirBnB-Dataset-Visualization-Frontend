function rgb2hex(orig){
 var rgb = orig.replace(/\s/g,'').match(/^rgba?\((\d+),(\d+),(\d+)/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : orig;
}

$(function() {
  
  let amenities = [
    {"name": "Wireless Internet", "url": "wifi.png"},
    {"name": "Super Host", "url": "super.png"},
    {"name": "Allows Smoking", "url": "cig.png"},
    {"name": "Allows Pets", "url": "pets.png"},
    {"name": "Has Pool", "url": "pool.png"},
    {"name": "Free Parking", "url": "park.png"},
    {"name": "Washer & Dryer", "url": "washer.png"},
    {"name": "Cable TV", "url": "tv.png"},
  ]
  
  amenities.forEach((data) => {
    console.log(data);
    $('#amenity-grid').append('\
    <div class="amenity-box" style="background-image: url(assets/img/'+data.url+')">\
      <div class="amenity-grid-text">'+data.name+'</div>\
    </div>\
    ')
  })
  
  $(".amenity-box" ).click(function() {
  console.log('clicked');
  
  let currentColor = rgb2hex($(this).css("background-color"));
  
  
  if (currentColor == '#fa8666') {
    $(this).css("background-color", "#ED575D")
  } else {
    $(this).css("background-color", "#FFFFFF")
  }

});
})
