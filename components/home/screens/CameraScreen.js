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
            data: []
        };

        mongoDB.trigger('get', 'historicalImagesRes', {
            collection: 'historicalImage'
        }, (data) => {
            this.setState({ data });
        });
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