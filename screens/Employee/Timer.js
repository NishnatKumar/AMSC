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
            month:'JULY'
        }
    }

  static navigationOptions = {
    header: null
}
    render(){
        return (
          
     
        
                <View style={{marginTop:10,padding:10}}>
          
                    <View>

                        <Text style={{fontSize:120,fontFamily:'NotoSanskr',fontWeight:'bold',color:'#dcdcde',alignSelf:'center' }}>12:00</Text>
                
                    </View>
                    <View>

                        <Text style={{fontSize:55,fontFamily:'Roboto',fontWeight:'200',color:'#dcdcde',alignSelf:'center',marginTop:-40 }}>Thursday</Text>

                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:-45,paddingHorizontal:15}}>
                        <View >
                            <Text style={{fontSize:123,fontFamily:'NotoSanskr',fontWeight:'bold',color:'#dcdcde',alignSelf:'center'}} >18</Text>
                        </View>
                        <View>
                            <View style={{marginTop:30}}>
                                 <Text style={{fontSize:40,fontFamily:'Roboto',color:'#dcdcde',alignSelf:'center'}}>JULY</Text>
                           
                            </View>
                            <View style={{marginTop:-20}}>
                                <Text style={{fontSize:60,fontWeight:'900',fontFamily:'NotoSanskr',color:'#dcdcde',alignSelf:'center',}}>2019</Text>
                            </View>
                        </View>
                    </View>
                </View>        
        
            
          

        );
    }
}

