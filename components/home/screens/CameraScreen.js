import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class CameraScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Camera</Text>
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
