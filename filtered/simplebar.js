/* global d3 */
var margin = {top: 30, right: 40, bottom: 30, left: 70};
var canvas=d3.select('#maindiv').append('svg')
    .attr('width', '99%')
    .attr('height', '99%')
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
var radarPadding=300;
var radius=80,
    maxPercent=40;
var mainWidth=parseInt(d3.select("svg").style('width'), 10)
            - margin.left - margin.right;
var width=mainWidth-radarPadding-radius;
var height=parseInt(d3.select("svg").style('height'), 10)
- margin.left - margin.right;
var yScale=d3.scale.ordinal()
    .rangeRoundBands([0, height], 0.1);
var rScale=d3.scale.linear()
    .rangeRound([0, yScale.rangeBand()/2]);
    rScale.domain([-2.8, 0.1]);    
var xScale=d3.scale.linear()
    .range([0, width]);
var questions=['Increased private ownership', '2', '3', '4', '5', '6', '7', '8', '9', 'Increased state ownership'];
var contextMenu=questions.slice();
contextMenu.push('GDP growth/capita');
var years=['2010-2014', '2005-2009', '1999-2004', '1994-1998', '1989-1993'];
var countries=worldValueSurvey;
var gdpGrowth=gapminderGrowth;
var colors=null;
var selectedNode=null;
var coordinates=[];
var id = 'questionradar';
var selectedNode=null;
var radarScale=d3.scale.linear()
            .range([0, radius])
            .domain([0, 1]);
var line = d3.svg.line()
        .x(function (d) { return radarScale(d.x); })
        .y(function (d) { return radarScale(d.y); });
            

console.log(countries);
console.log(gapminderGrowth);
var countryNames=countries.map((d)=>{return d.name;});
colors=generateColors(countryNames);
console.log(colors);

var change=createIndex(countries, years[0]);
console.log([0, d3.max(change, (d)=>{ return d.index;})]);

yScale.domain(countryNames);
// rScale.domain([0, yScale.rangeBand()/2]);

// Background year range
canvas.append('g')
    .attr("transform", 'translate('+(width/2)+',' + (height/4) + ")")
    .append('text')
    .attr('id', 'backgroundtext')
    .attr("dy", ".71em")
    .style("text-anchor", "middle")
    .text(years[0]);
    
canvas.append('g')
    .selectAll('.questions')
    .data(change)
    .enter()
    .append('circle')
    .attr('stroke-width', 5)
    .attr('transform', (d)=>{ return "translate(0,"+yScale(d.name)+")" })
    .attr('class', 'countryindex')
    .on("mouseover", function (node) { 
        if(!isNaN(node.index) && selectedNode===null) {
            updateRadarChart(node);
            updateContextMenu(node);
        } 
    })        
    .on("contextmenu", function (node) { 
        d3.event.preventDefault();
        copyCircle(this, node);
    })        
    .on("click", function (node) { selectCircle(this, node); });        
    
xScale.domain([d3.min(gdpGrowth, (d)=>{
    return d3.min(years, (y)=>{return d[y];});
}), d3.max(gdpGrowth, (d)=>{
    return d3.max(years, (y)=>{return d[y];});
})]);
console.log(xScale.domain());
    
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
    .text("Country");
    
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
    
    updateBarChart(d3.select('input').node());
    updateContextMenu({values:[]});
    createRadarChart({x:(mainWidth-radarPadding), y:420});

function selectCircle(circle, node){
    if(circle===selectedNode){
        selectedNode=null;
        d3.select(circle).style('stroke', 'none');
    } else {
        if(selectedNode!==null){
            d3.select(selectedNode).style('stroke', 'none');
            if(!isNaN(node.index)) {
                updateRadarChart(node);
            }
        }
        selectedNode=circle;
        d3.select(circle).style('stroke', 'black');
        updateContextMenu(node);    
    }
}

function copyCircle(circle, node){
    var selection=d3.select(circle);
    var id='id1';
    var copy=canvas.append('g')
        .attr('transform', selection.attr('transform'))
        .datum(node)
        .on('click', function (data){ 
            d3.select(this).remove();
        });
    copy.append('circle')
        .attr('r', selection.attr('r'))
        .attr('cx', selection.attr('cx'))
        .attr('cy', selection.attr('cy'))
        .attr('id', id)
        .style('opacity', 0.5)
        .style('fill', selection.style('fill'))
        .on("mouseover", function (node) { 
            if(!isNaN(node.index) && selectedNode===null) {
                updateRadarChart(node);
                updateContextMenu(node);
            }
        });
    copy.append('text')
        .text((d)=>{return d.year})
        .attr('x', selection.attr('cx'))
        .style('font-size', 12)
        .attr('y', selection.attr('cy'))
        .attr('text-anchor', 'middle');
    // Show a label with 'Copied!'
    d3.select('#statusField')
        .transition()
        .duration(2000)
        .text('Copied!')
        .style('display', 'inline')
        .each('end', function(){ d3.select('#statusField').style('display', 'none'); });
}

function createIndex(countries, year){
    return countries.map((c)=>{
                var list={};
                var growth=gdpGrowth.filter((d)=>{ return d.country===c.name;}).shift()[year];
                var i=questions.reduce((prev, d, i)=>{ 
                    list[d]=100*(+c.values[d][year]);
                    return prev+=((i-(questions.length/2))*(+c.values[d][year])); }, 0);
                // if(c.name==='china')
                //     console.log(i);
                return {name: c.name, index: i, values: list, gdp: growth, 'year': year};
            });
}

function updateCoordinates(values) {
    var index = 0;
    var currentAngle = 0,
        angleDelta = ((2 * Math.PI) / questions.length);
    questions.forEach(function(d) {
        var c=values[d]/maxPercent;
        if(c!==undefined){
            this.coordinates[index++] = { x: (Math.cos(currentAngle) * c), y: (Math.sin(currentAngle) * c), name: d };
            currentAngle += angleDelta;
        }
    });
    
    this.coordinates[index] = this.coordinates[0];
}

function updateRadarChart(data){
    updateCoordinates(data.values);
    d3.select('#'+id)
            .transition()
            .attr("d", this.line)
            .duration(1000)
            .ease("linear")
            .attr("transform", null);
}

function updateBarChart(obj){
    if(countries===null)
        return;
        
    console.log();
    var year=years[years.length-1-obj.value];
    var change=createIndex(countries, year);
    rScale.rangeRound([20, yScale.rangeBand()/2]);
    // rScale.domain(d3.extent(change, (d)=>{return d.index; }));
    // console.log(rScale.domain());
    canvas.selectAll('.countryindex')
        .data(change)
        .transition()
        .duration(1000)
        .attr('r', (d)=>{ return isNaN(d.index)?25:(rScale(d.index));})
        .attr('cx', (d)=>{ return xScale(d.gdp); })
        .attr('cy', yScale.rangeBand()/2)
        .style('fill', (d)=>{ return isNaN(d.index)?'black':colors[d.name]; });
    if(selectedNode!==null){
        var data=d3.select(selectedNode).data().shift();
        if(!isNaN(data.index))
            updateRadarChart(data);
            
        updateContextMenu(data);
    }
    
    d3.select('#backgroundtext').text(year);
}

function updateContextMenu(data){
    var values=JSON.parse(JSON.stringify(data.values));
    values['GDP growth/capita']=(data.gdp);
    var text=canvas.selectAll('.context')
        .data(contextMenu);
    text.enter().append('text')
        .attr('class', 'context')
        .attr('transform', (d, i)=>{ return 'translate('+(mainWidth-220)+','+(30*(i))+')';});
    text.transition()
        .text((d)=>{return d+' = '+((values[d]===undefined || values[d]===null)?'':(values[d].toFixed(2)+' %')); });
}

function createRadarChart(offset) {
    var angleDelta = ((2 * Math.PI) / questions.length), 
        angle = 0, index = 0, max = 2 * Math.PI, lines=[]
                
    while (angle < max) {
        lines[index] = [{ x: 0, y: 0 }, { x: (Math.cos(angle)), y: (Math.sin(angle)) }, questions[index]];
        index++;
        angle += angleDelta;
    }
    var chart=canvas.append("g")
         .datum(this.coordinates)
        .attr("class", "radarchart")
        .attr("transform", "translate(" + offset.x + "," + offset.y + ")");
    chart.append("circle")
        .attr("r", radius)
        .attr("fill", "transparent")
        .attr("stroke", "green")
        .attr("stroke-width", 3);
  
    // Create the lines that goes from the center of the chart and out
    chart.append("g").selectAll(".radiusline")
         .data(lines)
         .enter()
         .append("path")
         .attr("d", function (d) { return line([d[0], d[1]]); })
         .style("stroke", "gray");
    var labelFactor=1.25;
    // Create the circles at the end of the lines, that represents the different keys ("questions")
    chart.append("g").selectAll(".typeCircle")
         .data(lines)
         .enter()
         .append("text")
         .text(function(d){ return d[2];})
         
         .attr("transform", function (d, i) { return 'translate('+radarScale(d[1].x*labelFactor)+','+radarScale(d[1].y*labelFactor)+')'; })
         .attr("stroke-width", 3);
    // Draw the lines for the radar surface
    chart.append("g")
         .append("path")
         .attr("id", id)
         .attr("d", line)
         .style("stroke-width", 2)
         .style("stroke", "steelblue")
         .style("fill", "rgba(0, 0, 0, 0.8)");
}