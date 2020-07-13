import React from 'react';
import { FlatList, View, Alert, Linking } from 'react-native';
import { ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import axios from 'axios';
import screenStyle from './screenStyles';

export default class ExclamationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [
                {
                    id: 1,
                    date: '2020/07/09 20:45',
                    type: '車禍',
                    location: {
                        address: '桃園市蘆竹區南崁路一段369號',
                        latitude: 25.054930,
                        longitude: 121.282248
                    }
                },
                {
                    id: 2,
                    date: '2020/07/05 17:32',
                    type: '摔倒',
                    location: {
                        address: '桃園市桃園區經國路369號',
                        latitude: 25.016314,
                        longitude: 121.305584
                    }
                },
                {
                    id: 3,
                    date: '2020/06/25 08:12',
                    type: '摔倒',
                    location: {
                        address: '新竹市東區中華路二段416號',
                        latitude: 24.802064,
                        longitude: 120.971729
                    }
                },
                {
                    id: 4,
                    date: '2020/06/09 14:35',
                    type: '摔倒',
                    location: {
                        address: '新竹市東區工業東二路1號',
                        latitude: 24.7797876,
                        longitude: 121.0033921
                    }
                },
                {
                    id: 5,
                    date: '2020/06/01 16:05',
                    type: '摔倒',
                    location: {
                        address: '台北市中山區林森北路159巷2號',
                        latitude: 25.0503921,
                        longitude: 121.5247055
                    }
                }
            ]
        };
    }

    rightSwipeOutButtons = (item) => {
        return [
            {
                text: '忽略',
                onPress: () => this.removeItem(item),
                backgroundColor: '#ea432f',
                color: '#FFF'
            },
            {
                text: '打電話',
                onPress: () => {
                    if (!Linking.openURL('tel://0966736708')) return;
                    this.checkItem(item);
                },
                backgroundColor: '#80eba5',
                color: '#000'
            }
        ];
    }

    leftSwipeOutButtons = (item) => {
        return [
            {
                text: '查看位置',
                onPress: () => this.locateItem(item),
                backgroundColor: '#FF7F50',
                color: '#FFF'
            }
        ];
    }

    componentDidMount() {
        /*axios.get('https://rickandmortyapi.com/api/character').then(response => {
            this.setState({ dataList: response.data.results });
        });*/
    }

    removeItem = (listItem) => {
        const dataList = this.state.dataList.filter(item => item != listItem);
        this.setState({ dataList });
    }

    checkItem = (listItem) => {
        const dataList = this.state.dataList.map(item => {
            if (item === listItem) {
                return { ...item, checkmark: true };
            } else {
                return item;
            }
        });
        this.setState({ dataList });
    }

    locateItem = (listItem) => {
        this.props.locateAccidental(listItem);
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => (
        <Swipeout
            right={this.rightSwipeOutButtons(item)}
            left={this.leftSwipeOutButtons(item)}
            backgroundColor={'transparent'}
            close
        >
            <ListItem
                title={item.date}
                checkmark={item.checkmark}
                subtitle={item.type}
                leftAvatar={{
                    source: item.type === '摔倒' ?
                        require('../../../assets/accident-fallDown.png')
                        : require('../../../assets/accident-car.png')
                }}
                bottomDivider={true}
                onPress={() =>
                    Alert.alert(
                        item.name,
                        `${item.date}\n\n${item.location.address}\n\n${item.type}`
                    )
                }
            />
        </Swipeout>
    );

    render() {
        return (
            <View style={[screenStyle.screen, {
                paddingTop: 60,
                paddingBottom: 0
            }]}>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.dataList}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}