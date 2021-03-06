import React, { Component } from 'react';

var Button = React.createClass({
    getInitialState: function() {
        return {
            name: this.props.name,
        };
    },
    onClick: function(e) {
        var self = this;
        
        e.preventDefault();
        this.setState({current: true});
        
        $(document).trigger('currentView', [self.props.name]);
    },
    render: function() {
        return (
            /*jshint ignore:start */
            <button onClick={this.onClick} className={this.props.current ? 'btn btn-primary' : 'btn'}>{this.props.displayName}</button>
            /*jshint ignore:end */
        );
    }
});

module.exports = Button;
