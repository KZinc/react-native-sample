import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {ButtonStyles} from "./ButtonStyles";

interface ButtonProps{
    text: string
    onPress: any
}
const Button = (props: ButtonProps) => {
    return (
        <TouchableOpacity style={ButtonStyles.buttonContainer} onPress={() => {
            props.onPress()
        }}>
            <Text style={ButtonStyles.buttonText}>{props.text}</Text>
        </TouchableOpacity>
    );
};

export default Button;
