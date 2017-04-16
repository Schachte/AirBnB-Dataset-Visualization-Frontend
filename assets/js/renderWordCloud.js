function renderWorldCloud(city) {
/*
  frequency_list = [{"size": 30, "text": "describedpictured"}, {"size": 8, "text": "stain"}, {"size": 2, "text": "place"}, {"size": 9, "text": "perfect"}, {"size": 12, "text": "day"}, {"size": 1, "text": "exceptionally"}, {"size": 3, "text": "trentes"}, {"size": 23, "text": "two"}, {"size": 12, "text": "blanket"}, {"size": 2, "text": "brussels"}, {"size": 1, "text": "everything"}, {"size": 16, "text": "one"}, {"size": 9, "text": "clean"}, {"size": 10, "text": "aside"}, {"size": 3, "text": "stay"}];

    //find the max and min of the frequency_list:
  //  memostuff = _.reduce(frequency_list,function(memo,frequency_list){return memo});
    maxstuff = _.max(frequency_list, function(object){return object.size})
    maxFreq = maxstuff.size
    minstuff = _.min(frequency_list, function(object){return object.size})
    minFreq = minstuff.size

    var color = d3.scale.linear()
                  .domain([minFreq,maxFreq])
                  .range(['#084594', '#eff3ff'])
    d3.layout.cloud().size([800,300])
              .words(frequency_list)
              .rotate(0)
              .fontSize(function(d){return d.size;})
              .on("end",draw)
              .start()

    function draw(words) {
      d3.select("#wordCloud").append("svg")
        .attr("width",850)
        .attr("height",350)
        .attr("class","wordcloud")
        .append("g")
        .attr("transform","translate(320,200)")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size",function(d){return (d.size)+"px";})
        .style("fill",function(d,i){return color(i);})
        .attr("transform",function(d){
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });


    }
    */

  frequency_list = [{"size": 30, "text": "subway"}, {"size": 60, "text": "clean"}, {"size": 45, "text": "metro"}, {"size": 31, "text": "nice"}, {"size": 54, "text": "apartment"}, {"size": 57, "text": "friendly"}, {"size": 30, "text": "kind"}, {"size": 23, "text": "central"}, {"size": 12, "text": "walking"}, {"size": 21, "text": "comfortable"}, {"size": 10, "text": "enjoyed"}, {"size": 16, "text": "perfect"}, {"size": 45, "text": "restaurants"}, {"size": 34, "text": "walking distance"}, {"size": 30, "text": "hiking"},{"size": 24, "text": "hideaway"},{"size": 14, "text": "dirty"},{"size": 10, "text": "unclean"},{"size": 11, "text": "rude"},{"size": 26, "text": "spacious"},{"size": 12, "text": "small"},{"size": 34, "text": "food"},{"size": 27, "text": "nightlife"}];

  /*
   frequency_list = [{"text": "de", "size": 34693}, {"text": "et", "size": 32763}, {"text": "apartment", "size": 28209}, {"text": "tra", "size": 24472}, {"text": "place", "size": 22186}, {"text": "la", "size": 21790}, {"text": "great", "size": 21174}, {"text": "stay", "size": 20453}, {"text": "us", "size": 19011}, {"text": "brussels", "size": 17837}, {"text": "est", "size": 17684}, {"text": "nice", "size": 17673}, {"text": "nous", "size": 16151}, {"text": "un", "size": 15652}, {"text": "le", "size": 14271}, {"text": "clean", "size": 13099}, {"text": "location", "size": 12509}, {"text": "host", "size": 12339}, {"text": "bien", "size": 12204}, {"text": "really", "size": 11477}, {"text": "pour", "size": 11395}, {"text": "en", "size": 11356}, {"text": "room", "size": 10627}, {"text": "good", "size": 10177}, {"text": "would", "size": 10064}, {"text": "recommend", "size": 9889}, {"text": "everything", "size": 9716}, {"text": "city", "size": 8983}, {"text": "well", "size": 8858}, {"text": "comfortable", "size": 8291}, {"text": "flat", "size": 8254}, {"text": "time", "size": 7977}, {"text": "also", "size": 7814}, {"text": "les", "size": 7804}, {"text": "bruxelles", "size": 7610}, {"text": "y", "size": 7564}, {"text": "appartement", "size": 7391}, {"text": "helpful", "size": 7367}, {"text": "dans", "size": 7314}, {"text": "perfect", "size": 7100}, {"text": "lappartement", "size": 6942}, {"text": "que", "size": 6935}, {"text": "close", "size": 6862}, {"text": "du", "size": 6343}, {"text": "walk", "size": 6323}, {"text": "centre", "size": 6240}, {"text": "station", "size": 6028}, {"text": "friendly", "size": 5912}, {"text": "easy", "size": 5853}, {"text": "house", "size": 5811}];
   */

//find the max and min of the frequency_list:
//  memostuff = _.reduce(frequency_list,function(memo,frequency_list){return memo});
  maxstuff = _.max(frequency_list, function(object){return object.size})
  maxFreq = parseFloat(maxstuff.size)
  minstuff = _.min(frequency_list, function(object){return object.size})
  minFreq = parseFloat(minstuff.size)

  var randomColor = (function(){
    var golden_ratio_conjugate = 0.618033988749895;
    var h = Math.random();

    var hslToRgb = function (h, s, l){
      var r, g, b;

      if(s == 0){
        r = g = b = l; // achromatic
      }else{
        function hue2rgb(p, q, t){
          if(t < 0) t += 1;
          if(t > 1) t -= 1;
          if(t < 1/6) return p + (q - p) * 6 * t;
          if(t < 1/2) return q;
          if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
      }

      return '#'+Math.round(r * 255).toString(16)+Math.round(g * 255).toString(16)+Math.round(b * 255).toString(16);
    };

    return function(){
      h += golden_ratio_conjugate;
      h %= 1;
      return hslToRgb(h, 0.5, 0.60);
    };
  })();


  var color = d3.scale.linear()
      .domain([minFreq,maxFreq])
      .range(['#ece7f2','#2b8cbe'])
  d3.layout.cloud().size([1400,400])
      .words(frequency_list)
      .rotate(0)
      .fontSize(function(d){return d.size;})
      .on("end",draw)
      .start()

  function draw(words) {
    d3.select("#wordCloud").append("svg")
        .attr("width",1500)
        .attr("height",500)
        .append("g")
        .attr("transform","translate(320,200)")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size",function(d){
          var normalized = parseFloat((parseFloat(d.size)-minFreq)/(maxFreq-minFreq));
          var sizing = Math.ceil(normalized*100)
          return (d.size)+"px";})
        .style("fill",function(d,i){return randomColor();})
        .attr("transform",function(d){
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });


  }
}
