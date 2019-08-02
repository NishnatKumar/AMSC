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


export default class Logo extends React.Component {

    constructor(props)
    {
        super(props);
        this.state={
            logoPath:'../assets/images/appLogo.png',
            logoTitle:'Depixed Media',
        }
    }

    static navigationOptions = {
      header: null
  }
      render(){
          return (
            
  
               <View style={{marginBottom:20}} > 
                  <View style={{marginTop:StatusBar.currentHeight,alignSelf:'center'}}>
                        <Thumbnail large source={require('../assets/images/appLogo.png')} size={100} /> 
                            
                    </View> 
                    <View style={{alignSelf:'center'}}>
                          <Text style={{fontSize:30}} >{this.state.logoTitle}</Text>
                    </View>
                </View>  
               
          );
      }
  }
  