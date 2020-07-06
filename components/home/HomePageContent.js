import React, { Component } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import MapView from 'react-native-maps';
import BottomNavigation from './BottomNavigation';

const HEIGHT = Dimensions.get('window').height;

export default class ContentView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: true,
            viewHeight: new Animated.Value(HEIGHT * 0.5),
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
        return (
            <NavigationContainer>
                <View style={styles.container}>
                    <Animated.View
                        style={{
                            backgroundColor: 'white',
                            height: this.state.viewHeight
                        }}
                    >
                        <MapView style={styles.mapContainer}
                            region={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421
                            }}
                        />
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
        margin: 30
    }
})