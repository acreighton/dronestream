import React, { Component } from 'react';
import Button from './Button';

var Navigation = React.createClass({
    getInitialState: function() {
        return {
            current: 'ScatterPlot'
        };
    },
    onClick: function(e) {
        // console.log(e);
    },
    render: function() {
        return (
            <nav onClick={this.onClick}>
                <Button name="ScatterPlot" displayName="Scatter Plot" />
                <Button name="HeatMap" displayName="Heat Map" />
            </nav>
        );
    }
});

module.exports = Navigation;
