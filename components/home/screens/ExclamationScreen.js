import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ExclamationScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Exclamation</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightyellow',
        alignItems: 'center',
        justifyContent: 'center',
    },
});