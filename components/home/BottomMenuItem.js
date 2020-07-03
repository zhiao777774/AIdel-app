import React from 'react';
import { View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

const BottomMenuItem = ({ iconName, isCurrent }) => {
    return (
        <View
            style={{
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 8
            }}
        >
            <FontAwesomeIcon
                name={iconName}
                size={30}
                style={{ color: isCurrent ? '#3A36D5' : '#CFD2D7' }}
            />
        </View>
    );
};

export default BottomMenuItem; 