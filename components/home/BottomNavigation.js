import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from './TabBar';
import HistoryScreen from './screens/HistoryScreen';
import CameraScreen from './screens/CameraScreen';
import MapScreen from './screens/MapScreen';
import ExclamationScreen from './screens/ExclamationScreen';

const BottomNavigation = ({ toggle, locateAccidental, locateHistorical }) => {
    const Tab = createBottomTabNavigator();
    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator tabBar={(props) => <TabBar {...props} toggle={toggle} />}>
                <Tab.Screen name="history" component={HistoryScreen} />
                <Tab.Screen name="camera" children={() => <CameraScreen locateHistorical={locateHistorical} />} />
                <Tab.Screen name="map-marked-alt" component={MapScreen} />
                <Tab.Screen name="exclamation" children={() => <ExclamationScreen locateAccidental={locateAccidental} />} />
            </Tab.Navigator>
        </View>
    );
};

export default BottomNavigation;