import React, { Component } from 'react';
import {
    StyleSheet
    , Text
    , View
    , ImageBackground
    , Dimensions
    , TouchableOpacity
} from 'react-native';
import ListView from 'deprecated-react-native-listview';
import 'react-native-gesture-handler';
import { StackActions, NavigationActions } from 'react-navigation';
import bgImage from '../assets/device_background.jpg'
import Row from './Row';

const { width: WIDTH } = Dimensions.get('window');

export default class AddDevice extends Component {
    static navigationOptions = {
        title: '選擇設備'
    };

    constructor(props) {
        super(props);
    }

    render() {
        const devices = [];
        const data = [{
            picture: 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png',
            name: '王柏翰',
            code: '00000000'
        }, {
            picture: 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png',
            name: '劉久銘',
            code: '00000001'
        }];

        data.forEach(({ name, code, picture }) => {
            devices.push({
                picture,
                name,
                code,
            });
        });

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        const navigation = this.props.navigation;

        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                <TouchableOpacity style={styles.buttonAddDevice} onPress={() => {

                }}>
                    <Text style={styles.AddDeviceText}>新增設備</Text>
                </TouchableOpacity>
                <Text style={styles.line}>─────────  選擇現有設備  ─────────</Text>
                <ListView
                    style={{ marginTop: 120, width: '80%' }}
                    dataSource={ds.cloneWithRows(devices)}
                    renderRow={(data) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                const resetAction = StackActions.reset({
                                    index: 0,
                                    actions: [NavigationActions.navigate({
                                        routeName: 'Home',
                                        params: {
                                            picture: data.picture,
                                            userName: data.name
                                        }
                                    })],
                                });
                                navigation.dispatch(resetAction);
                                //dispatch 清空stack
                            }}>
                                <Row {...data} navigation={navigation} />
                            </TouchableOpacity>
                        )
                    }}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                />
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
        backgroundColor: 'white',
        marginTop: -20
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
        position: 'absolute',
        top: 45
    },
    line: {
        position: 'absolute',
        top: 110
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    }
});