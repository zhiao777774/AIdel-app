import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    Dimensions,
    Animated,
    StyleSheet,
} from 'react-native';
import BottomMenuItem from './BottomMenuItem';

const TabBar = ({
    state,
    descriptors,
    navigation,
}) => {
    const [translateValue] = useState(new Animated.Value(0));
    const totalWidth = Dimensions.get('window').width;
    const tabWidth = totalWidth / state.routes.length;
    return (
        <View style={[style.tabContainer, { width: totalWidth }]}>
            <View style={{ flexDirection: 'row' }}>
                <Animated.View
                    style={[
                        style.slider,
                        {
                            transform: [{ translateX: translateValue }],
                            width: tabWidth - 20,
                        },
                    ]}
                />

                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }

                        Animated.spring(translateValue, {
                            toValue: index * tabWidth,
                            velocity: 10,
                            useNativeDriver: true,
                        }).start();
                    };

                    const onLongPress = () => {
                        console.log(label.toString());
                    };

                    return (
                        <TouchableOpacity
                            accessibilityRole='button'
                            accessibilityStates={isFocused ? ['selected'] : []}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ flex: 1 }}
                            key={index}
                        >
                            <BottomMenuItem
                                iconName={label.toString()}
                                isCurrent={isFocused}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

export default TabBar;

const style = StyleSheet.create({
    tabContainer: {
        height: 80,
        shadowOffset: {
            width: 0,
            height: -1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4.0,
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        elevation: 10,
        position: 'absolute',
        top: -20,
        borderStyle: 'solid',
        borderColor: 'lightgray',
        borderBottomWidth: 1
    },
    slider: {
        height: 5,
        position: 'absolute',
        top: 20,
        left: 10,
        backgroundColor: '#3A36D5',
        borderRadius: 10,
    },
});