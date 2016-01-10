var barData = [];
for (var i = 0; i < 100; i++) {
 barData.push(Math.random()*30); 
}

var height = 400, width = 600, barWidth = 50, barOffset = 5, tempColor;
var yScale = d3.scale.linear()
              .domain([0, d3.max(barData)])
              .range([0, height]);
var xSacle = d3.scale.ordinal()
              .domain(d3.range(0, barData.length))
              .rangeBands([0, width]);              
var colors = d3.scale.linear()
              .domain([0, barData.length * .33, barData.length * .66, barData.length])
              .range(['#ffb832', '#c61c6f', '#268bd2', '#85992c']);

var myChart = d3.select("#chart")
  .append("svg")
    .attr({'width': width, 'height': height})
    // .style('background', '#c9d7d6')
      .selectAll('rect').data(barData)
      .enter().append('rect')
        .style('fill', function(d, i){return colors(i);})
        .attr({
              'width': xSacle.rangeBand(),
              'height': 0,              
              'x': function(d, i){ return xSacle(i); },
              'y': height
        })
      .on('mouseover', function(d){
        tempColor = this.style.fill;
        d3.select(this)
          .style('opacity', '.5')
          .style('fill', 'yellow');
      })
      .on('mouseout', function(d){
        d3.select(this)
          .style('opacity', 1)
          .style('fill', tempColor);
      });

myChart.transition()
  .attr({
              'height': function(d){ return yScale(d);},              
              'y': function(d){ return height - yScale(d); }
        })
  // .delay(20);     
  .delay(function(d, i){ return i * 20; })
  .duration(1000)
  .ease('elastic');