import React, { Component } from 'react';

var Button = React.createClass({
    getInitialState: function() {
        return {
            name: this.props.name,
            current: false
        }
    },
    onClick: function(e) {
        e.preventDefault();
        this.setState({current: true});
        
        // $(this).trigger('currentView', this.props.name);
        // this.setState
    },
    render: function() {
        return (
            <button onClick={this.onClick} className="btn">{this.props.displayName}</button>
        );
    }
});

module.exports = Button;
