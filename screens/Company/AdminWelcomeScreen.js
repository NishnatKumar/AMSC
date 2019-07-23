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
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

import { MonoText } from '../../components/StyledText';
import { Container, Header,Thumbnail, Left, Body, Right, Button, Icon, Title, Footer, Content, Card, Item } from 'native-base';
import size, {window} from '../../constants/Layout'
import { SizeClassIOS } from 'expo/build/ScreenOrientation/ScreenOrientation';
import app from '../../constants/app';
import Logo from '../Logo';

import Time from '../../constants/Time';
import Processing from '../Processing';




export default class AdminWelcomeScreen extends React.Component {

    constructor(props)
    {
        super(props)
        this.state={
                      isIn:false,
                      inTime:'Office In',
                      outTime:'Office Out',
                      isOut:false,
                      isLoding:false,
                        
                    }
    }

  static navigationOptions = {
    header: null
}

    _employeeList()
    {
      this.props.navigation.navigate('EmpList');

    }

    _qrcode()
    {
      this.props.navigation.navigate('QRCodeScreen');
    }

    // _officeOut()
    // {
    //     this.props.navigation.navigate('QRCode');
    //     if(this.state.isOut)
    //     {
    //       let formatted_date = "Out : "+Time();

    //       console.log("Out Office : ",formatted_date);
    //       this.setState({outTime:formatted_date,isOut:true});
    //     }
    // }

    _profile()
    {
      /**Profile of company */
      this.props.navigation.navigate('CompanyProfile');




    }

    // _history()
    // {
        
    //     this.props.navigation.navigate('History');
    // }

    
    render(){
      const {isLoding} = this.state;
      if(!isLoding)
        return (
          
          <Container>
            <StatusBar backgroundColor="green" barStyle="default" />
                <View style={{marginTop:10}}></View> 


                <Logo></Logo>
             

                <Button block full style={this.state.isIn?[app.btn,app.btnGray,{marginBottom:20,}]:[app.btn,app.btnPink,{marginBottom:20,}]} onPress={()=>{this._employeeList()}} ><Title>Employee List</Title></Button>

                <Button block full style={this.state.isOut?[app.btn,app.btnGray,{marginBottom:20,}]:[app.btn,app.btnPink,{marginBottom:20,}]} onPress={()=>{this._qrcode()}} ><Title>Today Key</Title></Button>

                <Button block full style={this.state.isOut?[app.btn,app.btnGray,{marginBottom:20,}]:[app.btn,app.btnPink,{marginBottom:20,}]} onPress={()=>{this._profile()}}><Title>Profile</Title></Button>

            <Image source={require('../../assets/images/12.png')} style={{width:size.window.width,height:size.window.height/2,marginTop:5,opacity:0.5}} />

              
     
              

          </Container>

        );
      else
          return <Processing/>
    }
}

const styles ={ btn:[app.btn,app.btnPink,{marginBottom:20,}]}