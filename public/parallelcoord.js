/* global d3 */
d3.select(window).on("resize", resize);
var margin = {top: 30, right: 50, bottom: 30, left: 50};
var width=parseInt(d3.select("#maincanvas").style("width"), 10)
            - margin.left - margin.right;

var keys=["one", "two", "three"];
var array=[{one:12, two:32, three:78},
            {one:43, two:26, three:75},
            {one:30, two:54, three:32}];

var canvas=d3.select("#maincanvas")
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var axisScale=d3.scale.ordinal();
    axisScale.domain(keys);
    axisScale.rangeBands([0, width]);
var dimensions=keys.reduce((previous, item)=>{ 
        var scale=d3.scale.linear();
        scale.rangeRound([0, width]);
        scale.domain([d3.min(array.map((d)=>{return d[item];})), 
            d3.max(array.map((d)=>{return d[item];}))]);
        var axis=d3.svg.axis()
                .scale(scale)
                .orient("left");
        previous.push({key: item, axis: axis, scale: scale});
        return previous;
    }, []);
console.log(dimensions);
var axes=canvas.selectAll(".axis")
        .data(dimensions)
        .enter()
        .append("g")
        .attr("class", "axis")
        .attr("transform", (d)=>{return "translate("+(axisScale(d.key))+",0)";});
axes.each((d)=>{ d3.select(this).call(d.axis());});
// axes[0].forEach((d)=>{ d.__data__.axis(); });
resize();
    
function setRangeAndAxisScale(){
    axisScale.rangeBands([0, width]);
    var axes=d3.selectAll(".axis")
        .attr("transform",(d, i)=>{ return "translate("+(axisScale(keys[i]))+",0)";});
        
    axes.each((d, i)=>{
            console.log(i);
            d.scale.rangeRound([0, width]);
            return d.axis;});
}
    
function resize(){
    width=parseInt(d3.select("#maincanvas").style("width"), 10)
            - margin.left-margin.right;

    setRangeAndAxisScale();
            
    canvas.selectAll("rect")
          .attr("width", (d, i)=>{ return xScale(d.one); })
}