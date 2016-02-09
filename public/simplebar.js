/* global generateColors */
/* global d3 */

d3.json('data/dataFive.json', (error, countries)=>{
    d3.select(window).on('resize', resize);
    console.log(countries);
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
    
    // var questions=Object.keys(countries[0].values).filter((d)=>{ return (d!='(N)' && d!="Don´t know")});
    var questions=['Increased private ownership', '2', '3', '4', '5', '6', '7', '8', '9', 'Increased state ownership'];
    // console.log(questions);
    var colors=generateColors(countries.map((d)=>{return d.name;}));
    console.log(colors);
    
    var change=[];
    questions.forEach((d)=>{
        var x0=0;
        var bar={};
        bar.name=d;
        bar.countries=countries.map((c)=>{
            // console.log((c.values[d]["2010-2014"]).toString()+' | '+(c.values[d]["2005-2009"]).toString());
            return {country: c.name, x0: x0, x1: x0+=((+c.values[d]["2010-2014"]))};//-(+c.values[d]["2005-2009"])
        });
        bar.total=bar.countries[bar.countries.length-1].x1;
        change.push(bar);
    });
    console.log([0, d3.max(change, (d)=>{ return d.total;})]);
    var xScale=d3.scale.linear();
    xScale.rangeRound([0, width-margin.right]);
    xScale.domain([0, d3.max(change, (d)=>{ return d.total;})]);
    var yScale=d3.scale.ordinal()
        .rangeRoundBands([0, height], 0.1)
        .domain(questions);
    
    var que=canvas.append('g')
        .selectAll('.questions')
        .data(change)
        .enter()
        .append('g')
        .attr('class', '.questions')
        .attr('transform', (d)=>{ return "translate(0,"+yScale(d.name)+")" });
        
    que.selectAll('rect')
        .data((d)=>{ return d.countries;})
        .enter()
        .append('rect')
        .attr('width', (d)=>{ return xScale(Math.abs(d.x1))-xScale(Math.abs(d.x0));})
        .attr('height', yScale.rangeBand())
        .attr('x', (d)=>{ return xScale(d.x0); })
        .style('fill', (d)=>{ return colors[d.country]; });
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