import React, { Component } from 'react';
import Button from './Button';

var Navigation = React.createClass({
    render: function() {
        return (
            <nav onClick={this.onClick}>
                <Button name="BarChart" displayName="Deaths by Country" current={this.props.currentView == "BarChart"} />
                <Button name="WorldMap" displayName="Strike locations by Year" current={this.props.currentView == "WorldMap"} />
            </nav>
        );
    }
});

module.exports = Navigation;
