import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import Message, { MessageDate } from '../../Message';
import screenStyle from './screenStyles';

export default class HistoryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageData: []
        };

        mongoDB.trigger('get', 'historicalMessagesRes', {
            collection: 'historicalMessage'
        }, (messageData) => {
            this.setState({ messageData });
        });
    }

    render() {
        return (
            <ScrollView>
                <View key='historyScreen' style={[screenStyle.screen, { paddingTop: 60 }]}>
                    {this.state.messageData
                        .map(({ date, message }) => {
                            return [<MessageDate date={date} />].concat(
                                message.map(({ mine, text }) =>
                                    (<Message mine={mine} text={text} />)));
                        })}
                </View>
            </ScrollView>
        );
    }
}