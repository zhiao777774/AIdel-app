import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polygon, Polyline, Callout } from 'react-native-maps';
import screenStyle from './screenStyles'

const markers = [];

export default class MapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coordinates: [
                { i: 0, time: '2020/07/06 10:00', latitude: 24.9844926, longitude: 121.3401801, visible: true },
                { i: 1, time: '2020/07/06 10:05', latitude: 24.9844926, longitude: 121.3, visible: true },
                { i: 2, time: '2020/07/06 10:10', latitude: 24.9844926, longitude: 121.2401801, visible: true },
            ]
        }
    }

    renderMarkers = () => {
        const coords = this.state.coordinates;
        return coords.map((coord) =>
            (
                <CusMarker
                    key={coord.i}
                    coordinate={coord}
                    calloutVisible={coord.visible} />
            )
        );
    }

    changeVisible = () => {
        this.setState({
            coordinates: this.state.coordinates.map(({ i, latitude, longitude, time, visible }) => {
                const newVisible = !visible;
                return {
                    i,
                    latitude,
                    longitude,
                    time,
                    visible: newVisible
                };
            })
        })
    }

    render() {
        const coords = this.state.coordinates;
        return (
            <View style={screenStyle.screen}>
                <MapView
                    ref='map'
                    provider={PROVIDER_GOOGLE}
                    style={styles.container}
                    region={{
                        latitude: coords[0].latitude,
                        longitude: coords[0].longitude,
                        latitudeDelta: 0.09,
                        longitudeDelta: 0.09
                    }}
                    onLayout={() => {
                        markers.forEach((marker) => {
                            console.log(marker);
                            marker.showCallout();
                        });
                    }}
                >
                    {this.renderMarkers()}
                    <Polyline
                        coordinates={[
                            coords[0], coords[1]
                        ]}
                        strokeColor="#000" // fallback for when strokeColors is not supported by the map-provider
                        strokeColors={[
                            '#7F0000',
                            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                            '#B24112',
                            '#E5845C',
                            '#238C23',
                            '#7F0000'
                        ]}
                        strokeWidth={6}
                    />
                </MapView>
                <Button title="toggle" onPress={() => {
                    //markers[0].showCallout();
                    //markers[1].showCallout();
                }} />
            </View>

        );
    }
};


class CusMarker extends React.Component {
    marker

    render() {
        return (
            <Marker {...this.props} ref={_marker => { markers[this.props.coordinate.i] = _marker }}>
                <Callout>
                    <Text>{this.props.coordinate.time}</Text>
                </Callout>
            </Marker>
        )
    }

    componentDidUpdate() {
        this.updateCallout();
    }

    updateCallout = () => {
        const { i } = this.props.coordinate;
        if (this.props.calloutVisible) {
            markers[i].showCallout();
        } else {
            markers[i].hideCallout();
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
        marginBottom: -10
    },
});
