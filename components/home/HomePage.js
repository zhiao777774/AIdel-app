import React, { Component } from 'react';
import SideBar from '../SideBar';

export default class HomePage extends Component {
    static navigationOptions = {
        title: '主頁',
    };

    render() {
        return (
            <SideBar navigation={this.props.navigation} />
        );
    }
}