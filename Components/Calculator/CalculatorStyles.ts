import {StyleSheet} from "react-native";

export const CalculatorStyles = StyleSheet.create({
    mainScreen: {
        backgroundColor: '#18a0ec',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
    },
    header: {
        color: 'white',
        fontSize: 20,
        padding: 10,
    },
    resultContainer:{
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        marginBottom: 10,
    },
    result:{
        marginLeft: 'auto',
        fontSize: 18,
    },
    row:{
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }

});