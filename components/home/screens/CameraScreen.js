import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Carousel from '../camera/Carousel';
import screenStyle from './screenStyles';
import { MessageDate } from '../../Message';

export default class CameraScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    date: '2020/07/06 21:00',
                    data: [{
                        url: 'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg',
                        id: 1
                    }, {
                        url: 'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg',
                        id: 2
                    }, {
                        url: 'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg',
                        id: 3
                    }, {
                        url: 'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg',
                        id: 4
                    }, {
                        url: 'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg',
                        id: 5
                    }]
                },
                {
                    date: '2020/07/06 21:30',
                    data: [{
                        url: 'https://i.pinimg.com/originals/1c/67/cb/1c67cb1a244c73faf6ea16d7d43395f7.jpg',
                        id: 1
                    }, {
                        url: 'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg',
                        id: 2
                    }, {
                        url: 'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg',
                        id: 3
                    }, {
                        url: 'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg',
                        id: 4

                    }, {
                        url: 'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg',
                        id: 5
                    }]
                },
                {
                    date: '2020/07/06 22:00',
                    data: [{
                        url: 'https://www.yogawinetravel.com/wp-content/uploads/2018/09/Raohe-Night-Market-in-Taipei-Taiwan-1140x865.jpg',
                        id: 1
                    }, {
                        url: 'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg',
                        id: 2
                    }, {
                        url: 'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg',
                        id: 3
                    }]
                }
            ]
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={[screenStyle.screen, styles.container]}>
                    {
                        this.state.data.map(({ date, data }) => {
                            return (
                                <View>
                                    <MessageDate date={date} />
                                    <Carousel data={data} />
                                </View>
                            );
                        })
                    }
                </View>
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        paddingLeft: 0,
        paddingRight: 0
    }
});