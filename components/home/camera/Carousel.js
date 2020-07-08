import React from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, Animated } from 'react-native'
import CarouselItem from './CarouselItem'

const { width: WIDTH } = Dimensions.get('window');

const Carousel = ({ data }) => {
    const scrollX = new Animated.Value(0);
    const position = Animated.divide(scrollX, WIDTH);

    if (data && data.length) {
        return (
            <View>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => 'key' + index}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment='center'
                    scrollEventThrottle={16}
                    decelerationRate='fast'
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <CarouselItem item={item} />
                    }}
                    onScroll={Animated.event(
                        [{
                            nativeEvent: {
                                contentOffset: {
                                    x: scrollX
                                }
                            }
                        }]
                    )}
                />
                <View style={styles.dotView}>
                    {data.map((_, i) => {
                        const opacity = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp'
                        })

                        return (<Animated.View key={i} style={[styles.dot, { opacity }]} />)
                    })}
                </View>
            </View>
        )
    }

    console.log('Please provide Images');
    return null;
}

export default Carousel;

function infiniteScroll(dataList) {
    const numberOfData = dataList.length;
    let scrollValue = 0, scrolled = 0;

    setInterval(function () {
        scrolled++;
        if (scrolled < numberOfData) {
            scrollValue = scrollValue + WIDTH;
        } else {
            scrollValue = 0;
            scrolled = 0;
        }

        this.flatList.scrollToOffset({
            animated: true,
            offset: scrollValue
        });
    }, 3000);
}

const styles = StyleSheet.create({
    dotView: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    dot: {
        width: 10,
        height: 10,
        margin: 8,
        backgroundColor: '#595959',
        borderRadius: 5
    }
});