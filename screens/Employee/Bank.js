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
  BackHandler,
  Alert
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
import Headers from '../Headers';





export default class BankScreen extends React.Component {

    constructor(props)
    {
        super(props)
        this.state={
                      AC:'',
                    isACError:false,
                    errorACMsg:'',



                      IFSCCODE:'',
                      isIFCError:false,
                        errorIFSCMsg:'',

                    Name:'',
                    isNameError:false,
                        errorNameCMsg:'',

                    Bank:'',
                    isBankError:false,
                        errorBankCMsg:'',

                    data:null,

                    BankData:{},

                  isLoding:false
                        
                    }

              console.log("In bank details");
    }

  static navigationOptions = {
    header: null
}

componentWillMount() {
  BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
}
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', () => this.props.navigation.goBack());
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




  

  _httpSaveUp = async (data) => {
   
    let token = await Global.TOKEN;

    /**Form dta  */
      let fv = new FormData();
      let temp = this.state.data;
      fv.append("pic",temp.pic );
      let user = await Global.USER;
      if(user != null)
      {
        user = user.id;
        fv.append('user_id',user+"")
        console.log('yes internet '+Global.API_URL+'company-details/'+user); 
      }
      else{
        console.log("Error ");
        Global.MSG('Not Login');
        this.prop.navigation.navigate('HomePage');
      }

       fv.append('joining_date',temp.join+"")
        fv.append('address',JSON.stringify(temp.address))
        fv.append('date_of_birth',temp.DOB+"")
        fv.append('designation','developer')
        fv.append('name',temp.name+"")
        fv.append('bank',JSON.stringify(this.state.BankData))
        fv.append('email_id',temp.email+"")     
       fv.append('gender',temp.gender);
      fv.append('company_id',temp.compnay_id+"");
      fv.append('contact_no',temp.mobile);

    /**End */


    console.log("Data Type ", typeof data);
  var connectionInfoLocal = '';
  NetInfo.getConnectionInfo().then((connectionInfo) => {
    console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    // connectionInfo.type = 'none';//force local loding
    if(connectionInfo.type == 'none'){
      console.log('no internet ');
     
      Global.MSG('Oops! No Internet Connection')
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
            "Authorization": token, 
          },
          body: fv 
        }).then((response) =>response.json() )
        .then(async(responseJson) => {
          // var itemsToSet = responseJson.data;
           console.log('resp:',responseJson);
           if(responseJson.success){
                if(responseJson.data != 1)
                {
                  console.log(responseJson.data);
                  responseJson.data['address']= JSON.parse(responseJson.data.address);

                    responseJson.data['bank']= JSON.parse(responseJson.data.bank);
              
                    this.setState({
                      isLoding:false
                    });
                    console.log("Profile Data y ",responseJson.data);
                    await AsyncStorage.setItem('profile',JSON.stringify(responseJson.data));
                    Global.MSG("Profile Save !")
                    this.props.navigation.navigate('Home');
                }
                else
                {
                  Global.MSG('Profile Update!')
                  this.props.navigation.navigate('Home');
                }
           }else{
            Global.MSG(responseJson.msg)
            this.setState({isLoding:false})
             console.log("Error in signUP :",responseJson.msg)
           }
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
        //  this._httpSaveUp(data);
      });
    }
  });
  console.log(connectionInfoLocal);
}

 
async setProfile(data)
{

  try {
    
  if( data != 1)
  {
    console.log(data);
      data['address']= JSON.parse(data.address);

      this.setState({
        isLoding:false
      });
      console.log("Profile Data y ",data);
      await AsyncStorage.setItem('profile',JSON.stringify(data));
      Global.MSG("Profile Save !")
      this.props.navigation.navigate('Welcome');
  }
  else
  {
    this.props.navigation.navigate('Welcome');
  }
} catch (error) {

  console.log("Error In Conpony Prfile",error);
  this.props.navigation.navigate('Welcome');
    
}

}

    
  async  checkValidation()
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
      else
      {
        data = {IFSCCODE:IFSCCODE,name:Name,AC:AC,Bank:Bank};  
        this.setState({BankData:data})
        this._httpSaveUp()
      }
      } catch (error) {
        console.log("Error : ",error);
      }
      
 
    }


    render(){
      const {Name,Bank,AC,IFSCCODE} = this.state;
        return (
          
          <Container>
            <Headers title="Bank Details"/>
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
                 

                    <Button block full style={[app.btn,app.borderPurpal,{marginLeft:-2.7,marginBottom:25}]} onPress={()=>{ this.checkValidation()}}><Title>Submit</Title></Button>
                 
                 
                    <Button block full style={[app.btn,app.btnPink,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this._onBack();}}><Title>Back</Title></Button>
                    
                  </Card>
                </KeyboardAvoidingView>


              </Content> 

              

          </Container>

        );
    }
}

const styles ={ btn:[app.btn,app.btnPurpal,{marginBottom:20,}]}