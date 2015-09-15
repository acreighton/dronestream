import React, { Component } from 'react';
import BarChart from './BarChart';
import WorldMap from './WorldMap';
import Navigation from './Navigation';

global.$ = require('jquery');

var ChartApp = React.createClass({
    getInitialState: function() {
        return {
            currentView: "BarChart"
        }
    },
    componentDidMount: function() {
        var $loading = $('.fa.fa-spinner').hide();
        $(document)
            .ajaxStart(function () {
                $loading.show();
            })
            .ajaxStop(function () {
                $loading.hide();
            });
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
                <WorldMap strikeData={this.state.strikes} />
            </div>
        );
    }
});

module.exports = ChartApp;
