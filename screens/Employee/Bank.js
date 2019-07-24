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
  DatePickerAndroid,
  KeyboardAvoidingView,
  AsyncStorage,
  NetInfo,
  ToastAndroid,
} from 'react-native';

import { MonoText } from '../../components/StyledText';
import { Container, Header,Thumbnail, Left, Body, Right, Button, Icon, Title, Footer, Content, Card, Item, Label, Input, Picker, Textarea } from 'native-base';
import size, {window} from '../../constants/Layout'
import { SizeClassIOS } from 'expo/build/ScreenOrientation/ScreenOrientation';
import app from '../../constants/app';
import Logo from '../Logo';
import Timer from './Timer';
import Time from '../../constants/Time';
import * as DocumentPicker from 'expo-document-picker';
import { switchCase } from '@babel/types';
import Global from '../../constants/Global';





export default class BankScreen extends React.Component {

    constructor(props)
    {
        super(props)
        this.state={
                      AC:'1234567890',
                    isACError:false,
                    errorACMsg:'',



                      IFSCCODE:'234534',
                      isIFCError:false,
                        errorIFSCMsg:'',

                    Name:'Nishant Kumar',
                    isNameError:false,
                        errorNameCMsg:'',

                    Bank:'SBI',
                    isBankError:false,
                        errorBankCMsg:'',

                    data:null,

                    BankData:{}


                        
                    }

              console.log("In bank details");
    }

  static navigationOptions = {
    header: null
}

  
  componentDidMount() {
    const { navigation } = this.props;
    const value = navigation.getParam('data', null);

    if(value == null )
    {
      console.log("DATA of navigation r error");
    }
    else{
        this.setState({data:value});
    }
  }
  



    _onBack()
    {
      this.props.navigation.navigate('Profile');
    }

  async  _onSubmit()
    {
      try {
        console.log("Submit Press");
     if(data = this.checkValidation() != null)
      {
        let temp = this.state.data;
        console.log("TEmp : ",temp);

     
         
        let data = new FormData();
         
      
          if(temp.pic == null)
          {
            console.log("Pic not come");
            return;
          }
            
        data.append("pic",temp.pic );

        this.setState({BankData:{AC:this.state.AC,IFSC:this.state.IFSCCODE,name:this.state.Name,bank:this.state.Bank}})

        if(temp.resume == null)
        {
          console.log("resume not come");
            return;
        }
           
        data.append("resume",temp.resume);


        let user = JSON.stringify(AsyncStorage.getItem('Details'));

        
      
       
         
       
        data.append('joining_date',temp.join+"")
        data.append('address',JSON.stringify(temp.address))
        data.append('date_of_birth',temp.DOB+"")
        data.append('designation','developer')
       
       
       
        data.append('bank',JSON.stringify(this.state.BankData))

        if(user == null){
          console.log("user not come");
            return;
        }

      data.append('id',user.id); 
      data.append('name',user.name)
      
      
        console.log("Http To call");
        this._http(data);

      }
      else
      {
          console.log("Error in submit");
      }
        
      } catch (error) {
        console.log("Eror ins save bank ",error)
      }
      
    }



  _http = async (data) => {
   console.log("In http");
    var connectionInfoLocal = '';
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
      // connectionInfo.type = 'none';//force local loding
      if(connectionInfo.type == 'none'){
        console.log('no internet ');
        ToastAndroid.showWithGravityAndOffset(
          'Oops! No Internet Connection',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        return;
      }else{
        console.log('yes internet '); 
        this.setState({
          isLoding:true,
        });
        fetch(Global.API_URL+'employee-store', {
          "async": true,
          method: 'POST',
          headers: {
              'Accept': 'application/json',   
              "Content-Type": "multipart/form-data",
              "Cache-Control": "no-cache",
            },
            body: data 
          }).then((response) =>response.json() )
          .then((responseJson) => {
            // var itemsToSet = responseJson.data;
             console.log('resp:',responseJson);
            //  if(responseJson.success){
            //     this.setProfile(responseJson.data)
            //  }else{
            //    ToastAndroid.showWithGravityAndOffset(
            //      'Internal Server Error',
            //      ToastAndroid.LONG,
            //      ToastAndroid.BOTTOM,
            //      25,
            //      50,
            //    );
            //    this.setState({
            //      isLoding:false,
            //    });
 
            //    console.log("Error in signUP :",)
            //  }
         })
         .catch((error) => {
          ToastAndroid.showWithGravityAndOffset(
            'Network Failed!!! Retrying...',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          console.log('on error fetching:'+error);
          //  this._httpSignUp(data);
        });
      }
    });
    console.log(connectionInfoLocal);
  }

    
    checkValidation()
    {
      let data = null;
      try {
        const {IFSCCODE,Name,AC,Bank} =this.state
      if(IFSCCODE =='' )
      {
        console.log("IFSCCODE Error");
      }
      else if(Name=='')
      {
        console.log("BNak name not found")
      }
      else if(AC == '')
      {
        console.log("Account not found");
      }
      else if(Bank == '')
      {
        console.log("Bank not found");
      }
      else{
        data = {IFSCCODE:IFSCCODE,name:Name,AC:AC,Bank:Bank};
        
      }
      } catch (error) {
        console.log("Error : ",error);
      }
      
      
      return data;
    }


    render(){
      const {Name,Bank,AC,IFSCCODE} = this.state;
        return (
          
          <Container>
            <StatusBar backgroundColor="green" barStyle="default" />
              <View style={{marginTop:15}}></View>
              
              <Content>
              <KeyboardAvoidingView  behavior="padding" enabled>

         
              <Title style={app.title}>Bank Detail </Title>

                  <Card style={app.Form} transparent>

                    <Item regular style={[app.formGroup,app.borderPurpal,{marginBottom:20} ] }>
                         <Input  value={Bank} returnKeyType="go" placeholder="BANK NAME" placeholderTextColor="#dcdcde" onChangeText={(text)=>{this.setState({Bank:text});}} textContentType="telephoneNumber" onSubmitEditing={()=>{console.log('Go Press')}}/>

                    </Item>

                    <Item regular style={[app.formGroup,app.borderPurpal,{marginBottom:20}  ] }>
                         <Input value={Name}  returnKeyType="go" placeholder="ACCOUNT HOLDER NAME" placeholderTextColor="#dcdcde" onChangeText={(text)=>{this.setState({Name:text});}}  onSubmitEditing={()=>{console.log('Go Press')}}/>

                    </Item>

                    <Item regular style={[app.formGroup,app.borderPurpal,{marginBottom:20} ] }>
                         <Input value={AC}  keyboardType="phone-pad" returnKeyType="go" placeholder="ACCOUNT NUMBER" placeholderTextColor="#dcdcde" onChangeText={(text)=>{this.setState({AC:text});}} textContentType="telephoneNumber" onSubmitEditing={()=>{console.log('Go Press')}}/>

                    </Item>
                        
                    <Item regular style={[app.formGroup,app.borderPurpal,{marginBottom:20} ] }>
                         <Input   value={IFSCCODE}  placeholder="ACCOUNT IFSC CODE" placeholderTextColor="#dcdcde" onChangeText={(text)=>{this.setState({IFSCCODE:text});}} textContentType="telephoneNumber" onSubmitEditing={()=>{console.log('Go Press')}}/>

                    </Item>
                 

                    <Button block full style={[app.btn,app.borderPurpal,{marginLeft:-2.7,marginBottom:25}]} onPress={()=>{this._onSubmit();}}><Title>Submit</Title></Button>
                 
                 
                    <Button block full style={[app.btn,app.btnPink,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this._onBack();}}><Title>Back</Title></Button>
                    
                  </Card>
                </KeyboardAvoidingView>


              </Content> 

              

          </Container>

        );
    }
}

const styles ={ btn:[app.btn,app.btnPurpal,{marginBottom:20,}]}