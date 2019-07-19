 import React from 'react';
import { Container, View } from 'native-base';
import QRCode from 'react-native-qrcode';
import size from '../../constants/Layout';
 

export default class QRCodeScreen extends React.Component
{

    constructor(props)
    {
        super(props)
        this.state={
            data : {
                time:'23:56',
                date:'12/23/1995'
              }
        }
    }

  
   

  static navigationOptions = {
    header: null
}

    render()
    {
        let valueForQRCode = JSON.stringify(this.state.data);
        return(
            <Container style={{alignContent:'center',backgroundColor:'#000000' }} >
                <View style={{padding:20,alignContent:'center',backgroundColor:'#000000',marginTop:size.window.height/4}}>
                <QRCode
                    value={valueForQRCode}
                    size={size.window.width-40}
                    bgColor='#ffffff'
                    fgColor='#000000'/>
                </View>

                   

            </Container>
        )
    }

}
