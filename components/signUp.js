import React, { Component, createContext } from 'react';
import {
    StyleSheet
    , Text
    , View
    , ImageBackground
    , TextInput
    , Dimensions
    , TouchableOpacity
    , TouchableNativeFeedbackBase
    , Alert
} from 'react-native';
import bgImage from '../assets/background.jpg';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackActions, NavigationActions } from 'react-navigation';

const { width: WIDTH } = Dimensions.get('window');

export const UserInfoContext = createContext()
export default class SignUpPage extends Component {
    static navigationOptions = {
        title: '註冊'
    };

    constructor(props) {
        super(props);
        this.state = {
            showPass: true,
            press: false,
            usersignupdata: [
                {
                    account: '06130106',
                    password: 'paul0188'
                },
                {
                    account: '06131722',
                    password: '06131722'
                }
            ]
        }
    }

    showPass = () => {
        if (this.state.press == false) {
            this.setState({ showPass: false, press: true })
        } else {
            this.setState({ showPass: true, press: false })
        }
    }
    SignupToLoginPage() {
        const navigation = this.props.navigation;

        this.setState({
            usersignupdata: this.state.usersignupdata.concat([{
                account: this.state.username,
                password: this.state.userpwd
            }])
        });//新增不了物件，但有讀到name和pwd

        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                routeName: 'LogIn',
                params: {
                    account: this.state.username,
                    password: this.state.userpwd
                }
            })],
        });
        navigation.dispatch(resetAction);

        /* return (
            <UserInfoContext.Provider value={this.state.usersignupdata} />
        ); */
    }

    render() {
        return (
            <View style={{ backgroundColor: 'white', height: '100%' }}>
                <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                    <View style={[styles.inputContainer, { marginTop: 450 }]}>
                        <Icon name={'ios-person'} size={28} color='rgba(255,255,255,0.7)'
                            style={styles.usericon} />
                        <TextInput
                            style={styles.input}
                            placeholder={'帳號'}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent'
                            onChangeText={(input) => this.setState({ username: input })}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name={'ios-lock'} size={28} color='rgba(255,255,255,0.7)'
                            style={styles.usericon} />
                        <TextInput
                            style={styles.input}
                            placeholder={'密碼'}
                            secureTextEntry={this.state.showPass}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent'
                            onChangeText={(input) => this.setState({ userpwd: input })}
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
                            placeholder={'確認密碼'}
                            secureTextEntry={this.state.showPass}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent'
                            onChangeText={(input) => {
                                if (input != this.state.userpwd) {
                                    Alert.alert('提示', '密碼錯誤', [
                                        {
                                            text: '重新輸入'
                                        }
                                    ]);
                                }
                            }}
                        />
                        <TouchableOpacity style={styles.buttonEye} onPress={this.showPass.bind(this)}>
                            <Icon name={this.state.showPass == false ? 'ios-eye' : 'ios-eye-off'}
                                size={26} color={'rgba(255,255,255,0.7)'} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.buttonLogin} onPress={() => { this.SignupToLoginPage() }}>
                        <Text style={styles.text}>註冊</Text>
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
        fontSize: 12,
        textAlign: 'center',
        left: 125,
        marginTop: 8
    }
});