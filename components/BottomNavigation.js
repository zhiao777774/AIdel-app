import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class BottomNavigation extends Component {
    render() {
        const data = [{
            icon: 'history',
            id: 'history'
        }, {
            icon: 'camera',
            id: 'camera'
        }, {
            icon: 'map-marked-alt',
            id: 'map'
        }, {
            icon: 'exclamation',
            id: 'exclamation'
        }];

        const tabs = []
        for (let i = 0; i < data.length; i++) {
            tabs.push(<Tab icon={data[i].icon} id={data[i].id} />)
        }

        return (
            <View style={styles.container}>
                {tabs}
            </View>
        );
    }
}

class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.currentTab = undefined;
    }

    click = () => {
		//判斷目前為展開還是收合狀態
		//切換頁面 or 抽換tabBody內容
		let tab;
		switch(this.props.id) {
            case 'history': 
                tab = new HistoryTab();
                break;
            case 'camera': 
                tab = new CameraTab();
                break;
            case 'map': 
                tab = new MapTab();
                break;
            case 'exclamation': 
                tab = new ExclamationTab();
                break;
		}
	    tab.exec();
		
		if(this.currentTab) this.currentTab.dispose();
        this.currentTab = tab;
        
       Alert.alert(this.props.id);
	}

    render() {
        return (
            <View id={this.props.id} style={styles.tab}>
                <View>
                    <TouchableOpacity onPress={() => this.click()}>
                        <Icon name={this.props.icon} size={28} color='rgba(255, 255, 255, 1)' />
                    </TouchableOpacity>
                </View>
                <View className="tabBody" style={styles.tabBody}>
                    <Text>{this.props.id}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '8%',
        width: '100%',
        bottom: 0,
        flexDirection: 'row'
    },
    tab: {
        width: '25%',
        flex: 1,
        flexWrap: 'wrap',
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,165,0, .7)'
    },
    tabBody: {

    }
});


class HistoryTab {
    exec() {

    }

    dispose() {

    }
}

class CameraTab {
    exec() {

    }

    dispose() {
        
    }
}

class MapTab {
    exec() {

    }

    dispose() {
        
    }
}

class ExclamationTab {
    exec() {

    }

    dispose() {
        
    }
}