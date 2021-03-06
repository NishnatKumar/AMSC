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

import { MonoText } from '../components/StyledText';
import { Container, Header,Thumbnail, Left, Body, Right, Button, Icon, Title, Footer, Content } from 'native-base';
import size, {window} from '../constants/Layout'
import { SizeClassIOS } from 'expo/build/ScreenOrientation/ScreenOrientation';
import app from '../constants/app';
import Global from '../constants/Global';


export default class CmpLogo extends React.Component {

    constructor(props)
    {
        super(props);
        this.state={
            logoPath:this.props.logoPath,
            logoTitle:this.props.logoTitle,
        }
    }

    static navigationOptions = {
      header: null
  }
      render(){
        console.log(Global.API_PIC+this.state.logoPath);
          return (
            
  
               <View style={{marginBottom:20}} > 
                  <View style={{marginTop:StatusBar.currentHeight,alignSelf:'center'}}>
                        <Thumbnail large source={{uri:Global.API_PIC+this.state.logoPath}} size={100} /> 
                            
                    </View> 
                    <View style={{alignSelf:'center'}}>
                          <Text style={{fontSize:30}} >{this.state.logoTitle}</Text>
                    </View>
                </View>  
               
          );
      }
  }
  