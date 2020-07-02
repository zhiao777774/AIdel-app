import React from 'react';
import PropTypes from 'prop-types';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import bgImage from '../assets/device_background.jpg'

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        padding: 30
    },
    menuItem: {
        marginBottom: 30,
        marginTop: 15,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingBottom: 6,
        paddingLeft: 5
    },
    itemText: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingTop: 2,
        paddingLeft: 10,
        position: 'absolute',
        top: 2,
        left: 25
    },
    userContainer: {
        marginBottom: 30, 
        marginTop: 5, 
        backgroundColor: 'rgba(240, 230, 140, .8)',
        padding: 10,
        paddingLeft: 25,
        borderRadius: 15
    },
    userImage: {
        width: 60,
        height: 60,
        borderRadius: 24,
        flex: 1,
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        position: 'absolute',
        left: 110,
        top: 30,
    }
});

export default class Menu extends React.Component {
    render() {
        const data = this.props.navigation.state.params;
        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                <ScrollView scrollEnabled={false}>
                    <View style={styles.userContainer}>
                        <Image style={styles.userImage} source={{ uri: data.picture }} />
                        <Text style={styles.userName}>{data.userName}</Text>
                    </View>

                    <TouchableOpacity onPress={() => {
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'AddDevice' })],
                        });
                        this.props.navigation.dispatch(resetAction);
                    }}>
                        <View style={styles.menuItem}>
                            <Octicons name={'device-mobile'} size={20} />
                            <Text style={[styles.itemText, { left: 20 }]}>選擇設備</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.menuItem}>
                        <Icon name={'help-with-circle'} size={20} />
                        <Text style={styles.itemText}>幫助</Text>
                    </View>

                    <View style={styles.menuItem}>
                        <AntDesign name={'setting'} size={20} />
                        <Text style={styles.itemText}>設定</Text>
                    </View>

                    <TouchableOpacity onPress={() => {
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'LogIn' })],
                        });
                        this.props.navigation.dispatch(resetAction);
                    }}>
                        <View style={styles.menuItem}>
                            <AntDesign name={'logout'} size={20} />
                            <Text style={styles.itemText}>登出</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </ImageBackground>
        );
    }
}

Menu.propTypes = {
    onItemSelected: PropTypes.func.isRequired,
};
