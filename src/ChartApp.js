import React, { Component } from 'react';
import BarChart from './BarChart';
import WorldMap from './WorldMap';
import Navigation from './Navigation';

global.$ = require('jquery');

require('./sass/style.scss');

var ChartApp = React.createClass({
    getInitialState: function() {
        return {
            strikes: null,
            currentView: null
        }
    },
    componentDidMount: function() {
        var $loading = $('.fa.fa-spinner').hide(),
            self = this;
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
                this.setState({strikes: data.strike, currentView: 'BarChart'});
            }
        });
        
        $(document).on('currentView', function(e, data) {
            self.setState({currentView: data});
        });
    },
    render: function() {
        return (
            <div>
                <Navigation currentView={this.state.currentView}/>
                {this.state.currentView == 'BarChart' ? <BarChart strikeData={this.state.strikes} /> : null}
                {this.state.currentView == 'WorldMap' ? <WorldMap strikeData={this.state.strikes} /> : null}
            </div>
        );
    }
});

module.exports = ChartApp;
