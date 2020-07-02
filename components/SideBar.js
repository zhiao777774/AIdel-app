import React from 'react';
import SideMenu from 'react-native-side-menu'
import Menu from './Menu.js'
import ContentView from './HomePageContent.js'

export default class SideBar extends React.Component {
    render() {
        const menu = <Menu navigation={this.props.navigation} />;

        return (
            <SideMenu menu={menu}>
                <ContentView />
            </SideMenu>
        );
    }
}