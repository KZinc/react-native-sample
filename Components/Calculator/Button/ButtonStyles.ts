import {
    StyleSheet,
} from 'react-native';

export const ButtonStyles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: 'white',
        display: 'flex',
        height: 75,
        width: 75,
        flexGrow: 0,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});