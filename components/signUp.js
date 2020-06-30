import React, { Component } from 'react';
import LoginPage from '../App'
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

const { width: WIDTH } = Dimensions.get('window')
import bgImage from './assets/background.jpg'
import logo from './assets/icon.png'
import Icon from 'react-native-vector-icons/Ionicons'

export default class SignUpPage extends Component {
    constructor() {
        super()
        this.state = {
            showPass: true,
            press: false
        }
    }

    showPass = () => {
        if (this.state.press == false) {
            this.setState({ showPass: false, press: true })
        } else {
            this.setState({ showPass: true, press: false })
        }
    }

    render() {
        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.sloganText}>Leading the way , we need </Text>
                    <Text style={styles.sloganText}> AIdel </Text>
                </View>

                <View style={styles.inputContainer}>
                    <Icon name={'ios-person'} size={28} color='rgba(255,255,255,0.7)'
                        style={styles.usericon} />
                    <TextInput
                        style={styles.input}
                        placeholder={'Enter your Name'}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent'
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon name={'ios-lock'} size={28} color='rgba(255,255,255,0.7)'
                        style={styles.usericon} />
                    <TextInput
                        style={styles.input}
                        placeholder={'Password'}
                        secureTextEntry={this.state.showPass}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent'
                    />
                    <TouchableOpacity style={styles.buttonEye} onPress={this.showPass.bind(this)}>
                        <Icon name={this.state.showPass == false ? 'ios-eye' : 'ios-eye-off'}
                            size={26} color={'rgba(255,255,255,0.7)'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <Icon name={'ios-lock'} size={28} color='rgba(255,255,255,0.7)'
                        style={styles.usericon} />
                    <TextInput
                        style={styles.input}
                        placeholder={'Confrim your Password'}
                        secureTextEntry={this.state.showPass}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent'
                    />
                    <TouchableOpacity style={styles.buttonEye} onPress={this.showPass.bind(this)}>
                        <Icon name={this.state.showPass == false ? 'ios-eye' : 'ios-eye-off'}
                            size={26} color={'rgba(255,255,255,0.7)'} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.buttonLogin}>
                    <Text style={styles.text}>Send</Text>
                </TouchableOpacity>

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
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50

    },
    logo: {
        width: 120,
        height: 120,
    },
    sloganText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
        marginTop: 10,
        opacity: 0.5
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25
    },
    usericon: {
        position: 'absolute',
        top: 8,
        left: 37
    },
    inputContainer: {
        marginTop: 10
    },
    buttonEye: {
        position: 'absolute',
        top: 8,
        right: 37
    },
    buttonLogin: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#434577',
        justifyContent: 'center',
        marginTop: 20
    },
    text: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        textAlign: 'center'
    },
    signUp: {
        color: '#DAA520',
        fontSize: 12,
        textAlign: 'center',
        left: 125,
        marginTop: 15
    }
});