import { createStackNavigator } from 'react-navigation';
import LoginPage from '../App';
import SignUpPage from './signUp';

const AppNavigator = createStackNavigator({
    LogIn: { screen: LoginPage },
    SignUp: { screen: SignUpPage },
});