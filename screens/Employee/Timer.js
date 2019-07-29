import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ImageBackground,
  TouchableHighlight
} from 'react-native';

import { MonoText } from '../../components/StyledText';
import { Container, Header,Thumbnail, Left, Body, Right, Button, Icon, Title, Footer, Content } from 'native-base';
import size, {window} from '../../constants/Layout'
import { SizeClassIOS } from 'expo/build/ScreenOrientation/ScreenOrientation';
import app from '../../constants/app';
import Logo from '../Logo';



export default class Timer extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            time:'12:31',
            day:'SUNDAY',
            year:'2019',
            month:'JULY',
            date:''
        }
       


        setInterval(() => {
           

           this.timeUpdate();
          }, 1000);
    
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
           // console.log("In hours");
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
       
       
        that.setState({
          //Setting the value of the date time
         
            month:monthArray[month],
            time:hours+':'+min,
            day:dayArray[day],
            year:year,
            date:date                       

        });
      }


      
  static navigationOptions = {
    header: null
}
    render(){

       // this.timeUpdate();

       
        return (
          
     
        
                <View style={{marginTop:10,padding:10}}>
          
                    <View>

                        <Text style={{fontSize:120,fontFamily:'NotoSanskr',fontWeight:'bold',color:'#dcdcde',alignSelf:'center' }}>{this.state.time}</Text>
                
                    </View>
                    <View>

                        <Text style={{fontSize:55,fontFamily:'Roboto',fontWeight:'200',color:'#dcdcde',alignSelf:'center',marginTop:-40 }}>{this.state.day}</Text>

                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:-45,paddingHorizontal:15}}>
                        <View >
                            <Text style={{fontSize:123,fontFamily:'NotoSanskr',fontWeight:'bold',color:'#dcdcde',alignSelf:'center'}} >{this.state.date}</Text>
                        </View>
                        <View>
                            <View style={{marginTop:30}}>
                                 <Text style={{fontSize:40,fontFamily:'Roboto',color:'#dcdcde',alignSelf:'center'}}>{this.state.month}</Text>
                           
                            </View>
                            <View style={{marginTop:-20}}>
                                <Text style={{fontSize:60,fontWeight:'900',fontFamily:'NotoSanskr',color:'#dcdcde',alignSelf:'center',}}>{this.state.year}</Text>
                            </View>
                        </View>
                    </View>
                </View>        
        
            
          

        );
    }
}

