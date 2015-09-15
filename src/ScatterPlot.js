import React, { Component } from 'react';
import d3 from 'd3';

var ScatterPlot = React.createClass({
    render: function() {
        this.drawChart(this.props.strikeData);
        return (
            <div id="chart"></div>
        );
    },
    formatJSON: function(strikeData) {
        var deathsByCountry = [];
        var countries = {},
            currentCountry;
        for (var i = 0; i < strikeData.length; i++) {
            currentCountry = strikeData[i].country;
            
            // Add country to object if it's not already there
            if (!countries.hasOwnProperty(currentCountry)) {
                countries[currentCountry] = {deaths_min: null, deaths_max: null};
            }
            
            countries[currentCountry].deaths_min += !isNaN(Number(strikeData[i].deaths_min)) ? Number(strikeData[i].deaths_min) : 0;
            countries[currentCountry].deaths_max += !isNaN(Number(strikeData[i].deaths_max)) ? Number(strikeData[i].deaths_max) : 0;
        }
        return countries;
    },
    drawChart: function(strikeData) {
        if (!strikeData) {return;};
        
        var deathsByCountry = this.formatJSON(strikeData);
        
        var margin = 15,
            width = (1170 - margin * 2) / 2,
            height = 600 - margin * 2,
            totalFatalities, country, scatterPlot;
        
        scatterPlot = d3.select('#chart')
            .append('svg')
            // .attr('viewBox', '0 0 960 500')
            .attr('preserveAspectRatio', 'xMidYMid')
            .attr('width', width + margin * 2)
            .attr('height', height + margin * 2);
        
        scatterPlot.append('g')
            .attr('class', 'points')
            .attr("transform", "translate(" + (margin * 4)+ ", " + margin + ")");
            
        var yDomain = d3.max(d3.values(deathsByCountry), function(item) {
            return item.deaths_max + 500;
        });
        
        var yScale = d3.scale.linear()
            .domain([0, yDomain])
            .range([height, 0]);
        
        var xScale = d3.scale.ordinal()
            .domain(d3.keys(deathsByCountry))
            .rangePoints([0, height]);
        
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .tickFormat(d3.format(",.0f"))
            .orient("left");
            
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .tickFormat(function(d) { return d; })
            .orient("bottom");
            
        var g = scatterPlot.selectAll('.points');
        
        var point = g.selectAll('.point')
            .data(d3.keys(deathsByCountry));
        
        point.enter().append('circle')
            .attr('class', 'point')
            .attr('r', 3.5)
            .attr('fill', 'blue')
            .attr('cx', function(countryKey) {
                console.log(countryKey);
                return xScale(countryKey);
            })
            .attr('cy', function(countryKey) {
                return yScale(deathsByCountry[countryKey].deaths_min);
            });
        
        point.enter().append('circle')
            .attr('class', 'point')
            .attr('r', 3.5)
            .attr('fill', 'pink')
            .attr('cx', function(countryKey) {
                return xScale(countryKey);
            })
            .attr('cy', function(countryKey) {
                return yScale(deathsByCountry[countryKey].deaths_max);
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
    }
});


module.exports = ScatterPlot;
