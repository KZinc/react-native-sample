import React from 'react';
import {Text, View} from 'react-native';
import {ListStyles} from "./EmptyList.styles";

const EmptyList = () => {
    return (
        <View style={ListStyles.mainScreen}>
            <Text style={ListStyles.text}>
                Нет данных для отображения
            </Text>
        </View>
    );
};

export default EmptyList;
