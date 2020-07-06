import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Message, { MessageDate } from '../../Message'
import screenStyle from './screenStyles'

export default class HistoryScreen extends React.Component {
    render() {
        return (
            <ScrollView>
                <View style={[screenStyle.screen, { paddingTop: 60 }]}>
                    <MessageDate date='2020/07/04 12:00' />
                    <Message mine text='附近有廁所嗎' />
                    <Message text='位於您的兩點鐘方向，距離34公尺' />
                    <MessageDate date='2020/07/04 12:02' />
                    <Message mine text='幫我導航至廁所' />
                    <Message text='好的，幫您導航至廁所' />
                    <Message text='忠義路直行4公尺後右轉至德新路' />
                    <Message text='右轉' />
                    <Message text='直行12公尺，即到達目的地' />
                    <Message text='您已到達目的地' />
                    <MessageDate date='2020/07/04 14:38' />
                    <Message mine text='附近有便利商店嗎' />
                    <Message text='位於您的十二點鐘方向，距離300公尺' />
                    <MessageDate date='2020/07/04 14:39' />
                    <Message mine text='幫我導航至便利商店' />
                    <Message text='好的，幫您導航至便利商店' />
                </View>
            </ScrollView>
        );
    }
}