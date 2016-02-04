/* global d3 */
// d3.select(window).on("resize", resize);
var margin = {top: 30, right: 10, bottom: 30, left: 10};
var width=parseInt(d3.select("#maincanvas").style("width"), 10)
            - margin.left - margin.right;
             
var array=[1,2,3,4,5,6,7,8];
var x=d3.scale.linear();
x.rangeRound([0, width]);
x.domain([d3.min(array), d3.max(array)]);
var canvas=d3.select("#maincanvas");
canvas.attr("width", "100%")
      .attr("height", "100%");

var barHeight=15;
var heightMargin=1;
var colors=["yellow", "blue"];
canvas.append("g")
    .selectAll("rect")
    .data(array)
    .enter()
    .append("rect")
    .attr("width", (d, i)=>{ return x(d); })
    .attr("height", barHeight)
    .attr("x", 10)
    .attr("y", (d, i)=>{ return ((barHeight+heightMargin)*i); })
    .style("fill", (d, i)=>{ return colors[(i%2)]; });
  
resize();
    
function resize(){
    width=parseInt(d3.select("#maincanvas").style("width"), 10)
            - margin.left-margin.right;

    x.rangeRound([0, width]);
            
    canvas.selectAll("rect")
          .attr("width", (d, i)=>{ return x(d); })
}