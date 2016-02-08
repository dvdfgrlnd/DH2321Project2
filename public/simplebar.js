/* global d3 */
d3.json('data/dataThree.json', (error, data)=>{
    d3.select(window).on('resize', resize);
    console.log(data);
    var margin = {top: 30, right: 20, bottom: 30, left: 20};
    var canvas=d3.select('body').append('svg')
        .attr('width', '100%')
        .attr('height', '99%')
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    var width=parseInt(d3.select("svg").style('width'), 10)
                - margin.left - margin.right;

    var array=[1,2,3,4,5,6,7,8];
    var x=d3.scale.linear();
    x.rangeRound([0, width]);
    x.domain([d3.min(array), d3.max(array)]);

    var barHeight=15;
    var heightMargin=1;
    var colors=['yellow', 'blue'];
    canvas.append('g')
        .selectAll('rect')
        .data(array)
        .enter()
        .append('rect')
        .attr('width', (d, i)=>{ return x(d); })
        .attr('height', barHeight)
        .attr('x', 10)
        .attr('y', (d, i)=>{ return ((barHeight+heightMargin)*(i+1)); })
        .style('fill', (d, i)=>{ return colors[(i%2)]; });
    
    resize();
        
    function resize(){
        width=parseInt(d3.select("svg").style('width'), 10)
                - margin.left-margin.right;

        x.rangeRound([0, width]);
                
        canvas.selectAll('rect')
            .attr('width', (d, i)=>{ return x(d); })
    }
});