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
import Processing from '../Processing';





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

                    BankData:null,

                  isLoading:false
                        
                    }

              console.log("In bank details");
    }

  static navigationOptions = {
    header: null
}

componentWillMount() {
  try {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
  } catch (error) {
    
  }
  
}
componentWillUnmount() {
  try {
    BackHandler.removeEventListener('hardwareBackPress', () => this.props.navigation.goBack());
  } catch (error) {
    console.log("Error ")
  }
 
}

  
  componentDidMount() {
    const { navigation } = this.props;
    const value = navigation.getParam('data', null);

    if(value == null )
    {
      console.log("DATA of navigation r error");
    }
    else{
      console.log('DATA of navigation r error',value)
        this.setState({data:value});
    }
  }
  



    _onBack()
    {
      this.props.navigation.navigate('Profile');
    }




  

  _httpSaveUp = async (data) => {
 
    const {AC,IFSCCODE,Name,Bank} = this.state;
    /**Form dta  */
      let fv = new FormData();
      let temp = this.state.data;
    
      
      fv.append("pic",temp.pic );
      fv.append("resume",temp.resume );
     
        console.log("Ok Bank data : ",this.state.BankData);
       fv.append('joining_date',temp.join+"")
        fv.append('address',JSON.stringify(temp.address))
        fv.append('date_of_birth',temp.DOB+"")
        fv.append('designation','developer')
        fv.append('name',temp.name+"")
        fv.append('bank',JSON.stringify({IFSCCODE:IFSCCODE,name:Name,AC:AC,Bank:Bank}))
        fv.append('email_id',temp.email+"")     
       fv.append('gender',temp.gender);
      fv.append('company_id',temp.company_id+"");
      fv.append('contact_no',temp.mobile);
      fv.append('email',temp.email+"")
      fv.append('name',temp.name+"")
      fv.append('password',temp.password)
      fv.append('user_type',temp.user_type)

    /**End */


    console.log("Data Type ", fv);
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
        isLoading:true,
      });
      fetch(Global.API_URL+'register', {
        "async": true,
        method: 'POST',
        headers: {
            'Accept': 'application/json',   
            "Content-Type": "multipart/form-data",
            "Cache-Control": "no-cache",
           
          },
          body: fv 
        }).then((response) =>response.json() )
        .then(async(responseJson) => {

          console.log("Error in signUP :",responseJson)
          
          if(responseJson.message ==="Unauthenticated.")
          {
            Global.MSG('Your Session Expired');
            this.props.navigation.navigate('HomePage');
            return;
          }
            if(responseJson.success){
                 Alert.alert('Sign Up Complete','You have successfully created account Please Login. ')
                 this.props.navigation.navigate('EmployeeSignIn')
            }else{
              if(responseJson.msg === 'The email has already been taken.')
              {
                this.props.navigation.navigate('EmployeeSignUp');
              }
             Global.MSG(responseJson.msg)
             this.setState({isLoading:false})
              console.log("Error in signUP :",responseJson.msg)
            }
         
       })
       .catch((error) => {
       Global.MSG('Server Error');
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
        isLoading:false
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

  console.log("Error In Company Profile",error);
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
      const {Name,Bank,AC,IFSCCODE,isLoading} = this.state;

      if(!isLoading)
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
                 
                 <View style={{padding:15}}>

                    <Button block full style={[app.btn,app.borderPurpal,{marginLeft:-2.7,marginBottom:25}]} onPress={()=>{ this.checkValidation()}}><Title>Submit</Title></Button>
                 
                    
                    <Button block full style={[app.btn,app.btnPink,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this._onBack();}}><Title>Back</Title></Button>
                    </View>
                  </Card>
                </KeyboardAvoidingView>


              </Content> 

              

          </Container>

        );
        else
        return <Processing/>
    }
}

const styles ={ btn:[app.btn,app.btnPurple,{marginBottom:20,}]}