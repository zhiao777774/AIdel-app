import { Component } from 'react';
import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import LoginPage from './components/LogIn';
import SignUpPage from './components/signUp';
import AddDvicePage from './components/AddDevice';

export default class App extends Component {
    render() {
        return <AppContainer />;
    }
}

const AppNavigator = createStackNavigator({
    LogIn: { screen: LoginPage },
    SignUp: { screen: SignUpPage },
    AddDevice: { screen: AddDvicePage },
});
const AppContainer = createAppContainer(AppNavigator);