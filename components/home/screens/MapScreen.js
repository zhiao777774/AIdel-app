import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polygon, Polyline, Callout } from 'react-native-maps';
import screenStyle from './screenStyles';

const markers = [];

export default class MapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
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
                <CustomizeMarker
                    key={coord.i}
                    coordinate={coord}
                    calloutVisible={coord.visible} />
            )
        );
    }

    toggleCalloutVisible = () => {
        this.setState({
            coordinates: this.state.coordinates.map((coord) => {
                const { i, latitude, longitude, time, visible } = coord;
                return {
                    i, latitude, longitude, time, 
                    visible: !visible
                };
            })
        })
    }

    render() {
        const coords = this.state.coordinates;
        return (
            <View style={screenStyle.screen}>
                <View style={{ flexDirection: 'row', 
                    marginTop: 0, marginBottom: 0,
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    <Text style={{marginTop: 8, marginRight: 10, fontWeight: 'bold'}}>顯示時間</Text>
                    <Switch value={this.state.isOpen} onValueChange={(v) => {
                        this.setState({ isOpen: v });
                        this.toggleCalloutVisible();
                    }} />
                </View>
                <MapView
                    ref='map'
                    provider={PROVIDER_GOOGLE}
                    style={styles.container}
                    region={{
                        latitude: coords[0].latitude,
                        longitude: coords[0].longitude,
                        latitudeDelta: 0.06,
                        longitudeDelta: 0.06
                    }}
                    onLayout={() => {
                        markers.forEach((marker) => {
                            marker.showCallout();
                        });
                    }}
                    onPress={() => {
                        markers.forEach((marker) => {
                            marker.showCallout();
                        });
                    }}
                >
                    {this.renderMarkers()}
                    <Polyline
                        coordinates={coords}
                        strokeColors={[
                            '#7F0000',
                            '#00000000',
                            '#B24112',
                            '#E5845C',
                            '#238C23',
                            '#7F0000'
                        ]}
                        strokeWidth={6}
                    />
                </MapView>
            </View>
        );
    }
};


class CustomizeMarker extends React.Component {
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
        marginBottom: 2
    },
});