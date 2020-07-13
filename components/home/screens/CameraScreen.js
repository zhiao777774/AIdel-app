import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Carousel from '../camera/Carousel';
import screenStyle from './screenStyles';
import { MessageDate } from '../../Message';

export default class CameraScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    date: '2020/07/11',
                    data: [
                        {
                            time: '11:00',
                            data: [{
                                url: 'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg',
                                id: 1,
                                description: '桃園市新屋區台15線'
                            }, {
                                url: 'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg',
                                id: 2,
                                description: '桃園市新屋區濱海林蔭大道838號'
                            }, {
                                url: 'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg',
                                id: 3,
                                description: '中山西路三段新屋區桃園市327號'
                            }],
                            locations: [{
                                latitude: 24.986120,
                                longitude: 121.027486
                            }, {
                                latitude: 24.984151,
                                longitude: 121.018165
                            }, {
                                latitude: 24.9877929,
                                longitude: 121.0144426
                            }]
                        },
                        {
                            time: '10:30',
                            data: [{
                                url: 'https://i.pinimg.com/originals/1c/67/cb/1c67cb1a244c73faf6ea16d7d43395f7.jpg',
                                id: 1,
                                description: '桃園市新屋區台15線'
                            }, {
                                url: 'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg',
                                id: 2,
                                description: '桃園市新屋區濱海林蔭大道838號'
                            }, {
                                url: 'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg',
                                id: 3,
                                description: '中山西路三段新屋區桃園市327號'
                            }],
                            locations: [{
                                latitude: 24.986120,
                                longitude: 121.027486
                            }, {
                                latitude: 24.984151,
                                longitude: 121.018165
                            }, {
                                latitude: 24.9877929,
                                longitude: 121.0144426
                            }]
                        }
                    ]
                },
                {
                    date: '2020/07/12',
                    data: [
                        {
                            time: '21:00',
                            data: [{
                                url: 'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg',
                                id: 1
                            }, {
                                url: 'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg',
                                id: 2
                            }, {
                                url: 'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg',
                                id: 3
                            }]
                        },
                        {
                            time: '20:30',
                            data: [{
                                url: 'https://i.pinimg.com/originals/1c/67/cb/1c67cb1a244c73faf6ea16d7d43395f7.jpg',
                                id: 1
                            }, {
                                url: 'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg',
                                id: 2
                            }, {
                                url: 'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg',
                                id: 3
                            }]
                        }
                    ]
                },
                {
                    date: '2020/07/13',
                    data: [
                        {
                            time: '22:00',
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
                            time: '21:30',
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
                            time: '21:00',
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
            ]
        }
    }

    handlePicker = (datetime) => {
        const _validate = (date) => this.state.data
            .map((d) => d.date).includes(date);

        const date = moment(datetime).format('YYYY/MM/DD');
        if (_validate(date)) {
            this.setState({
                isVisible: false,
                choseDate: date
            });
        } else {
            Alert.alert('選擇的日期超出可選範圍');
        }
    }

    showPicker = () => {
        this.setState({ isVisible: true });
    }

    hidePicker = () => {
        this.setState({ isVisible: false });
    }

    render() {
        const now = new Date();
        let y = now.getFullYear(),
            m = now.getMonth() + 1,
            d = now.getDate();
        m = String(m).length === 1 ? '0' + m : m;

        const choseDate = this.state.choseDate || `${y}/${m}/${d}`;

        return (
            <ScrollView>
                <View style={[screenStyle.screen, styles.container]}>
                    <View style={styles.datePickerContainer}>
                        <TouchableOpacity style={styles.btnDateSelect} onPress={this.showPicker}>
                            <Text style={styles.dateText} >{choseDate}</Text>
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.isVisible}
                            onConfirm={this.handlePicker}
                            onCancel={this.hidePicker}
                            date={new Date(choseDate)}
                            mode={'date'}
                            headerTextIOS='選擇日期(近三天)'
                            confirmTextIOS='選擇'
                            cancelTextIOS='取消'
                        />
                    </View>
                    {
                        this.state.data.map(({ date, data }) => {
                            return data.map(({ time, data, locations }, i) => {
                                return (
                                    <View key={i} style={{
                                        display: date === choseDate ? 'block' : 'none'
                                    }}>
                                        <View style={styles.header}>
                                            <MessageDate date={time} style={{
                                                marginTop: 15,
                                                marginBottom: 2
                                            }} />
                                            <TouchableOpacity onPress={() => {
                                                this.props.locateHistorical(locations);
                                            }}>
                                                <Image style={styles.markerIcon}
                                                    source={require('../../../assets/historical-marker.png')}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <Carousel data={data} />
                                    </View>
                                );
                            });
                        })
                    }
                </View>
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
        paddingLeft: 0,
        paddingRight: 0
    },
    datePickerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnDateSelect: {
        width: 150,
        height: 35,
        backgroundColor: '#330066',
        borderRadius: 30,
        justifyContent: 'center'
    },
    dateText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
    header: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 20
    },
    markerIcon: {
        width: 30,
        height: 30,
        marginTop: 8,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});