import React from 'react'
import { View,Text } from 'native-base';

export default class ErrorMsg extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state ={
            errorValue:this.props
        }
    }

    render()
    {
        const {errorValue} = this.state;
        return(
             errorValue.length !=0 ?
            <View style={{margin:10, backgroundColor:'#ebb7c1',borderWidth:0.5,borderColor:'red',borderRadius:5,padding:7}}>
            <Text style={{fontSize:20,color:'red'}}>{errorValue}</Text>
            </View>:<Text></Text>
            )
    }
}