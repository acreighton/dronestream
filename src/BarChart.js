import React, { Component } from 'react';
import d3 from 'd3';

var BarChart = React.createClass({
    componentDidMount: function() {
        this.drawChart();
    },
    render: function() {
        return (
            <div id="chart"></div>
        );
    },
    formatData: function(strikeData) {
        var countries = {},
            currentCountry;
        for (var i = 0; i < strikeData.length; i++) {
            currentCountry = strikeData[i].country;
            
            if (!countries.hasOwnProperty(currentCountry)) {
                countries[currentCountry] = {deaths_min: null, deaths_max: null};
            }
            
            countries[currentCountry].deaths_min += !isNaN(Number(strikeData[i].deaths_min)) ? Number(strikeData[i].deaths_min) : 0;
            countries[currentCountry].deaths_max += !isNaN(Number(strikeData[i].deaths_max)) ? Number(strikeData[i].deaths_max) : 0;
        }
        return countries;
    },
    drawChart: function() {
        if (!this.props.strikeData) {return;};
        
        var deathsByCountry = this.formatData(this.props.strikeData);
        
        var margin = 15,
            width = (1170 - margin * 2) / 2,
            height = 600 - margin * 2,
            totalFatalities, country, barChart;
        
        barChart = d3.select('#chart')
            .append('svg')
            .attr('style', 'overflow: visible')
            .attr('preserveAspectRatio', 'xMidYMid')
            .attr('width', width + margin * 2)
            .attr('height', height + margin * 4);
        
        barChart.append('g')
            .attr('class', 'bars')
            .attr("transform", "translate(" + (margin * 4)+ ", " + margin + ")");
            
        var yDomain = d3.max(d3.values(deathsByCountry), function(item) {
            return item.deaths_max + 500;
        });
        
        var yScale = d3.scale.linear()
            .domain([0, yDomain])
            .range([height, 0]);
        
        var xScale = d3.scale.ordinal()
            .domain(d3.keys(deathsByCountry))
            .rangeRoundBands([0, width]);
        
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .tickFormat(d3.format(",.0f"))
            .orient("left");
            
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .tickFormat(function(d) { return d; })
            .orient("bottom");
            
        var g = barChart.selectAll('.bars');
        
        var point = g.selectAll('.bar')
            .data(d3.keys(deathsByCountry));
        
        point.enter().append('rect')
            .attr('class', 'bar')
            .attr('r', 3.5)
            .attr('fill', '#2fe2bf')
            .attr('width', '20px')
            .attr("x", function(d) { return xScale(d) + 60; })
            .attr('y', function(countryKey) {
                return yScale(deathsByCountry[countryKey].deaths_min);
            })
            .attr('height', function(countryKey) {
                return height - yScale(deathsByCountry[countryKey].deaths_min) ;
            });
        
        point.enter().append('rect')
            .attr('class', 'bar')
            .attr('r', 3.5)
            .attr('fill', '#fd5281')
            .attr('width', '20px')
            .attr("x", function(d) { return xScale(d) + 60; })
            .attr('y', function(countryKey) {
                return yScale(deathsByCountry[countryKey].deaths_max);
            })
            .attr('height', function(countryKey) {
                return height - yScale(deathsByCountry[countryKey].deaths_max - deathsByCountry[countryKey].deaths_min) ;
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
        
        var color = d3.scale.ordinal()
            .range(["#2fe2bf", "#fd5281"])
            .domain(["Minimum total deaths", "Maximum total deaths"]);
        
        var legend = barChart.selectAll(".legend")
              .data(color.domain().slice().reverse())
            .enter().append("g")
              .attr("class", "legend")
              .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

          legend.append("rect")
              .attr("x", width - 18)
              .attr("width", 18)
              .attr("height", 18)
              .style("fill", color);

          legend.append("text")
              .attr("x", width - 24)
              .attr("y", 9)
              .attr("dy", ".35em")
              .style("text-anchor", "end")
              .text(function(d) { return d; });
    }
});


module.exports = BarChart;
