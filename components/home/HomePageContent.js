import React, { Component } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text, Image } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polyline } from 'react-native-maps';
import BottomNavigation from './BottomNavigation';

const HEIGHT = Dimensions.get('window').height;

export default class ContentView extends Component {
    constructor(props) {
        super(props);
        this.mapRef = undefined;
        this.state = {
            expanded: true,
            viewHeight: new Animated.Value(HEIGHT * 0.46),
            coordinate: {
                date: '2020/07/08 11:30',
                latitude: 24.9844926, longitude: 121.3401801
            },
            accidentMarker: undefined,
            historicalMarker: undefined,
            region: undefined
        }
    }

    toggle = () => {
        this.setState({
            expanded: !this.state.expanded
        });

        Animated.parallel([
            Animated.timing(this.state.viewHeight, {
                toValue: HEIGHT * (this.state.expanded ? 0.46 : 0.15),
                duration: 500
            })
        ]).start();
    }

    locateAccidentalPosition = (data) => {
        const { location } = data;
        this.setState({
            accidentMarker: (
                <Marker coordinate={location}>
                    <Text style={styles.markerText}>
                        {data.date + '\n' + location.address + '\n'}
                        <Text style={{ color: 'red' }}>{data.type}</Text>
                    </Text>
                    <Image source={require('../../assets/accident-marker.png')}
                        style={styles.markerIcon} />
                </Marker>
            ),
            region: {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }
        });
    }

    locateHistoricalLocation = (locations) => {
        if (!locations) return;

        this.setState({
            historicalMarker: locations.map((location, i) => (
                <Marker coordinate={location}>
                    <Text style={styles.markerText}>{i + 1}</Text>
                    <Image source={require('../../assets/historical-marker.png')}
                        style={styles.markerIcon} />
                </Marker>
            )).concat([
                <Polyline
                    coordinates={locations}
                    strokeColor='#7F0000'
                    strokeWidth={3}
                />
            ]),
            region: {
                latitude: locations[0].latitude,
                longitude: locations[0].longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }
        });
    }

    componentDidMount() {
        this.mapRef.setMapBoundaries({
            latitude: 25.57144206466311,
            longitude: 118.5884760904839
        }, {
            latitude: 21.437573393627737,
            longitude: 121.5634772598658
        });
    }

    render() {
        const coord = this.state.coordinate;

        return (
            <Animated.View>
                <NavigationContainer>
                    <View style={styles.container}>
                        <Animated.View
                            style={{
                                backgroundColor: 'white',
                                height: this.state.viewHeight
                            }}
                        >
                            <MapView
                                ref={(ref) => this.mapRef = ref}
                                provider={PROVIDER_GOOGLE}
                                style={styles.mapContainer}
                                minZoomLevel={7}
                                region={this.state.region || {
                                    latitude: this.state.coordinate.latitude,
                                    longitude: this.state.coordinate.longitude,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01
                                }}
                                onLayout={() => this.marker.showCallout()}
                                onPress={() => this.marker.showCallout()}
                            >
                                <Marker coordinate={coord} ref={(marker) => this.marker = marker}>
                                    <Callout alphaHitTest={true}>
                                        <Text>{coord.date}</Text>
                                    </Callout>
                                </Marker>
                                {this.state.accidentMarker}
                                {this.state.historicalMarker}
                            </MapView>
                        </Animated.View>
                        <BottomNavigation
                            toggle={this.toggle}
                            locateAccidental={this.locateAccidentalPosition}
                            locateHistorical={this.locateHistoricalLocation}
                        />
                    </View>
                </NavigationContainer>
            </Animated.View>
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
        margin: 15,
        borderRadius: 10
    },
    markerIcon: {
        width: 36,
        height: 36,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    markerText: {
        textAlign: 'center',
        backgroundColor: 'white',
        fontWeight: 'bold',
        marginBottom: 5,
        padding: 10
    }
})