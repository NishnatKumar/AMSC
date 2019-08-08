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
  AsyncStorage,
  BackHandler,
  Alert
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

          let inTime = await AsyncStorage.getItem('in');
          if(inTime != null)
          {
            
                inTime = JSON.parse(inTime);
                             
                var date = new Date().getDate(); //Current Date
                var month = new Date().getMonth() + 1; //Current Month
                var year = new Date().getFullYear(); //Current Year

                if(inTime)
                {

                  if(inTime.in.split(" ")[1] != date+"/"+month+"/"+year )
                  {
                      console.log(inTime.in.split(" ")[1]);
                      await AsyncStorage.removeItem('in');
                      await AsyncStorage.removeItem('out');
                  }
                  
                }
          }

        } catch (error) {
        console.log("Check is store check : ",error);
        }
      
    } 

   async entryCheck()
    {
      try {

        this.checkStoreDate();
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

    
    componentWillMount()
    {
      try {
        this.props.navigation.dismiss();
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
      } catch (error) {
        
      }
     
    }

  static navigationOptions = {
    header: null
}

    

      componentWillUnmount() {
        try {
          this.backHandler.remove()
        } catch (error) {
          
        }
       
      }

      handleBackPress = () => {

        Alert.alert(
          'Confirm Exit',
          'Do You Want to Exit ?',
          [
           
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => BackHandler.exitApp()},
          ],
          {cancelable: false},
        );

        

        return true;
      }  

 
    

    _officeOut()
    {
      if(this.state.isIn)
        this.props.navigation.navigate('QRCode',{'types':'out'});
      else
        Global.MSG("you are to funny First make entry");
      
    }

  async  _profile()
    {
        let user = JSON.parse(await AsyncStorage.getItem('profileEmp'));
        let cmp =  JSON.parse(await AsyncStorage.getItem('cmp'));
        console.log("In token GEt user Profile",user);
        if(user != null && cmp != null)
        {
            // console.log('user : ',user);
            this.props.navigation.navigate('ProfileView',{data: user,cmp:cmp});
        }
       else
          Global.MSG('Wait .....')
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
        await AsyncStorage.removeItem('out');
        await AsyncStorage.removeItem('cmp');
        this.backHandler.remove();
        this.props.navigation.dismiss();
        this.props.navigation.navigate('HomePage');
        console.log("Log Out ")
      } catch (error) {
       
        console.log("Error he : ",error);
      }
     
    }

    
    render(){
        return (
          
          <Container>
            <Container>
            <StatusBar backgroundColor="green" barStyle="default" />
                
                <Timer></Timer>
                <View style={{padding:15}}>

                <Button block full style={this.state.isIn?[app.btn,app.btnGray,{marginBottom:20,}]:[app.btn,app.btnPurple,{marginBottom:20,}]} onPress={()=>{this._officeIn()}} disabled={this.state.isIn}><Title>{this.state.inTime} </Title></Button>

                <Button block full style={this.state.isOut?[app.btn,app.btnGray,{marginBottom:20,}]:[app.btn,app.btnPurple,{marginBottom:20,}]} onPress={()=>{this._officeOut()}} disabled={this.state.isOut }><Title>{this.state.outTime}</Title></Button>

                <Button block full style={styles.btn} onPress={()=>{this._profile()}} ><Title>Profile</Title></Button>
                <Button block full style={styles.btn} onPress={()=>{this._history()}} ><Title>History</Title></Button>
                <Button block full style={styles.btn} onPress={()=>{this._logOut()}} ><Title>Log Out</Title></Button>
                </View>
            
            </Container>
              
          </Container>

        );
    }
}

const styles ={ btn:[app.btn,app.btnPurple,{marginBottom:20,}]}