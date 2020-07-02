import React, { Component } from 'react';
import SideBar from './SideBar.js'

export default class HomePage extends Component {
    toggleOpen = () => { }

    render() {
        return (
            <SideBar navigation={this.props.navigation} />
        );
    }
}