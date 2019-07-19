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
import { Container, Header,Thumbnail, Left, Body, Right, Button, Icon, Title, Footer, Content, Card } from 'native-base';
import size, {window} from '../../constants/Layout'
import { SizeClassIOS } from 'expo/build/ScreenOrientation/ScreenOrientation';
import app from '../../constants/app';
import Logo from '../Logo';
import Timer from './Timer';
import Time from '../../constants/Time';




export default class WelcomeScreen extends React.Component {

    constructor(props)
    {
        super(props)
        this.state={
                      isIn:false,
                      inTime:'Office In',
                      outTime:'Office Out',
                      isOut:false
                        
                    }
    }

  static navigationOptions = {
    header: null
}

    _officeIn()
    {
          this.props.navigation.navigate('QRCode');
          if(this.state.isIN)
          {
            
              let formatted_date = "IN : "+Time();

                console.log("In Office in ",formatted_date);
                this.setState({inTime:formatted_date,isIn:true});

          }

    }

    _officeOut()
    {
        this.props.navigation.navigate('QRCode');
        if(this.state.isOut)
        {
          let formatted_date = "Out : "+Time();

          console.log("Out Office : ",formatted_date);
          this.setState({outTime:formatted_date,isOut:true});
        }
    }

    _profile()
    {
      this.props.navigation.navigate('Profile');
    }

    _history()
    {
        
        this.props.navigation.navigate('History');
    }

    
    render(){
        return (
          
          <Container>
            <StatusBar backgroundColor="green" barStyle="default" />
                <View style={{marginTop:10}}></View> 
                <Timer></Timer>

                <Button block full style={this.state.isIn?[app.btn,app.btnGray,{marginBottom:20,}]:[app.btn,app.btnPurpal,{marginBottom:20,}]} onPress={()=>{this._officeIn()}} disabled={this.state.isIn}><Title>{this.state.inTime} </Title></Button>

                <Button block full style={this.state.isOut?[app.btn,app.btnGray,{marginBottom:20,}]:[app.btn,app.btnPurpal,{marginBottom:20,}]} onPress={()=>{this._officeOut()}} disabled={this.state.isOut}><Title>{this.state.outTime}</Title></Button>

                <Button block full style={styles.btn} onPress={()=>{this._profile()}} ><Title>Profile</Title></Button>
                <Button block full style={styles.btn} onPress={()=>{this._history()}} ><Title>History</Title></Button>

          </Container>

        );
    }
}

const styles ={ btn:[app.btn,app.btnPurpal,{marginBottom:20,}]}