import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';
import LoginPage from './components/LogIn';
import SingUpPage from './components/signUp';
import AddDvicePage from './components/AddDevice';
import HomePage from './components/home/HomePage';
import './api/db-handler';
import FCM from './api/accident-fcm';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.fcm = new FCM();
        this.fcm.enable();
    }

    componentWillUnmount() {
        this.fcm.destroy();
    }

    render() {
        return (<AppContainer />);
    }
}

const AppNavigator = createStackNavigator({
    LogIn: { screen: LoginPage },
    SignUp: { screen: SingUpPage },
    AddDevice: { screen: AddDvicePage },
    Home: { screen: HomePage }
});
const AppContainer = createAppContainer(AppNavigator);