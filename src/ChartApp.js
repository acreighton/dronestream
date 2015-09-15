import React, { Component } from 'react';
import BarChart from './BarChart';
import Navigation from './Navigation';

global.$ = require('jquery');

var ChartApp = React.createClass({
    getInitialState: function() {
        return {
            currentView: "BarChart"
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
                <BarChart strikeData={this.state.strikes} />
            </div>
        );
    }
});

module.exports = ChartApp;
