import React from 'react';
<<<<<<< HEAD
import { StyleSheet, Text, View, Switch, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polygon, Polyline, Callout, setMapBoundaries } from 'react-native-maps';
=======
import { StyleSheet, Text, View, Switch, Image } from 'react-native';
import MapView from 'react-native-map-clustering';
import { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
>>>>>>> 9bf5245f4b75d3ec9b7b7f5371e6aa22a545b7cb
import screenStyle from './screenStyles';
import ModalDropdown from 'react-native-modal-dropdown';

export default class MapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.mapRef = undefined;
        this.state = {
            showDate: false,
            coordinates: [
                {
                    number: 0, date: '2020/07/08 10:00',
                    latitude: 24.9844926, longitude: 121.3401801, showDate: false
                },
                {
                    number: 1, date: '2020/07/08 10:10',
                    latitude: 24.9844926, longitude: 121.3, showDate: false
                },
                {
                    number: 2, date: '2020/07/08 10:20',
                    latitude: 24.9844926, longitude: 121.2401801, showDate: false
                }
            ],
            mapRegion: undefined
        }
    }

    /*renderMarkers = () => {
        return this.state.coordinates
            .map((coord) => <CustomizeMarker {...coord} key={coord.number} />);
    }*/

    renderMarkers = () => {
        return this.state.coordinates
            .map((coord) => {
                const { number, date, showDate, latitude, longitude } = coord;
                return (
                    <Marker key={number} coordinate={{ latitude, longitude }}>
                        <Text style={styles.markerText}>
                            {showDate ? date : number + 1}
                        </Text>
                        <Image source={require('../../../assets/marker.png')} style={[
                            styles.markerIcon,
                            { marginLeft: showDate ? 38 : 0 }
                        ]} />
                    </Marker>
                );
            });
    }

    toggleMarkerShowDate = () => {
        this.setState({
            coordinates: this.state.coordinates.map((coord) => {
<<<<<<< HEAD
                const { i, latitude, longitude, time, visible } = coord;
                return {
                    i, latitude, longitude, time,
                    visible: !visible
                };
=======
                return Object.assign({}, coord,
                    { showDate: !coord.showDate });
>>>>>>> 9bf5245f4b75d3ec9b7b7f5371e6aa22a545b7cb
            })
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
        const coords = this.state.coordinates;
        return (
            <View style={screenStyle.screen}>
<<<<<<< HEAD
                <View style={{
                    flexDirection: 'row',
                    marginTop: 0, marginBottom: 0,
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    <Text style={{ marginTop: 8, marginRight: 10, fontWeight: 'bold' }}>顯示時間</Text>
                    <Switch value={this.state.isOpen} onValueChange={(v) => {
                        this.setState({ isOpen: v });
                        this.toggleCalloutVisible();
=======
                <View style={styles.toolBarContainer}>
                    <Text style={{ marginTop: 8, marginRight: 10, fontWeight: 'bold' }}>顯示時間</Text>
                    <Switch value={this.state.showDate} onValueChange={(v) => {
                        this.setState({ showDate: v });
                        this.toggleMarkerShowDate();
>>>>>>> 9bf5245f4b75d3ec9b7b7f5371e6aa22a545b7cb
                    }} />
                    
                </View>
                <MapView
                    mapRef={(ref) => this.mapRef = ref}
                    provider={PROVIDER_GOOGLE}
                    style={styles.container}
<<<<<<< HEAD
=======
                    minZoomLevel={7}
>>>>>>> 9bf5245f4b75d3ec9b7b7f5371e6aa22a545b7cb
                    initialRegion={{
                        latitude: coords[0].latitude,
                        longitude: coords[0].longitude,
                        latitudeDelta: 0.9,
                        longitudeDelta: 0.9
<<<<<<< HEAD
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
                    zoomEnabled={true}
                    scrollEnabled={true}
                    minZoomLevel={6}
=======
                    }}
                    region={this.state.mapRegion}
>>>>>>> 9bf5245f4b75d3ec9b7b7f5371e6aa22a545b7cb
                >
                    {this.renderMarkers()}
                    <Polyline
                        coordinates={coords}
<<<<<<< HEAD
                        strokeColors={[
                            '#7F0000',
                        ]}
                        strokeWidth={5}
=======
                        strokeColor='#7F0000'
                        strokeWidth={3}
>>>>>>> 9bf5245f4b75d3ec9b7b7f5371e6aa22a545b7cb
                    />
                </MapView>
            </View>
        );
    }
};

class CustomizeMarker extends React.Component {
    marker;

    render() {
        const { number, date, showDate, latitude, longitude } = this.props;
        return (
            <Marker coordinate={{ latitude, longitude }} ref={_marker => { this.marker = _marker }}>
                <Text style={styles.markerText}>
                    {showDate ? date : number + 1}
                </Text>
                <Image source={require('../../../assets/marker.png')} style={[
                    styles.markerIcon,
                    { marginLeft: showDate ? 38 : 0 }
                ]} />
            </Marker>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
        marginBottom: 2,
    },
    toolBarContainer: {
        flexDirection: 'row',
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    dropdown: {

    },
    markerIcon: {
        width: 50,
        height: 50
    },
    markerText: {
        textAlign: 'center',
        backgroundColor: 'white',
        fontWeight: 'bold',
        marginBottom: 5
    }
});