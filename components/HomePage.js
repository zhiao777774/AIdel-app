import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import BottomNavigation from './BottomNavigation'

export default class HomePage extends Component {
    toggleOpen = () => { }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Text>Open up App.js to start working on your app!</Text>
                </View>
                <BottomNavigation />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '92%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});