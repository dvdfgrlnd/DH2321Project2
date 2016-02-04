/* global d3 */
// d3.select(window).on("resize", resize);
var margin = {top: 30, right: 10, bottom: 30, left: 10};
var width=parseInt(d3.select("#maincanvas").style("width"), 10)
            - margin.left - margin.right;
//             
// var array=[1,2,3,4,5,6,7,8];
// var x=d3.scale.linear();
// x.rangeRound([0, width]);
// x.domain([d3.min(array), d3.max(array)]);
// var canvas=d3.select("#maincanvas");
// canvas.attr("width", "100%")
//       .attr("height", "100%");
// 
// var barHeight=15;
// var heightMargin=1;
// var colors=["yellow", "blue"];
// canvas.append("g")
//     .selectAll("rect")
//     .data(array)
//     .enter()
//     .append("rect")
//     .attr("width", (d, i)=>{ return x(d); })
//     .attr("height", barHeight)
//     .attr("x", 10)
//     .attr("y", (d, i)=>{ return ((barHeight+heightMargin)*i); })
//     .style("fill", (d, i)=>{ return colors[(i%2)]; });
    
    // var width = 960,
    
    
var height = parseInt(d3.select("#maincanvas").style("height"), 10)
            - margin.bottom-margin.top;
console.log(parseInt(d3.select("#maincanvas").style("height")));
width=960;
height=500;
var canvas=d3.select("#maincanvas")
    .attr("width", width)
    .attr("height", height);
var projection = d3.geo.mercator()
    .center([100, 30 ])
    .scale(130)
    .rotate([-180,0]);

var svg = d3.select("#maincanvas");

var path = d3.geo.path()
    .projection(projection);

var g = svg.append("g")
           .attr("height", height)
           .attr("width", width);

// load and display the World
d3.json("data/world-110m2.json", function(error, topology) {
    g.selectAll("path")
      .data(topojson.object(topology, topology.objects.countries)
          .geometries)
    .enter()
      .append("path")
      .attr("d", path)
});
    
// resize();
    
function resize(){
    width=parseInt(d3.select("#maincanvas").style("width"), 10)
            - margin.left-margin.right;

    x.rangeRound([0, width]);
            
    canvas.selectAll("rect")
          .attr("width", (d, i)=>{ return x(d); })
}