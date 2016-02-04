/* global topojson */
/* global d3 */
// d3.select(window).on("resize", resize);
var margin = {top: 30, right: 10, bottom: 30, left: 10};
var width=parseInt(d3.select("#maincanvas").style("width"), 10)
            - margin.left - margin.right;
    
var height = parseInt(d3.select("#maincanvas").style("height"), 10)
            - margin.bottom-margin.top;
console.log(parseInt(d3.select("#maincanvas").style("height")));
width=1200;
height=500;
var canvas=d3.select("#maincanvas")
    .attr("width", width)
    .attr("height", height);
var projection = d3.geo.equirectangular()
    .center([100, 30 ])
    .scale(130)
    .rotate([0,0]);

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
      
     console.log(topology);
});

var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        g.attr("transform","translate("+ 
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        g.selectAll("path")  
            .attr("d", path.projection(projection)); 
});

svg.call(zoom)