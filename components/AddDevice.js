import React, { Component } from 'react';
import {
    StyleSheet
    , Text
    , View
    //, ListView
    , ImageBackground
    , Dimensions
    , TouchableOpacity
    , Alert
} from 'react-native';
import ListView from 'deprecated-react-native-listview';
import 'react-native-gesture-handler';
import { StackActions, NavigationActions } from 'react-navigation';
import bgImage from '../assets/background2.jpg'
import Row from './Row';

const { width: WIDTH } = Dimensions.get('window');

export default class AddDevice extends Component {

    static navigationOptions = {
        title: '選擇設備'
    };

    constructor(props) {
        super(props);
        this.state = {
            devicedata: []
        }

        mongoDB.get({
            collection: 'device'
        }, (devices) => {
            this.setState({ devicedata: devices });
        });
    }

    addNewDevice = () => {
        Alert.prompt('新增設備', '請輸入視障者名稱', [
            { text: '取消' },
            {
                text: '確認',
                onPress: (name) => {
                    Alert.alert('新增設備', '請選擇性別', [
                        {
                            text: '男',
                            onPress: () => {
                                mongoDB.insert({
                                    collection: 'device',
                                    data: {
                                        picture: 'http://120.125.83.10:90/assets/man.jpg',
                                        name
                                    }
                                }, (devices) => {
                                    this.setState({ devicedata: devices });
                                });
                            }
                        },
                        {
                            text: '女',
                            onPress: () => {
                                mongoDB.insert({
                                    collection: 'device',
                                    data: {
                                        picture: 'http://120.125.83.10:90/assets/woman.jpg',
                                        name
                                    }
                                }, (devices) => {
                                    this.setState({ devicedata: devices });
                                });
                            }
                        },
                        { text: '取消' }
                    ])
                }
            },
        ])
    }

    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        const navigation = this.props.navigation;

        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                <TouchableOpacity style={styles.buttonAddDevice} onPress={this.addNewDevice}>
                    <Text style={styles.AddDeviceText}>新增設備</Text>
                </TouchableOpacity>
                <Text style={styles.line}>─────────  選擇現有設備  ─────────</Text>
                <ListView
                    style={{ marginTop: 120, width: '80%' }}
                    dataSource={ds.cloneWithRows(this.state.devicedata)}
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
                            }}
                                onLongPress={() => {
                                    const { devicedata } = this.state;
                                    if (devicedata.length <= 1) {
                                        Alert.alert('至少要有一個設備');
                                        return;
                                    }

                                    Alert.alert('警告', '即將移除設備', [
                                        { text: '取消' },
                                        {
                                            text: '確認',
                                            onPress: () => {
                                                mongoDB.delete({
                                                    collection: 'device',
                                                    filter: { _id: data._id }
                                                }, (devices) => {
                                                    this.setState({ devicedata: devices });
                                                });
                                            }
                                        },
                                    ])
                                }}
                            >
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