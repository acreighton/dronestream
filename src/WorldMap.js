import React, { Component } from 'react';
import d3 from 'd3';
import topojson from 'topojson';

var WorldMap = React.createClass({
    assignColors: (function() {
        var years = {2004: '',2005: '',2006: '',2007: '',2008: '',2009: '',2010: '',2011: '',2012: '',2013: '',2014: '',2015: ''};
        
        for (var i in years) {
            years[i] = '#'+Math.floor(Math.random()*16777215).toString(16);
        }
        
        return years;
    })(),
    drawMap: function() {
        if (!this.props.strikeData) {return;};
        
        var strikeData = this.props.strikeData,
            colors = this.assignColors,
            geoJson = require("json!./json/world.json"),
            width = 960,
            height = 580;
            
        var svg = d3.select('#map')
            .append('svg')
            .attr('width', width)
            .attr('height', height);
            
        var projection = d3.geo.equirectangular()
            .scale(800)
            .translate([-280, 550])
            .precision(.1);

        var path = d3.geo.path()
            .projection(projection);

        var graticule = d3.geo.graticule();
        
        svg.append("path")
            .datum(graticule)
            .attr("class", "graticule")
            .attr("d", path);
            
        svg.insert("path", ".graticule")
            .datum(topojson.feature(geoJson, geoJson.objects.land))
            .attr("class", "land")
            .attr("d", path);

        svg.insert("path", ".graticule")
            .datum(topojson.mesh(geoJson, geoJson.objects.countries, function(a, b) { return a !== b; }))
            .attr("class", "boundary")
            .attr("d", path);
          
        svg.selectAll('.pin')
            .data(strikeData)
            .enter().append('circle', '.pin')
            .attr('r', 1.5)
            .attr('class', 'strike')
            .attr('fill', function(d) {
                return colors[new Date(d.date).getFullYear()];
            })
            .attr('transform', function(d) {
                return 'translate(' + projection([
                    d.lon,
                    d.lat
                ]) + ')';
            });
            
        var legendColor = d3.scale.ordinal()
            .range(d3.values(colors))
            .domain(d3.keys(colors));
        
        var legend = svg.selectAll(".legend")
              .data(legendColor.domain().slice().reverse())
            .enter().append("g")
              .attr("class", "legend")
              .attr("transform", function(d, i) { return "translate(-40," + (i * 20 + 20) + ")"; });

          legend.append("rect")
              .attr("x", width - 18)
              .attr("width", 18)
              .attr("height", 18)
              .style("fill", legendColor);

          legend.append("text")
              .attr("x", width - 24)
              .attr("y", 9)
              .style("text-anchor", "end")
              .style("fill", "#fff")
              .text(function(d) { return d; });
        
    },
    componentDidMount: function() {
        this.drawMap();
    },
    render: function() {
        return (
            <div id="map"></div>
        );
    }
});

module.exports = WorldMap;
