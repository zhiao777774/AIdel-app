import React from 'react';
import PropTypes from 'prop-types';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';


const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        height: window.height,
        backgroundColor: '#C4E1E1',
        padding: 30
    },
    avatarContainer: {
        marginBottom: 30,
        marginTop: 50,
    },
    avatarContainer2: {
        marginBottom: 30,
        marginTop: 30,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingBottom: 6
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        flex: 1,
    },
    avatar2: {
        paddingTop: 5
    },
    name: {
        position: 'absolute',
        left: 70,
        top: 20,
    },
    item: {
        fontSize: 14,
        fontWeight: '500',
        paddingTop: 5,
        position: 'absolute',
        top: 2,
        left: 25
    }
});

export default class Menu extends React.Component {
    render() {
        return (
            <ScrollView scrollsToTop={false} style={styles.menu}>
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatar} source={{ uri }} />
                    <Text style={styles.name}>Jason</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'AddDevice' })],
                    });
                    this.props.navigation.dispatch(resetAction);
                }}>
                    <View style={styles.avatarContainer2}>
                        <Octicons name={'device-mobile'} size={20} />
                        <Text
                            onPress={() => console.log('Devices')}
                            style={[styles.item, { left: 20 }]}
                        >
                            Devices
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.avatarContainer2}>
                    <Icon name={'help-with-circle'} size={20} />
                    <Text
                        onPress={() => console.log('Help')}
                        style={styles.item}
                    >
                        Help
                    </Text>
                </View>
                <View style={styles.avatarContainer2}>
                    <AntDesign name={'setting'} size={20} />
                    <Text
                        onPress={() => console.log('Setting')}
                        style={styles.item}
                    >
                        Setting
                    </Text>
                </View>

                <TouchableOpacity onPress={() => {
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'LogIn' })],
                    });
                    this.props.navigation.dispatch(resetAction);
                }}>
                    <View style={styles.avatarContainer2}>
                        <AntDesign name={'logout'} size={20} />
                        <Text
                            onPress={() => console.log('Logout')}
                            style={styles.item}
                        >
                            Logout
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView >
        );
    }
}

Menu.propTypes = {
    onItemSelected: PropTypes.func.isRequired,
};
