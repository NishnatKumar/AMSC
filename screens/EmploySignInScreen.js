import React, { Component } from 'react';
import {StatusBar,KeyboardAvoidingView} from 'react-native';
import { Container, Header, Content, Form, Item, Input,Text, Label, Button,Card,CardItem,Body, Title, Thumbnail, View } from 'native-base';
import size from '../constants/Layout';
import { processFontFamily } from 'expo-font';
import app from '../constants/app';
import Logo from './Logo';
export default class EmploySignInScreen extends Component {

    constructor(props)
    {
      super(props)
      this.state={
                    username:'',
                    isUsernameError:false,
                    usernameErrorMsg:'',

                    password:'',
                    isPasswordError:false,
                    passwordErrorMsg:'',

                    errorMsg:''
                }
    }

    static navigationOptions = {
        header: null
    }

    checkValidation()
    {
      console.log("In check validation ");
      this.setState({
       
        isUsernameError:false,
        usernameErrorMsg:'',

        
        isPasswordError:false,
        passwordErrorMsg:''
    })
      let username = this.state.username;
      let password = this.state.password;

      if(username.length <3 )
      {
        this.setState({errorMsg :'Enter The Correct Username',
                        isUsernameError:true});
      }
      else if(password.length <3)
      {
        this.setState({
          isPasswordError:true,
          errorMsg :'Enter The Correct password',})

      }
      else
      {
          let data={username:username,password:password};
          this._httpLogin(data);
      }   


    }

    _httpLogin(data)
    {
        if(data.username == 'admin' && data.password == 'admin2' )
        {
          console.log("Login");
        }
        else{
          this.setState({
            isPasswordError:true,
            errorMsg :'Enter The Correct username and  password',})
        }
    }

  render() {
    return (
      <Container>
      <StatusBar backgroundColor="green" barStyle="default" />
         
      
        <Content>


            
         <KeyboardAvoidingView  behavior="padding" enabled>

                <Logo></Logo>
                <Card transparent style={{marginTop:5,padding:20 }}>
               
                  { this.state.errorMsg.length !=0 ?
                    <View style={{margin:10, backgroundColor:'#ebb7c1',borderWidth:0.5,borderColor:'red',borderRadius:5,padding:7}}>
                      <Text style={{fontSize:20,color:'red'}}>{this.state.errorMsg}</Text>
                    </View>
                    :
                    <Text></Text>
                  }                  
                    <Item regular floatingLabel style={[app.formGroup,this.state.usernameErrorMsg? app.errorMsg:app.borderPurpal]} >
                        <Label style={app.placeholder} >Username</Label>
                        <Input textContentType="username" keyboardType="default" />
                    </Item> 
                    
                    <Item regular floatingLabel style={[app.formGroup,this.state.usernameErrorMsg? app.errorMsg:app.borderPurpal,{marginTop:size.window.height/10}]}>
                        <Label style={app.placeholder}>Password</Label>
                        <Input textContentType="password"  />
                    </Item>  
                   
            <Button transparent  style={{alignSelf:'flex-end' }} primary onPress={()=>{console.log("Login Press");
                    this.props.navigation.navigate('ForgatePassword');}}  ><Text style={{color:'#a6a4a8',fontSize:15}} > Forgot Password? </Text></Button>



                
                   
                       
                    
            </Card>


            <Button block danger style={styles.btn} onPress={()=>{console.log("Login Press"); this.checkValidation(); }}  ><Text > Login  </Text></Button>
                   
                  
            </KeyboardAvoidingView>
            <Button  transparent style={{alignSelf:'center',marginTop:10}} onPress={()=>{console.log("SignUp");}} ><Text style={{color:'#bfc2c7',fontSize:15,fontFamily:'AlegreyaRegularItalic',}} > Don't have an account?</Text><Text style={{color:'#FF00DD',fontSize:15,fontFamily:'AlegreyaRegularItalic',textDecorationLine:'underline',textDecorationColor:'#000000' }} > SignUp </Text></Button> 
           
                   
               
        </Content>
        </Container>
    );
  }
}

const styles={btn:[app.btnPurpal,app.btn]}