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
import CmpLogo from '../CompanyLogo';




export default class AdminWelcomeScreen extends React.Component {

    constructor(props)
    {
        super(props)
        this.state={
                      isIn:false,
                      inTime:'Office In',
                      outTime:'Office Out',
                      isOut:false,
                      isLoading:true,
                      profile:null,
                      logo:' u',
                      title:'C',
                      status:true,
                      statusMSG:'',
                        
                    }

                   
    }

    componentWillMount()
    {
      try {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
      } catch (error) {
        
      }
    

    }

  componentDidMount()
    {
      this.props.navigation.dismiss();
      this.loadData();
    }

    async  loadData()
    {
      try {

        let user =  JSON.parse(await AsyncStorage.getItem('profile'));
        console.log("User : ",user);
        if(user != null)
        this.setState({'logo':user.pic,"title":user.company_name});

        if(user.status=='0')
        {
          this.setState({userMsg:'Wait for Verification',"status":true})
        }
        else   if(user.status=='1')
        {
          // Active Status
          this.setState({userMsg:'',"status":false})
        }
        else   if(user.status=='2')
        {
          this.setState({userMsg:'Blocked ',"status":true})
        }


        this.setState({isLoading:false})
    
      
    } catch (error) {
      
    }
    }

  static navigationOptions = {
    header: null
  }

    

      componentWillUnmount() {
        try {
          this.backHandler.remove();
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
      try {

         /**Profile of company */
      if(this.state.profile == null){
        let user =  JSON.parse(await AsyncStorage.getItem('profile'));
        if(user != null)      
          this.props.navigation.navigate('CompanyProfileView',{data: user});
        else
          Global.MSG('Wait .....')
        }
        else{
          this.props.navigation.navigate('CompanyProfileView',{data: this.state.profile});
        }
        
      } catch (error) {
        
      }
     



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
      const {isLoading,status,statusMSG} = this.state;
      if(!isLoading)
        return (
          
          <Container>
            <StatusBar backgroundColor="green" barStyle="default" />
                <View style={{height: StatusBar.currentHeight +10, backgroundColor:'#ffffff' }}>
                  
                </View> 

                
              <Card transparent style={{marginLeft:16 }}>

                <CmpLogo logoPath= {this.state.logo} logoTitle={this.state.title}  />
             

                <Button disabled={status} block full style={ status?[app.btn,app.btnGray,{marginBottom:20,marginTop:20}]:[app.btn,app.btnPink,{marginBottom:20,}]} onPress={()=>{this._employeeList()}} ><Title>Employee List</Title></Button>

                <Button disabled={status} block full style={status?[app.btn,app.btnGray,{marginBottom:20,}]:[app.btn,app.btnPink,{marginBottom:20,}]} onPress={()=>{this._qrcode()}} ><Title>Today Key</Title></Button>

                <Button block full style={this.state.isOut?[app.btn,app.btnGray,{marginBottom:20,}]:[app.btn,app.btnPink,{marginBottom:20,}]} onPress={()=>{this._profile()}}><Title>Profile</Title></Button>
               
                <Button block full style={this.state.isOut?[app.btn,app.btnGray,{marginBottom:20,}]:[app.btn,app.btnPink,{marginBottom:20,}]} onPress={()=>{this._logOut()}}><Title>LogOut</Title></Button>
                </Card>

                <Text>
                  {statusMSG}
                </Text>
            <Image source={require('../../assets/images/12.png')} style={{width:size.window.width,height:size.window.height/3,marginTop:5,opacity:0.5}} />

              
     
              

          </Container>

        );
      else
          return <Processing/>
    }
}

const styles ={ btn:[app.btn,app.btnPink,{marginBottom:20,}]}