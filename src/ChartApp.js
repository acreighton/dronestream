import React, { Component } from 'react';
import d3ScatterPlot from './d3ScatterPlot';

global.$ = require('jquery');

var ChartApp = React.createClass({
    componentDidMount: function() {
        $.ajax({
            url: this.props.source,
            dataType: "jsonp",
            context: this,
            success: function(data) {
                this.setState(data, d3ScatterPlot.render(data.strike));
            }
        });
    },
    render: function() {
        return (
            <div id="chart"></div>
        );
    }
});

module.exports = ChartApp;
