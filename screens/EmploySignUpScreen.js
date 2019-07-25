import React, { Component } from 'react';
import {StatusBar,KeyboardAvoidingView,StyleSheet,ToastAndroid,NetInfo} from 'react-native';
import { Container, Header, Content, Form, Icon,Item, Input,Picker,Text, Label, Button,Card,CardItem,Body, Title, Thumbnail, View, Toast } from 'native-base';
import size from '../constants/Layout';
import { processFontFamily } from 'expo-font';
import app from '../constants/app';
import Logo from '../screens/Logo';
import Global from '../constants/Global';
import Processing from './Processing';
import Message from '../constants/Tost';
export default class EmploySignUpScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      company: "",
      isCompanyError:false,
      isCompanyErrorMsg:'',

      name:'',
      isNameErorr:false,
      isNameErrorMsg:'',

      userName:'',
      isUserNameError:false,
      isUserNameErrorMsg:'',

      password:'',
      isPasswordError:false,
      isPasswordErrorMsg:'',

      cpassword:'',
      isCPasswordError:false,
      isCPasswordErrorMsg:'',

      loginType:null,
      cmpID:null,

      isLoding:false
    };
  }




  _httpSignUp = async (data) => {
    var connectionInfoLocal = '';
    NetInfo.getConnectionInfo().then((connectionInfo) => {
     
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
        fetch(Global.API_URL+'register', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',   
              'Content-Type':'application/json'   
            },
            body: JSON.stringify(data)
          }).then((response) =>response.json() )
          .then((responseJson) => {
           
             this.setState({isLoding:false});
           
             if(responseJson.success){
               Message('Enter Userid And Password to login');
             
             this.setState({
               isLoding:false,
             });
             this.props.navigation.navigate('EmployeeSignIn');
             }else{
             
               this.setState({
                 isLoding:false,
               });
 
               console.log("Error in signUP :")
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
          this.setState({isLoding:false});
          console.log('on error fetching:'+error);
          //  this._httpSignUp(data);
        });
      }
    });
    console.log(connectionInfoLocal);
  }

  componentWillMount()
  {
    const { navigation } = this.props;
    const loginType = navigation.getParam('loginType', 'NO-ID');

    const cmpID = navigation.getParam('cmpID',null)
    
    this.setState({loginType:loginType,
                    cmpID:cmpID});
      console.log(" Login : "+loginType+" : "+cmpID);
  }

  onValueChange(value) {
    this.setState({
      company: value
    });
  }

    static navigationOptions = {
        header: null
    }

  // This function will check all the validation rule
  checkValidation()
  {
    try {
      
  
    console.log("On check validation");
    let userName = this.state.userName;
    let cpassword = this.state.cpassword;
    let password = this.state.password;
    let company = this.state.company;
    let name = this.state.name;
    this.resetFunction();
    if(name.length < 3)
    {
      this.setState({ isNameErorr:true,
        isNameErrorMsg:'Enter the Correct Name ',});
        console.log("Error in name")
    }
    else if(userName.length < 3)
    {
      this.setState({ isUserNameError:true,
        isUserNameErrorMsg:'Enter the Correct Name ',});
        console.log("Error in user ")
    }
    else if(company != '')
    {
      this.setState({ isCompanyError:true,
        isCompanyErrorMsg:'Enter the Correct Name ',});
        console.log("Error in company")
    }
    else if(password.length < 3)
    {
      this.setState({ isPasswordError:true,
        isPasswordErrorMsg:'Enter the Correct Name ',});
        console.log("Error in passs")
    }
    else if(password != cpassword)
    {
      this.setState({ isCPasswordError:true,
        isCPasswordErrorMsg:'Password Not Match',});
        console.log("Error in cpass")
    }
    else
    {
      if(this.state.loginType == 'cmp' )
      {
          let data = {email: userName,name:name,c_password:cpassword,password:password,user_type:this.state.loginType,}
          this._httpSignUp(data);
          console.log("Data Save .....")
      }else
      if(this.state.loginType == 'emp' && this.state.cmpID !=null )
      {
          let data = {email: userName,name:name,c_password:cpassword,password:password,user_type:this.state.loginType,company_id:this.state.cmpID}
          this._httpSignUp(data);
          console.log("Data Save .....",data)
      }
      else{console.log("Error in login ");}
    }
  } catch (error) {
      console.log("Error in Em0ploy Signup ",error);
  }
    
  }


  // this function is use to reset
  resetFunction()
  {
    this.setState({
                   
                    isCompanyError:false,
                    isCompanyErrorMsg:'',

                 
                    isNameErorr:false,
                    isNameErrorMsg:'',

                   
                    isUserNameError:false,
                    isUserNameErrorMsg:'',

                   
                    isPasswordError:false,
                    isPasswordErrorMsg:'',

                   
                    isCPasswordError:false,
                    isCPasswordErrorMsg:''
                  });
  }
  render() {
    if(!this.state.isLoding)
    return (
      <Container>
      <StatusBar backgroundColor="green" barStyle="default" />
         
      
        <Content>
        
            
         <KeyboardAvoidingView  behavior="padding" enabled>
                <Card transparent style={app.Form} >
                  <Logo></Logo>

                    
                    <Item regular floatingLabel style={[app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPurpal]} >
                        <Label style={app.placeholder}>Name</Label>
                        <Input value={this.state.name} textContentType='name' onChangeText={(text)=>{this.setState({name:text})}}  />
                    </Item> 
                    
                    <Text style={app.errorMsg}>
                      {this.state.isNameErrorMsg}
                    </Text>


                    <Item regular floatingLabel style={[app.formGroup,this.state.userName? app.errorBorder:app.borderPurpal]} >
                        <Label style={app.placeholder}>Username</Label>
                        <Input  value={this.state.userName} textContentType='username' onChangeText={(text)=>{this.setState({userName:text})}}  />
                    </Item> 
                    <Text style={app.errorMsg}>
                      {this.state.isUserNameErrorMsg}
                    </Text>
                    <Item regular floatingLabel style={[app.formGroup,this.state.isPasswordErrorMsg? app.errorBorder:app.borderPurpal]}>
                        <Label style={app.placeholder}>Password</Label>
                        <Input  value={this.state.password} textContentType='newPassword' secureTextEntry={true} onChangeText={(text)=>{this.setState({password:text})}}  />
                    </Item>  
                    <Text style={app.errorMsg}>
                      {this.state.isPasswordErrorMsg}
                    </Text>

                     <Item regular floatingLabel style={[app.formGroup,this.state.isCPasswordErrorMsg? app.errorBorder:app.borderPurpal]}>
                        <Label style={app.placeholder}>Confirm Password</Label>
                        <Input  value={this.state.cpassword} textContentType='password' secureTextEntry={true} onChangeText={(text)=>{this.setState({cpassword:text})}}  />
                    </Item>  
                    <Text style={app.errorMsg}>
                      {this.state.isCPasswordErrorMsg}
                    </Text> 

                    
                  
                
                   
                       
                    
            </Card>

            <Button block danger style={styles.btn} onPress={()=>{console.log("Next Press");this.checkValidation();}}  ><Text > Sign UP </Text></Button>
                   
                    
            </KeyboardAvoidingView>
            <Button  transparent style={{alignSelf:'center',marginTop:10}} onPress={()=>{console.log("SignUp"); this.props.navigation.navigate('EmployeeSignIn'); }} ><Text style={{color:'#bfc2c7',fontSize:15,fontFamily:'AlegreyaRegularItalic',}} > Already Have An Account ?</Text><Text style={{color:'#FF00DD',fontSize:15,fontFamily:'AlegreyaRegularItalic',textDecorationLine:'underline',textDecorationColor:'#000000' }} > Login </Text></Button> 
           
                   
                   
               
        </Content>
      </Container>
    );
    else 
      return <Processing/>
  }
}

// const styles= StyleSheet.create({
//   lable:{ marginLeft:10},
//   item:{
//     marginTop:5
//   },
//   errorMsg:{
//     color:'red',
//     fontSize:10,
//     fontStyle:'italic',
//   },
//   error:{
//     borderColor:'#fa0a3a',
    
//   },
//   normalItem:{
//     borderColor:'#16bdf5',
//   }
// })

const styles = {
  btn :[app.btn,app.btnPurpal]
}

// TODO : 
/**style={{marginTop:size.window.height/8,padding:20 }} */