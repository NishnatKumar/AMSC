import React, { Component } from 'react';
import {StatusBar,KeyboardAvoidingView,StyleSheet,ToastAndroid,NetInfo,Alert} from 'react-native';
import { Container, Header, Content, Form, Icon,Item, Input,Picker,Text, Label, Button,Card,CardItem,Body, Title, Thumbnail, View, Toast } from 'native-base';
import size from '../constants/Layout';
import { processFontFamily } from 'expo-font';
import app from '../constants/app';
import Logo from '../screens/Logo';
import Global from '../constants/Global';
import Processing from './Processing';
import Message from '../constants/Tost';
export default class EmploySignUpScreen extends Component {

  constructor(props)
   {
    super(props);
    this.state = {
     
      name:'',
      isNameError:false,
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

      company:'',

      isLoading:false
    };
  }

 

  componentDidMount()
  {
    const { navigation } = this.props;
    const loginType = navigation.getParam('loginType', null);

    const cmpID = navigation.getParam('companyID',null)
    
    this.setState({loginType:loginType,company:cmpID});
     
  }

 
  onValueChange(value) 
  {
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
        isUserNameErrorMsg:'Enter the Correct Email ',});
        console.log("Error in user ")
    }
   
    else if(password.length < 3)
    {
      this.setState({ isPasswordError:true,
        isPasswordErrorMsg:'Enter the Correct More then 3 digit ',});
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
      console.log("Login Data : ",this.state.loginType);
      if(this.state.loginType != null )
      {
        let data = {email: userName,name:name,password:password,user_type:this.state.loginType,companyID:company}
        
         if(this.state.loginType == 'emp'){
         
          this.props.navigation.navigate('Profile',{'data':data});
        }
         else if(this.state.loginType == 'cmp')
         {

              this.props.navigation.navigate('CompanyProfile',{'data':data});
          }
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

  render()
  {
    if(!this.state.isLoading)
    return (
      <Container>
       <StatusBar backgroundColor="green" barStyle="default" />
      <View style={{height:StatusBar.currentHeight}}></View>
         
      
        <Content>
        
            
         <KeyboardAvoidingView  behavior="padding" enabled>
                <Card transparent style={app.Form} >
                  <Logo></Logo>

                    <View>
                    <Item regular  style={[app.formGroup,this.state.isNameError? app.errorBorder:app.borderPurpal]} >
                      
                        <Input placeholder="Name" value={this.state.name} textContentType='name' onChangeText={(text)=>{this.setState({name:text})}}  />
                    </Item> 
                    
                    <Text style={app.errorMsg}>
                      {this.state.isNameErrorMsg}
                    </Text>
                    </View>

                    <View>
                    <Item regular  style={[app.formGroup,this.state.isUserNameError? app.errorBorder:app.borderPurpal]} >
                      
                        <Input placeholder="Email"  value={this.state.userName} textContentType='username' onChangeText={(text)=>{this.setState({userName:text})}}  />
                    </Item> 
                    <Text style={app.errorMsg}>
                      {this.state.isUserNameErrorMsg}
                    </Text>
                    </View>

                    <View>
                    <Item regular  style={[app.formGroup,this.state.isPasswordErrorMsg? app.errorBorder:app.borderPurpal]}>
                        
                        <Input placeholder="Password" value={this.state.password} textContentType='newPassword' secureTextEntry={true} onChangeText={(text)=>{this.setState({password:text})}}  />
                    </Item>  
                    <Text style={app.errorMsg}>
                      {this.state.isPasswordErrorMsg}
                    </Text>
                    </View>

                    <View>
                     <Item regular  style={[app.formGroup,this.state.isCPasswordErrorMsg? app.errorBorder:app.borderPurpal]}>
                      
                        <Input placeholder="Confirm Password"  value={this.state.cpassword} textContentType='password' secureTextEntry={true} onChangeText={(text)=>{this.setState({cpassword:text})}}  />
                    </Item>  
                    <Text style={app.errorMsg}>
                      {this.state.isCPasswordErrorMsg}
                    </Text> 
                    </View>

                    
                  
                
                   
                       
                    
            </Card>

                  
                    
            </KeyboardAvoidingView>
            <View style={{ marginLeft:11 }}>
            <Button block danger style={styles.btn} onPress={()=>{console.log("Next Press");this.checkValidation();}}  ><Text > Sign UP </Text></Button>
            
            <Button  transparent style={{alignSelf:'center',marginTop:10}} onPress={()=>{console.log("SignUp"); this.props.navigation.navigate('EmployeeSignIn'); }} ><Text style={{color:'#bfc2c7',fontSize:15,fontFamily:'AlegreyaRegularItalic',}} > Already Have An Account ?</Text><Text style={{color:'#FF00DD',fontSize:15,fontFamily:'AlegreyaRegularItalic',textDecorationLine:'underline',textDecorationColor:'#000000' }} > Login </Text></Button> 
            </View>      
                   
               
        </Content>
       
      </Container>
    );
    else 
      return <Processing/>
  }
}


const styles = {
  btn :[app.btn,app.btnPurple]
}
