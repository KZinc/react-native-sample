import * as React from 'react';
import {Component} from 'react';
import { View, Text } from 'react-native';
import {CalculatorStyles} from "./CalculatorStyles";
import Button from "./Button/Button";

enum CalcStatus{
    FIRSTPRESS = 4,
    ENTERNUMBER = 1,
    ENTERNOTNULL = 3,
    ENTERANY = 2,
}
interface CalcStateInterface{
    result: string,
    status: CalcStatus,
}

class Calculator extends Component<{}, CalcStateInterface> {

    constructor(props: {}){
        super(props);
        this.state = {
            result:'0',
            status: CalcStatus.FIRSTPRESS
        };
    }

    clear(){
        this.setState({
            result:'0',
            status: CalcStatus.FIRSTPRESS
        })
    }
    minusPressed(){
        let {status} = this.state;
        if(status === CalcStatus.FIRSTPRESS ){
            this.setState({
                result: `-`,
                status: CalcStatus.ENTERNUMBER
            });
        }
    }
    numberPressed(number: string){
        let {result, status} = this.state;
        if(status === CalcStatus.FIRSTPRESS && number !== '0'){
            this.setState({
                result: number,
                status: CalcStatus.ENTERANY
            });
        }else if(status === CalcStatus.ENTERANY){
            this.setState({
                result:`${result}${number}`,
            })
        }
    }

    renderNumbers(numbers: string[]){
        return numbers.map(number => {
            return(
                <Button key={number} text={number} onPress={()=>this.numberPressed(number)}/>
            )
        })
    }

    render(){

        return(
            <View style={CalculatorStyles.mainScreen}>
                <View>
                    <Text style={CalculatorStyles.header}>MAS калькулятор</Text>
                </View>
                <View style={CalculatorStyles.resultContainer} >
                    <Text style={CalculatorStyles.result}>{this.state.result}</Text>
                </View>
                <View style={CalculatorStyles.row}>
                    <Button text={'%'} onPress={()=>console.warn('hi')}/>
                    <Button text={'√'} onPress={()=>console.warn('hi')}/>
                    <Button text={'C'} onPress={()=>this.clear()}/>
                    <Button text={'+'} onPress={()=>console.warn('hi')}/>
                </View>
                <View style={CalculatorStyles.row}>
                    {this.renderNumbers(['7', '8', '9'])}
                    <Button text={'-'} onPress={()=>this.minusPressed()}/>
                </View>
                <View style={CalculatorStyles.row}>
                    {this.renderNumbers(['4', '5', '6'])}
                    <Button text={'*'} onPress={()=>console.warn('hi')}/>
                </View>
                <View style={CalculatorStyles.row}>
                    {this.renderNumbers(['1', '2', '3'])}
                    <Button text={'/'} onPress={()=>console.warn('hi')}/>
                </View>
                <View style={CalculatorStyles.row}>
                    <Button text={'.'} onPress={()=>console.warn('hi')}/>
                    <Button text={'0'} onPress={()=>this.numberPressed('0')}/>
                    <Button text={' '} onPress={()=>console.warn('hi')}/>
                    <Button text={'='} onPress={()=>console.warn('hi')}/>
                </View>

            </View>
        );
    }

}

export default Calculator;
