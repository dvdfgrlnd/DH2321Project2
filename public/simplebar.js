/* global generateColors */
/* global d3 */
var margin = {top: 30, right: 40, bottom: 30, left: 150};
var canvas=d3.select('body').append('svg')
    .attr('width', '95%')
    .attr('height', '95%')
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
var width=parseInt(d3.select("svg").style('width'), 10)
            - margin.left - margin.right;
var height=parseInt(d3.select("svg").style('height'), 10)
- margin.left - margin.right;
var xScale=d3.scale.linear();
xScale.rangeRound([0, width-margin.right]);
var yScale=d3.scale.ordinal()
    .rangeRoundBands([0, height], 0.1)
// var questions=Object.keys(countries[0].values).filter((d)=>{ return (d!='(N)' && d!="Don´t know")});
var questions=['Increased private ownership', '2', '3', '4', '5', '6', '7', '8', '9', 'Increased state ownership'];
var years=['2010-2014', '2005-2009', '1999-2004', '1994-1998', '1989-1993'];
var countries=null;
var colors=null;

d3.json('data/dataFive.json', (error, data)=>{
    countries=data;
    d3.select(window).on('resize', resize);
    console.log(countries);
    // console.log(questions);
    var countryNames=countries.map((d)=>{return d.name;});
    colors=generateColors(countryNames);
    console.log(colors);
    
    var change=createIndex(countries, years[0]);
    console.log([0, d3.max(change, (d)=>{ return d.index;})]);
    
    xScale.domain([0, d3.max(change, (d)=>{ return d.index;})]);
    yScale.domain(countryNames);
    
    canvas.append('g')
        .selectAll('.questions')
        .data(change)
        .enter()
        .append('g')
        .attr('class', '.questions')
        .attr('transform', (d)=>{ return "translate(0,"+yScale(d.name)+")" })
        .append('rect')
        .attr('class', 'countryindex')
        .attr('width', (d)=>{ return xScale(d.index);})
        .attr('height', yScale.rangeBand())
        .attr('x', (d)=>{ return 0; })
        .style('fill', (d)=>{ return colors[d.name]; });
    //console.log(xScale(d.x1).toString()+' '+xScale(d.x0).toString()+' '+d.x1.toString()+' '+d.x0.toString());
    var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");
        
    canvas.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    canvas.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Population");
      
      var legend = canvas.selectAll(".legend")
      .data(Object.keys(colors))
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 8)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", (d)=>{ return colors[d];});

    legend.append("text")
        .attr("x", width - 14)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });
      
    resize();
        
    function resize(){
//         width=parseInt(d3.select("svg").style('width'), 10)
//                 - margin.left-margin.right;
// 
//         xScale.rangeRound([0, width]);
                
        // canvas.selectAll('rect')
        //     .attr('width', (d, i)=>{ return 50; })
    }
});

function createIndex(countries, year){
    return countries.map((c)=>{
                var i=questions.reduce((prev, d, i)=>{ return prev+=((i+1)*(+c.values[d][year])); }, 0)
                return {name: c.name, index: i};
            });
}

function updatechart(obj){
    if(countries===null)
        return;
        
    console.log();
    var change=createIndex(countries, years[obj.value]);
    xScale.domain([0, d3.max(change, (d)=>{ return d.index;})]);
    canvas.selectAll('.countryindex')
        .data(change)
        .transition()
        .duration(1000)
        .attr('width', (d)=>{ return isNaN(d.index)?xScale(xScale.domain()[1]):xScale(d.index);})
        .style('fill', (d)=>{ return isNaN(d.index)?'black':colors[d.name]; });
}