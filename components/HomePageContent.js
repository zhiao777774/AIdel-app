import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
//import MapView from 'react-native-maps';
import BottomNavigation from './BottomNavigation';

export default class ContentView extends Component {
    toggleOpen = () => { }

    render() {
        return (
            <View>
                <View style={styles.container}>
                {/*
                <MapView style={{ flex: 1 }}
                        region={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }} />
                */}
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