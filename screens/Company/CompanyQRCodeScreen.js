 import React from 'react';
 import {StatusBar} from 'react-native';
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

        setInterval(() => {
           

            this.timeUpdate();
           }, 10000);
     
    }

    
   


 componentDidMount() {
     this.timeUpdate();
   }


   timeUpdate()
   {
     var that = this;
     var date = new Date().getDate(); //Current Date
     var month = new Date().getMonth() + 1; //Current Month
     var year = new Date().getFullYear(); //Current Year
     var hours = new Date().getHours(); //Current Hours
     var min = new Date().getMinutes(); //Current Minutes
     var sec = new Date().getSeconds(); //Current Seconds
     var day = new Date().getUTCDay();

     // var month= ["January","February","March","April","May","June","July",
     //     "August","September","October","November","December"];
     var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
     var dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

     if( 10  >hours  )
     {
         console.log("In hours");
         hours = '0'+ hours;
     }

     if(min < 10)
     {
         min = '0'+ min;
     }

     if(date <10)
     {
         date = '0'+date;
     }
    
    let key =  date+"/"+month+"/"+year+" "+hours+":"+min+":"+sec; 
    
     that.setState({data:key});


   }


  
   

    static navigationOptions = {
        header: null
        }


    

    render()
    {
        let valueForQRCode = JSON.stringify(this.state.data);
        return(
            <Container style={{alignContent:'center',backgroundColor:'#000000' }} >
               <StatusBar hidden/>
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
