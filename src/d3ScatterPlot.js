import d3 from 'd3';

var d3ScatterPlot = {};

d3ScatterPlot.render = function(strikeData) {
    var countries = [],
        deathsByCountry = {},
        margin = 20,
        width = 1000 - margin * 2,
        height = 600 - margin * 2,
        totalFatalities, country, scatterPlot
    
    scatterPlot = d3.select('#chart')
        .append('svg')
        .attr('width', width + margin * 2 + 'px')
        .attr('height', height + margin * 2 + 'px');
    
    scatterPlot.append('g')
        .attr('class', 'points')
        .attr("transform", "translate(" + (margin * 4)+ ", " + margin + ")");
    
    for (var i = 0; i < strikeData.length; i++) {
        if (countries.indexOf(strikeData[i].country) === -1) {
            countries.push(strikeData[i].country);
        }
        
        if (!deathsByCountry.hasOwnProperty(strikeData[i].country)) {
            deathsByCountry[strikeData[i].country] = !isNaN(Number(strikeData[i].deaths_min)) ? Number(strikeData[i].deaths_min) : 0;
            continue;
        }
        
        deathsByCountry[strikeData[i].country] += !isNaN(Number(strikeData[i].deaths_min)) ? Number(strikeData[i].deaths_min) : 0;
    }
    
    
    var xScale = d3.scale.linear()
        .domain([0, d3.max(d3.values(deathsByCountry))])
        .range([0, width]);
    
    var yScale = d3.scale.ordinal()
        .domain(d3.keys(deathsByCountry))
        .rangePoints([height, 0]);
    
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");
        
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .tickFormat(function(d) { return d; })
        .orient("left");
        
    var g = scatterPlot.selectAll('.points');
    
    var point = g.selectAll('.point')
        .data(d3.keys(deathsByCountry));
    
    point.enter().append('circle')
        .attr('class', 'point')
        .attr('r', 3.5)
        .attr('fill', 'blue')
        .attr('cx', function(countryKey) {
            return xScale(deathsByCountry[countryKey]);
        })
        .attr('cy', function(countryKey) {
            return yScale(countryKey);
        });
    
    point.exit()
        .remove();
        
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    g.append("g")
        .attr("class", "y axis")
        .call(yAxis);
};

module.exports = d3ScatterPlot;
