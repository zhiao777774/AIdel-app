import React, { Component } from 'react';
import {
    StyleSheet
    , Text
    , View
    , ImageBackground
    , TextInput
    , Dimensions
    , TouchableOpacity,
    Alert
} from 'react-native';
import 'react-native-gesture-handler';
import bgImage from '../assets/background.jpg'
import Icon from 'react-native-vector-icons/Ionicons'
import { UserInfoContext } from './signUp'

const { width: WIDTH } = Dimensions.get('window')

export default class LoginPage extends Component {
    static navigationOptions = {
        title: '登入'
    };

    constructor(props) {
        super(props);
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

    /* getSignUpdata = () => {
        <UserInfoContext.Consumer>
            {({ usersignupdata }) => {
                this.setState({})
            }}
        </UserInfoContext.Consumer>
    } */

    render() {
        const { navigate } = this.props.navigation;
        const data = this.props.navigation.state.params;
        return (
            <View style={{ backgroundColor: 'white', height: '100%' }}>
                <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                    <View style={[styles.inputContainer, { marginTop: 520 }]}>
                        <Icon name={'ios-person'} size={28} color='rgba(255,255,255,0.7)'
                            style={styles.usericon} />
                        <TextInput
                            style={styles.input}
                            placeholder={'帳號'}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent'
                            onChangeText={(input) => this.setState({ loginname: input })}
                        />
                    </View>
                    <View style={[styles.inputContainer]}>
                        <Icon name={'ios-lock'} size={28} color='rgba(255,255,255,0.7)'
                            style={styles.usericon} />
                        <TextInput
                            style={styles.input}
                            placeholder={'密碼'}
                            secureTextEntry={this.state.showPass}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent'
                            onChangeText={(input) => this.setState({ loginpwd: input })}
                        />
                        <TouchableOpacity style={styles.buttonEye} onPress={this.showPass.bind(this)}>
                            <Icon name={this.state.showPass == false ? 'ios-eye' : 'ios-eye-off'}
                                size={26} color={'rgba(255,255,255,0.7)'} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.buttonLogin} onPress={() => {
                        if (this.state.loginname != data.account) {
                            Alert.alert('錯誤訊息', '帳號輸入錯誤', [
                                { text: '重新輸入' }
                            ])
                        }
                        else if (this.state.loginpwd != data.password) {
                            Alert.alert('錯誤訊息', '密碼輸入錯誤', [
                                { text: '重新輸入' }
                            ])
                        }
                        else {
                            navigate('AddDevice')
                        }
                    }}>
                        <Text style={styles.text}>登入</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('SignUp')}>
                        <Text style={styles.singUp}>註冊</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
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
        marginTop: -70,
        marginBottom: 30,
        marginLeft: 0,
        marginRight: 0
    },
    input: {
        width: WIDTH - 100,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,.4)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
        paddingLeft: 30
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
        width: WIDTH - 100,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#434577',
        justifyContent: 'center',
        marginTop: 10
    },
    text: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        textAlign: 'center'
    },
    singUp: {
        color: '#DAA520',
        fontSize: 14,
        textAlign: 'center',
        left: 125,
        marginTop: 8
    }
});

