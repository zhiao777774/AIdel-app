import React, { Component } from 'react';
import SideMenu from 'react-native-side-menu';
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
import bgImage from './assets/background.jpg';

const { width: WIDTH } = Dimensions.get('window')

export default class AddDevice extends Component {
    static navigationOptions = {
        title: 'Add Device',
    };


    render() {

        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                <View>
                    <TouchableOpacity style={styles.buttonAddDevice} >
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