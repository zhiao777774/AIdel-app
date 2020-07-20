import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
import { Buffer } from 'buffer';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

const CarouselItem = ({ item }) => {
    let source;
    if (item.url) {
        source = {
            uri: item.url
        };
    } else {
        const uri = 'data:image/jpg;base64,' + new Buffer(item.image).toString('base64');
        source = {
            uri,
            isStatic: true
        };
    }

    return (
        <View style={styles.cardView}>
            <Image style={styles.image} source={source} />
            <View style={styles.textView}>
                <Text style={styles.itemTitle}> {item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
        </View>
    )
}

export default CarouselItem;

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        width: WIDTH - 40,
        height: HEIGHT / 4,
        backgroundColor: 'white',
        margin: 10,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },
    textView: {
        position: 'absolute',
        bottom: 10,
        margin: 10,
        left: 5,
    },
    image: {
        width: WIDTH - 40,
        height: HEIGHT / 4,
        borderRadius: 10
    },
    itemTitle: {
        color: 'white',
        fontSize: 22,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        marginBottom: 5,
        fontWeight: "bold",
        elevation: 5
    },
    itemDescription: {
        color: 'white',
        fontSize: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5
    }
})