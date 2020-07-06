import React, { Component } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE, Callout, } from 'react-native-maps';
import BottomNavigation from './BottomNavigation';

const HEIGHT = Dimensions.get('window').height;

export default class ContentView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: true,
            viewHeight: new Animated.Value(HEIGHT * 0.5),
            coordinates: [
                { Location: '1', time: '2020/07/06 10:00', latitude: 24.9844926, longitude: 121.3401801 },
                { Location: '1', time: '2020/07/06 10:05', latitude: 24.9844926, longitude: 121.3 },
                { Location: '1', time: '2020/07/06 10:10', latitude: 24.9844926, longitude: 121.2401801 },
            ]
        }
    }

    toggle = () => {
        this.setState({
            expanded: !this.state.expanded
        });

        Animated.parallel([
            Animated.timing(this.state.viewHeight, {
                toValue: HEIGHT * (this.state.expanded ? 0.5 : 0.15),
                duration: 500
            }),
        ]).start();
    }

    render() {
        const coords = this.state.coordinates;
        return (
            <NavigationContainer>
                <View style={styles.container}>
                    <Animated.View
                        style={{
                            backgroundColor: 'white',
                            height: this.state.viewHeight
                        }}
                    >
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={styles.mapContainer}
                            region={{
                                latitude: coords[2].latitude,
                                longitude: coords[2].longitude,
                                latitudeDelta: 0.09,
                                longitudeDelta: 0.09
                            }}>
                            <Marker
                                coordinate={coords[2]}>
                                <Callout alphaHitTest={true}>
                                    <Text>{coords[2].time}</Text>
                                </Callout>

                            </Marker>
                        </MapView>

                    </Animated.View>
                    <BottomNavigation toggle={this.toggle} />
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
        borderLeftWidth: .5
    },
    mapContainer: {
        flex: 1,
        margin: 0
    }
})