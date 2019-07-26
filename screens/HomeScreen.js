import * as WebBrowser from 'expo-web-browser';
import {Logs } from 'expo';
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
import app from '../constants/app';
import Logo from './Logo';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
}
    render(){
        return (
          
          <Container>
            <StatusBar backgroundColor="green" barStyle="default" />       
          
       
              <Logo />
             
            
              <View style={{ alignSelf:'center',marginTop:size.window.height/9+20,  }}>

              
                  <Button style={styles.btn1} block danger onPress={()=>{this.props.navigation.navigate('EmployeeSignIn',{
              loginType:'emp',
             
            });}}  ><Text style={app.btnTitle}> Employee Login </Text></Button>
                 
                  <Button style={styles.btn2} block danger onPress={()=>{this.props.navigation.navigate('EmployeeSignIn',{
              loginType: 'cmp',
             
            });console.log("Login Press")}}  ><Text style={app.btnTitle}> Login As Admin </Text></Button>
                

              </View>
           
            <Image source={require('../assets/images/home.png')} style={{width:size.window.width,height:size.window.height/3.1,marginTop:5,opacity:0.5}} />

              
         
            
                 
         
          
        
          </Container>

        );
    }
}

const styles ={ btn1:[app.btn,app.btnPurpal],
btn2:[app.btn,app.btnPink,{marginTop:60}]}