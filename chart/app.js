var barData = [];

d3.tsv('data.tsv', function(data) { //change this depends on the file format. d3.csv('data.csv', callback) or d3.json('data.json',callback)

  for (var key in data) { //if tsv has two column like (month value), accessing will be data[key].month data[key].value
    barData.push(data[key].value);
  }

  var margin = {top: 30, right: 30, bottom: 40, left: 50};
  var height = 400 - margin.top - margin.bottom, 
      width = 600 - margin.right - margin.left, 
      barWidth = 50, 
      barOffset = 5, 
      tempColor;

  var yScale = d3.scale.linear()
                .domain([0, d3.max(barData)])
                .range([0, height]);
  var xSacle = d3.scale.ordinal()
                .domain(d3.range(0, barData.length))
                 .rangeBands([0, width], 0.05, 0);//2nd argument: space btw bar, 3rd argument: margins at the beginning and end of bar group
  var colors = d3.scale.linear()
                .domain([0, barData.length * .33, barData.length * .66, barData.length])
                .range(['#ffb832', '#c61c6f', '#268bd2', '#85992c']);
  var tooltip = d3.select('body').append('div')
                  .style('position', 'absolute')
                  .style('padding', '0 10px')
                  .style('background', 'white')
                  .style('opacity', 0);

  var myChart = d3.select("#chart").append("svg")
    .style('background', '#e7e0cb')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate('+ margin.left +','+ margin.top +')')
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
      vGuide.attr('transform', 'translate('+ margin.left +', '+ margin.top +')');
      vGuide.selectAll('path')
        .style({fill: 'none', stroke: '#000'});
      vGuide.selectAll('line')
        .style({stroke: '#000'});

  var hAxis = d3.svg.axis()
                .scale(xSacle)
                .orient('bottom')
                .tickValues(xSacle.domain().filter(function(d, i){
                  return !(i % (barData.lengh/5));
                })); 
  var hGuide = d3.select('svg').append('g');
      hAxis(hGuide);
      // hGuide.attr('transform', 'translate(0, ' + (height-30) +')');
      hGuide.attr('transform', 'translate('+ margin.left +', '+ (margin.top + height) +')');
      hGuide.selectAll('path')
        .style({fill: 'none', stroke: '#000'});
      hGuide.selectAll('line')
        .style({stroke: '#000'});
});











                                
