$(function() {

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
})
