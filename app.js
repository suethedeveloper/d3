// d3.selectAll('.item')
//   .attr('class', 'hightlight');

// d3.selectAll('.item')
//   .classed('hightlight', true);  

// d3.selectAll('.item:nth-child(3)')
//   .classed('hightlight', true);  

// d3.selectAll('.item:nth-child(3)')
//   .classed({
//     'hightlight': true,
//     'item': false,
//     'bigger': true
//   });

// d3.selectAll('.item:nth-child(3)')
//   .style({
//     'background': '#268bd2',
//     'padding': '10px',
//     'margin': '5px',
//     'color': '#eee8d5'
//   });

// d3.selectAll('.item')
//   .data([true, true])
//   .style('background', '#268bd2'); 

// var myStyle = [
//   '#268bd2', 
//   '#bd3613',
//   '#a57706',
//   '#2176c7'
// ];
// d3.selectAll('.item')
//   .data(myStyle)
//   .style('background', myStyle[0]); 

// d3.selectAll('.item')
//   .data(myStyle)
//   .style('background', function(d){
//     return d;
//   }); 

var myStyle = [
  { width: 200, color: '#268bd2'},
  { width: 230, color: '#bd3613'},
  { width: 220, color: '#a57706'},
  { width: 290, color: '#2176c7'}
];

d3.selectAll('.item')
  .data(myStyle)
  .style({
    'color': '#fff',
    'background': function(d){
      return d.color;
    },
    'width': function(d){
      return d.width + 'px';
    }
  }); 

//---------------------------------------------------------
// d3.select(".item").text('select');
// d3.select("#chart .item").text('select');

//it's not an array so item[2] won't work.
//Use nth-child css suedo selector instead. nth-child(odd) nth-child(n+3)->every element after 3rd including 3 
// d3.select(".item:nth-child(2)").text('select'); 

// d3.selectAll(".item").text('select');
// d3.selectAll('.item:nth-child(3n)')
//   .html('<strong>selection</strong>'); 

// d3.select('.item')
//   .append('div')
//   .html('<strong>selection</strong>'); 

// d3.select('.item')
//   .append('span')
//   .html(' <strong>selection</strong>');

// d3.select('#chart')
//   .append('span')
//   .html(' <strong>selection</strong>');   

// d3.select('#chart')
//   .insert('span', ':nth-child(3)')
//   .html(' <strong>selection</strong>');  

// d3.select('#chart .item:nth-child(3)')
//   .remove();

