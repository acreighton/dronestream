import React, { Component } from 'react';
import ScatterPlot from './ScatterPlot';
import Navigation from './Navigation';

global.$ = require('jquery');

var ChartApp = React.createClass({
    getInitialState: function() {
        return {
            currentView: "ScatterPlot"
        }
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.source,
            dataType: "jsonp",
            context: this,
            success: function(data) {
                this.setState({strikes: data.strike});
            }
        });
    },
    render: function() {
        return (
            <div>
                <Navigation />
                <ScatterPlot strikeData={this.state.strikes} />
            </div>
        );
    }
});

module.exports = ChartApp;
