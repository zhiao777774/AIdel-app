import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import screenStyle from './screenStyles'

export default class MapScreen extends React.Component {
    render() {
        return (
            <View style={screenStyle.screen}>
                <MapView style={styles.container}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                />
            </View>

        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
});
