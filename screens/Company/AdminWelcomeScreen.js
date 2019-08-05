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
  ActivityIndicator,
  AsyncStorage,
  BackHandler,
  Alert
} from 'react-native';

import { MonoText } from '../../components/StyledText';
import { Container, Header,Thumbnail, Left, Body, Right, Button, Icon, Title, Footer, Content, Card, Item } from 'native-base';
import size, {window} from '../../constants/Layout'
import { SizeClassIOS } from 'expo/build/ScreenOrientation/ScreenOrientation';
import app from '../../constants/app';
import Logo from '../Logo';

import Time from '../../constants/Time';
import Processing from '../Processing';
import Global from '../../constants/Global';




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

    componentDidMount()
    {
      this.props.navigation.dismiss();
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

  static navigationOptions = {
    header: null
}

    

      componentWillUnmount() {
      
        this.backHandler.remove()
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

    _employeeList()
    {
      this.props.navigation.navigate('EmpList');

    }

    _qrcode()
    {
      this.props.navigation.navigate('QRCodeScreen');
    }

   async _profile()
    {
      /**Profile of company */
      // this.props.navigation.navigate('CompanyProfileView',{data: await Global.PROFILE});
      let temp =await Global.PROFILE;
      if(temp != null)      
        this.props.navigation.navigate('ProfileView',{data: temp});
      else
        Global.MSG('Wait .....')



    }

    async _logOut()
    {
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userDetails')
        await AsyncStorage.removeItem('profile');
        this.backHandler.remove()
        this.props.navigation.dismiss();
        this.props.navigation.navigate('HomePage');
        
        console.log("Log Out ")
      } catch (error) {
        console.log("Error he : ",error);
      }
     
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
                <View style={{height: StatusBar.currentHeight +10, backgroundColor:'#ffffff' }}>
                  
                </View> 


                <Logo></Logo>
             

                <Button block full style={this.state.isIn?[app.btn,app.btnGray,{marginBottom:20,marginTop:20}]:[app.btn,app.btnPink,{marginBottom:20,}]} onPress={()=>{this._employeeList()}} ><Title>Employee List</Title></Button>

                <Button block full style={this.state.isOut?[app.btn,app.btnGray,{marginBottom:20,}]:[app.btn,app.btnPink,{marginBottom:20,}]} onPress={()=>{this._qrcode()}} ><Title>Today Key</Title></Button>

                <Button block full style={this.state.isOut?[app.btn,app.btnGray,{marginBottom:20,}]:[app.btn,app.btnPink,{marginBottom:20,}]} onPress={()=>{this._profile()}}><Title>Profile</Title></Button>
               
                <Button block full style={this.state.isOut?[app.btn,app.btnGray,{marginBottom:20,}]:[app.btn,app.btnPink,{marginBottom:20,}]} onPress={()=>{this._logOut()}}><Title>LogOut</Title></Button>

            <Image source={require('../../assets/images/12.png')} style={{width:size.window.width,height:size.window.height/2,marginTop:5,opacity:0.5}} />

              
     
              

          </Container>

        );
      else
          return <Processing/>
    }
}

const styles ={ btn:[app.btn,app.btnPink,{marginBottom:20,}]}