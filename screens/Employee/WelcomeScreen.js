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
  AsyncStorage
} from 'react-native';

import { MonoText } from '../../components/StyledText';
import { Container, Header,Thumbnail, Left, Body, Right, Button, Icon, Title, Footer, Content, Card } from 'native-base';
import size, {window} from '../../constants/Layout'
import { SizeClassIOS } from 'expo/build/ScreenOrientation/ScreenOrientation';
import app from '../../constants/app';
import Logo from '../Logo';
import Timer from './Timer';
import Time from '../../constants/Time';
import { checkForUpdateAsync } from 'expo/build/Updates/Updates';
import Global from '../../constants/Global';




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

                    
        setInterval(() => {
           

          this.entryCheck();
         }, 1000);
     
    }

    async checkStoreDate()
    {
        try {

          
          let inTime = JSON.parse(await AsyncStorage.getItem('in'));
          
          var date = new Date().getDate(); //Current Date
          var month = new Date().getMonth() + 1; //Current Month
          var year = new Date().getFullYear(); //Current Year

          if(inTime)
          {
            if(date.split(" ")[1] != date+"/"+month+"/"+year )
            {
                await AsyncStorage.removeItem('in');
                await AsyncStorage.removeItem('out');
            }
          }


        } catch (error) {
          console.log("Check is store check : ",error);
        }
      
    } 

   async entryCheck()
    {
      try {

        // await AsyncStorage.removeItem('in');
        let inTime = JSON.parse(await AsyncStorage.getItem('in'));
        let outTime = JSON.parse(await AsyncStorage.getItem('out'));
      //  console.log(inTime);

      
          if(inTime)
          {
        //  console.log("Date in : ",inTime);
            let formatted_date = "IN : "+inTime.in;

           // console.log("In Office in ",formatted_date);
            this.setState({inTime:formatted_date,isIn:true});


            
          }
           if(outTime)
          {
        //  console.log("Date out : ",outTime);
           
              let formatted_date = "Out : "+outTime.out;
    
            //  console.log("Out Office : ",formatted_date);
              this.setState({outTime:formatted_date,isOut:true});
           
          }

       

      } catch (error) {
        console.log("Error",error);
      }
      
    }
    
  static navigationOptions = {
    header: null
}

    _officeIn()
    {
          this.props.navigation.navigate('QRCode',{'types':'in'});
          // if(this.state.isIN)
          // {
            
          //     let formatted_date = "IN : "+Time();

          //       console.log("In Office in ",formatted_date);
          //       this.setState({inTime:formatted_date,isIn:true});

          // }

    }

    

    _officeOut()
    {
      if(isIn)
        this.props.navigation.navigate('QRCode',{'types':'out'});
      else
        Global.MSG("Invalide Option Press");
      
    }

    _profile()
    {
      this.props.navigation.navigate('Profile');
    }

    _history()
    {
        
        this.props.navigation.navigate('History');
    }

    
    async _logOut()
    {
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('profileEmp');
        await AsyncStorage.removeItem('userDetails');
        await AsyncStorage.removeItem('in');
        await AsyncStorage.removeItem('out')
        this.props.navigation.navigate('AuthLoading');
        console.log("Log Out ")
      } catch (error) {
        console.log("Error he : ",error);
      }
     
    }

    
    render(){
        return (
          
          <Container>
           
            <StatusBar backgroundColor="green" barStyle="default" />
                
                <Timer></Timer>

                <Button block full style={this.state.isIn?[app.btn,app.btnGray,{marginBottom:20,}]:[app.btn,app.btnPurpal,{marginBottom:20,}]} onPress={()=>{this._officeIn()}} disabled={this.state.isIn}><Title>{this.state.inTime} </Title></Button>

                <Button block full style={this.state.isOut?[app.btn,app.btnGray,{marginBottom:20,}]:[app.btn,app.btnPurpal,{marginBottom:20,}]} onPress={()=>{this._officeOut()}} disabled={this.state.isOut }><Title>{this.state.outTime}</Title></Button>

                <Button block full style={styles.btn} onPress={()=>{this._profile()}} ><Title>Profile</Title></Button>
                <Button block full style={styles.btn} onPress={()=>{this._history()}} ><Title>History</Title></Button>
                <Button block full style={styles.btn} onPress={()=>{this._logOut()}} ><Title>Log Out</Title></Button>
              
          </Container>

        );
    }
}

const styles ={ btn:[app.btn,app.btnPurpal,{marginBottom:20,}]}