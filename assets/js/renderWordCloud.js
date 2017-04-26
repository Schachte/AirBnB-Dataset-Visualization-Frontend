function renderWorldCloud(city) {

/*
  frequency_list =[{"text": "apartment", "size": 28013}, {"text": "great", "size": 21078}, {"text": "stay", "size": 20394}, {"text": "place", "size": 20059}, {"text": "us", "size": 18974}, {"text": "brussels", "size": 17697}, {"text": "nice", "size": 17528}, {"text": "clean", "size": 13013}, {"text": "location", "size": 12165}, {"text": "host", "size": 12157}, {"text": "really", "size": 11443}, {"text": "room", "size": 10580}, {"text": "good", "size": 10098}, {"text": "would", "size": 10054}, {"text": "recommend", "size": 9838}, {"text": "everything", "size": 9694}, {"text": "city", "size": 8921}, {"text": "well", "size": 8821}, {"text": "comfortable", "size": 8217}, {"text": "flat", "size": 8173}, {"text": "time", "size": 7959}, {"text": "also", "size": 7770}, {"text": "helpful", "size": 7349}, {"text": "perfect", "size": 6991}, {"text": "close", "size": 6838}, {"text": "walk", "size": 6305}, {"text": "friendly", "size": 5891}, {"text": "easy", "size": 5832}, {"text": "house", "size": 5757}, {"text": "station", "size": 5653}, {"text": "located", "size": 5478}, {"text": "definitely", "size": 5413}, {"text": "lovely", "size": 5251}, {"text": "even", "size": 5024}, {"text": "home", "size": 4825}, {"text": "area", "size": 4737}, {"text": "beautiful", "size": 4699}, {"text": "one", "size": 4696}, {"text": "like", "size": 4650}, {"text": "get", "size": 4569}, {"text": "center", "size": 4523}, {"text": "spacious", "size": 4346}, {"text": "made", "size": 4296}, {"text": "highly", "size": 4178}, {"text": "wonderful", "size": 4172}, {"text": "restaurants", "size": 4018}, {"text": "metro", "size": 3986}, {"text": "around", "size": 3920}, {"text": "staying", "size": 3907}, {"text": "quiet", "size": 3844}]
*/

//find the max and min of the frequency_list:
//  memostuff = _.reduce(frequency_list,function(memo,frequency_list){return memo});
document.getElementById('wordCloud').innerHTML = ''
  $.getJSON('http://ec2-52-38-115-147.us-west-2.compute.amazonaws.com:8000/retrieveWordCloud/' + city, function(data) {
    console.log('called again for:')
    console.log(city)
    frequency_list = data["freqList"]
    console.log(frequency_list)
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
        .words(frequency_list.map(function(d) {
          var normalized = ((parseFloat(d.size)-minFreq)/(maxFreq-minFreq))*100;
          return {text: d.text, size: ((parseFloat(d.size)-minFreq)/(maxFreq-minFreq))*100};}))
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

  })

}
