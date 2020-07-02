import React, { Component } from 'react';
import {
    StyleSheet
    , Text
    , View
    , ImageBackground
    , Image
    , TextInput
    , Dimensions
    , TouchableOpacity
} from 'react-native';
import 'react-native-gesture-handler';
import { StackActions, NavigationActions } from 'react-navigation';
import bgImage from '../assets/background.jpg';

const { width: WIDTH } = Dimensions.get('window')

export default class AddDevice extends Component {

    render() {
        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                <View>
                    <TouchableOpacity style={styles.buttonAddDevice} onPress={() => {
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'Home' })],
                        });
                        this.props.navigation.dispatch(resetAction);
                        //dispatch 清空stack
                    }}>
                        <Text style={styles.AddDeviceText}> Add Deivce </Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
    },
    AddDeviceText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        textAlign: 'center'
    },
    buttonAddDevice: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#434577',
        justifyContent: 'center',
        marginTop: 20,
    },
});