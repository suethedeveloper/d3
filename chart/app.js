

//Quantative Scale - yScale
var barData = [20, 30, 45, 15, 50, 30, 7, 23,20, 30, 45, 15, 50, 30, 7, 23];
var height = 400, width = 600, barWidth = 50, barOffset = 5;
var yScale = d3.scale.linear()
              .domain([0, d3.max(barData)])
              .range([0, height]);
var xSacle = d3.scale.ordinal()
              .domain(d3.range(0, barData.length))
              .rangeBands([0, width]);              
var colors = d3.scale.linear()
              .domain([0, barData.length * .33, barData.length * .66, barData.length])
              .range(['#ffb832', '#c61c6f', '#268bd2', '#85992c']);

d3.select("#chart")
  .append("svg")
    .attr({'width': width, 'height': height})
    .style('background', '#c9d7d6')
      .selectAll('rect').data(barData)
      .enter().append('rect')
        .style('fill', function(d, i){return colors(i);})
        .attr({
              // 'width': barWidth,
              'width': xSacle.rangeBand(),
              // 'height': function(d){ return d;},
              'height': function(d){ return yScale(d);},              
              // 'x': function(d, i){ return i * (barWidth+barOffset); },
              'x': function(d, i){ return xSacle(i); },
              // 'y': function(d){ return height-d; }
              'y': function(d){ return height - yScale(d); }
        });
        // .attr('width', barWidth)
        // .attr('height', function(d){ return d;})
        // .attr('x', function(d, i){ return i * (barWidth+barOffset);})
        // .attr('y', function(d){ return height-d; });