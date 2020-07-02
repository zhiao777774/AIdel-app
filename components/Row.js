import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30
    },
    text: {
        marginLeft: 12,
        fontSize: 16,
    },
    photo: {
        height: 40,
        width: 40,
        borderRadius: 20,
    }
});

const Row = (props) => (
    <View style={styles.container}>
        <Image source={{ uri: props.picture }} style={styles.photo} />
        <Text style={styles.text}>
            {`${props.name}`}
        </Text>
    </View>
);

export default Row;