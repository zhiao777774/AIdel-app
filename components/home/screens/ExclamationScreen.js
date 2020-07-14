import React from 'react';
import { FlatList, View, Alert, Linking } from 'react-native';
import { ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import screenStyle from './screenStyles';

export default class ExclamationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accidentData: []
        };

        mongoDB.trigger('get', 'historicalAccidentsRes', {
            collection: 'historicalAccident'
        }, (accidentData) => {
            accidentData = accidentData.sort((a, b) =>
                new Date(b.date).getTime() - new Date(a.date).getTime());
            this.setState({ accidentData });
        });
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

    removeItem = (listItem) => {
        mongoDB.delete({
            collection: 'historicalAccident',
            filter: { _id: listItem._id }
        }, (accidentData) => {
            this.setState({ accidentData });
        });
    }

    checkItem = (listItem) => {
        const accidentData = this.state.accidentData.map(item => {
            if (item === listItem) {
                return { ...item, checkmark: true };
            } else {
                return item;
            }
        });
        this.setState({ accidentData });
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
                    data={this.state.accidentData}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}