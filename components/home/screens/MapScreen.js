import React from 'react';
import { StyleSheet, Text, View, Switch, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import MapView from 'react-native-map-clustering';
import { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import screenStyle from './screenStyles';

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
                    latitude: 24.9994926, longitude: 121.2401801, showDate: false
                },
                {
                    number: 3, date: '2020/07/08 10:30',
                    latitude: 24.974926, longitude: 121.244, showDate: false
                },
                {
                    number: 4, date: '2020/07/08 10:40',
                    latitude: 24.934005, longitude: 121.2631801, showDate: false
                },
                {
                    number: 5, date: '2020/07/08 10:50',
                    latitude: 24.8844926, longitude: 121.3600801, showDate: false
                },
                {
                    number: 6, date: '2020/07/08 11:00',
                    latitude: 25, longitude: 121.4401801, showDate: false
                },
                {
                    number: 7, date: '2020/07/08 11:10',
                    latitude: 25.0058, longitude: 121.4741801, showDate: false
                },
                {
                    number: 8, date: '2020/07/08 11:20',
                    latitude: 25.05, longitude: 121.4951801, showDate: false
                },
                {
                    number: 9, date: '2020/07/08 11:30',
                    latitude: 25.09, longitude: 121.5051801, showDate: false
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
                            {
                                marginTop: 0,
                                marginBottom: 0,
                                marginLeft: showDate ? 'auto' : 0,
                                marginRight: showDate ? 'auto' : 0
                            }
                        ]} />
                    </Marker>
                );
            });
    }

    toggleMarkerShowDate = () => {
        this.setState({
            coordinates: this.state.coordinates.map((coord) => {
                return Object.assign({}, coord,
                    { showDate: !coord.showDate });
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
                <View style={styles.toolBarContainer}>
                    <Text style={{ marginTop: 8, marginRight: 5, fontWeight: 'bold' }}>顯示時間</Text>
                    <Switch value={this.state.showDate} onValueChange={(v) => {
                        this.setState({ showDate: v });
                        this.toggleMarkerShowDate();
                    }} />
                    <ModalDropdown
                        options={['全部時間'].concat(coords.map(({ date }) => date))}
                        defaultValue='選擇日期'
                        defaultIndex={0}
                        style={styles.dropdown}
                        textStyle={styles.textStyle}
                        dropdownTextStyle={styles.dropdownTextStyle}
                        dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
                        onSelect={(i) => {
                            i = Number(i);
                            this.setState({
                                mapRegion: i !== 0 ? {
                                    latitude: coords[i - 1].latitude,
                                    longitude: coords[i - 1].longitude,
                                    latitudeDelta: 0.05,
                                    longitudeDelta: 0.05
                                } : {
                                        latitude: coords[0].latitude,
                                        longitude: coords[0].longitude,
                                        latitudeDelta: 0.4,
                                        longitudeDelta: 0.4
                                    }
                            });
                        }} />
                </View>
                <MapView
                    mapRef={(ref) => this.mapRef = ref}
                    provider={PROVIDER_GOOGLE}
                    style={styles.mapContainer}
                    minZoomLevel={7}
                    initialRegion={{
                        latitude: coords[0].latitude,
                        longitude: coords[0].longitude,
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.5
                    }}
                    region={this.state.mapRegion}
                >
                    {this.renderMarkers()}
                    <Polyline
                        coordinates={coords}
                        strokeColor='#7F0000'
                        strokeWidth={3}
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
    mapContainer: {
        flex: 1,
        margin: 15,
        marginBottom: 2,
        borderRadius: 10
    },
    toolBarContainer: {
        flexDirection: 'row',
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    dropdown: {
        alignSelf: 'flex-end',
        width: 150,
        borderWidth: 0,
        borderRadius: 3,
        backgroundColor: 'cornflowerblue',
        marginLeft: 20,
        marginTop: -2
    },
    textStyle: {
        marginVertical: 10,
        marginHorizontal: 6,
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    dropdownTextStyle: {
        marginVertical: 5,
        marginHorizontal: 6,
        fontSize: 15,
        color: 'gray',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    dropdownTextHighlightStyle: {
        fontSize: 15,
        backgroundColor: '#fff',
        color: '#000'
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