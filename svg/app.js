d3.select('#chart')
  .append('svg')
    .attr('width', 600)
    .attr('height', 400)
    .style('background', '#93a1a1')
      .append('rect')
        // .attr('x',200)
        // .attr('y', 100)
        // .attr('width', 200)
        // .attr('height', 200)
        .attr({'x':200, 'y': 100,'width': 200, 'height': 200})
        .style('fill', '#cb4b19');

    d3.select('svg')
      .append('circle')
      .attr({'cx':300, 'cy': 200,'r': 50})
      .style('fill', '#840043');