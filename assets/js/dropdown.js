//Globals
var selectedQuery = ''; //Allows for tracking user-selection to adjust scrollify movements

//Hider header onLoad
$(function(){
  $('#header').hide()
})

// Build the custom list for cities
$(function(){
  var $select = $('.city-selector');
  var $options = $select.children('option');
  var $options = $(".city-select");
  var $picked = $('.picked-city');
  for(var i = 0; i < 43; i++) {
    $('.custom-list2').append('<li>'+$options.eq(i).val()+'</li>');
  }
  
  $('.city-button-disable-toggler').click(function(){
    $.scrollify.disable();
    $(this).next('.custom-list2').toggleClass('show');
  });
  
  $('.custom-list2 li').on('click', function(){
    $picked.val($(this).text());
    $.scrollify.enable();
    $('.custom-list2').removeClass('show');
  });
});

// Build the custom list for queries
$(function(){
  var $select = $('.query-selector');
  var $options = $select.children('option');
  var $options = $(".query-select");
  var $picked = $('.picked-query');
  for(var i = 0; i < 4; i++) {
    $('.custom-list').append('<li>'+$options.eq(i).val()+'</li>');
  }
  
  $('.btn').click(function(){
    $(this).next('.custom-list').toggleClass('show');
  });
  
  $('.custom-list li').on('click', function(){
    $picked.val($(this).text());
    selectedQuery = $(this).index();
    $('.custom-list').removeClass('show');
  });
});

//Auto move sections based on user-search
$(function() {
  $('.button-search').click(function() {
    
    switch(parseInt(selectedQuery)+1) {
      case 1:
        $.scrollify.move(parseInt(selectedQuery));
        break;
        
      case 2:
        $.scrollify.move(parseInt(selectedQuery));
        break;
        
      case 3:
        $.scrollify.move(parseInt(selectedQuery));
        break;
          
      case 4:
        $.scrollify.move(parseInt(selectedQuery));
        break;

      default:
        alert('Not implemeneted');
        break;
    }
  })
})

//Handles logic for displaying header on correct section
$(function() {
  $(window).on('scroll', function() {
    var hash = window.location.hash.substr(1);
    switch(hash) {
      case "1":
        $('#header').hide()
        break;
        
      case "2":
        $('#header').show()
        break;
        
      case "3": 
        $('#header').show()
        break;
        
      default:
        $('#header').show()
        break;
    }
 })
})
