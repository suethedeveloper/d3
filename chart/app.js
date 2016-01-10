var barData = [];

for (var i = 0; i < 50; i++) {
 barData.push(Math.round(Math.random()*30)+1); 
}

barData.sort(function compareNumbers(a,b){ return a-b; });

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
var tooltip = d3.select('body').append('div')
                .style('position', 'absolute')
                .style('padding', '0 10px')
                .style('background', 'white')
                .style('opacity', 0);

var myChart = d3.select("#chart").append("svg")
  .attr('width', width)
  .attr('height', height)
  .append('g')
    .selectAll('rect').data(barData)
    .enter().append('rect')
      .style('fill', function(d, i){return colors(i);})
      .attr('width', xSacle.rangeBand())
      .attr('height', 0)
      .attr('x', function(d, i){ return xSacle(i); })
      .attr('y', height)
    .on('mouseover', function(d){
      tooltip.transition().style('opacity', '.9');
      tooltip.html(d)
        .style('left', (d3.event.pageX) + 'px')
        .style('top', (d3.event.pageY) + 'px');
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

 var vGuideScale = d3.scale.linear()
      .domain([0, d3.max(barData)])
      .range([height, 0]);
  
 var vAxis = d3.svg.axis()
              .scale(vGuideScale)
              .orient('left')
              .ticks(10);

var vGuide = d3.select('svg').append('g');              
    vAxis(vGuide);
    vGuide.attr('transform', 'translate(35, 0)');
    vGuide.selectAll('path')
      .style({fill: 'none', stroke: '#000'});
    vGuide.selectAll('line')
      .style({ stroke: '#000'});
