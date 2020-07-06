import React from 'react';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import ContentView from './home/HomePageContent';

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