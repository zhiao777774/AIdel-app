import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
//import MapView from 'react-native-maps';
import BottomNavigation from './BottomNavigation';

export default class ContentView extends Component {
    toggleOpen = () => { }

    render() {
        return (
            <NavigationContainer>
                <View style={styles.container}>
                    <View style={{ height: '60%', backgroundColor: 'white' }}>
                        {/*
                            <MapView style={{ flex: 1 }}
                                region={{
                                    latitude: 37.78825,
                                    longitude: -122.4324,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421
                                }} 
                            />
                        */}
                    </View>
                    <BottomNavigation />
                </View>
            </NavigationContainer>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        height: '100%',
        borderStyle: 'solid',
        borderColor: 'lightgray',
        borderLeftWidth: .5,
    }
})