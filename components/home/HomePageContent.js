import React, { Component } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import BottomNavigation from './BottomNavigation';

const HEIGHT = Dimensions.get('window').height;

export default class ContentView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: true,
            viewHeight: new Animated.Value(HEIGHT * 0.5),
            coordinate: {
                i: 0,
                time: '2020/07/06 10:10',
                latitude: 24.9844926,
                longitude: 121.2401801
            }
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
        const coord = this.state.coordinate;

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
                                latitude: coord.latitude,
                                longitude: coord.longitude,
                                latitudeDelta: 0.09,
                                longitudeDelta: 0.09
                            }}
                            onLayout={() => this.marker.showCallout()}
                            onPress={() => this.marker.showCallout()}
                        >
                            <Marker coordinate={coord} ref={(marker) => this.marker = marker}>
                                <Callout alphaHitTest={true}>
                                    <Text>{coord.time}</Text>
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
        margin: 15
    }
})