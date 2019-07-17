import React, { Component } from 'react';
import {StatusBar,KeyboardAvoidingView,StyleSheet} from 'react-native';
import { Container, Header, Content, Form, Item, Input,Text, Label, Button,Card,CardItem,Body, Title, Thumbnail, View, Subtitle } from 'native-base';
import size from '../constants/Layout';
import Logo from './Logo';

export default class ResetPasswordScreen extends Component {

  constructor(props){
    super(props);
    this.state={
                  password:'',
                  ispassworderror:false,
                  
                  errorMsgpassword:'',
                  errorMsgcpassword:'',
                 
                  cpassword:'',
                  iscpassworderror:false,
                  
                }
  }

    static navigationOptions = {
        header: null
    }

    // check the validation ofn forgot password 
    checkValidation=()=>{
      let password =this.state.password;
      let cpassword = this.state.cpassword;

      this.setState({errorMsgpassword:'',ispassworderror:false,errorMsgcpassword:'',iscpassworderror:false});

      if(password.length < 3)
      {
        this.setState({errorMsgpassword:'Enter Password more the 3 digit',ispassworderror:true});

      }
      else if(password != cpassword)
      {
        

        this.setState({errorMsgcpassword:'Password not match ',iscpassworderror:true});
        
      }
      else{
        this.sendpassword(password);
      }

    }

    

    // send password on server to change 
    sendpassword(password)
    {
      console.log("Password chnage Your new password is "+this.state.password);
    }

  render() {
    return (
      <Container>
      <StatusBar backgroundColor="green" barStyle="default" />
         
       
        <Content>
        
            
         <KeyboardAvoidingView  behavior="position" enabled>
                <Card transparent>
                  <Logo></Logo>
              
                    <Title style={styles.tile} >Reset your password ?</Title>
                  
                    <Item  regular floatingLabel style={{margin:5,borderColor:this.state.ispassworderror?'#f51616':'#16bdf5'}}>
                          <Label style={{margin:5}}>New Password</Label>
                          <Input  secureTextEntry={true} returnKeyType="go" onChangeText={(text)=>{console.log(this.state.password);this.setState({password:text});}} textContentType="newPassword" onSubmitEditing={()=>{console.log('Go Press')}}/>

                    </Item>
                    <Text style={{fontSize:12,color:'red',fontStyle:'italic' }}>{this.state.errorMsgpassword}</Text>  
                   
               

                   
                    <Item  regular floatingLabel style={{marginTop:10,borderColor:this.state.iscpassworderror?'#f51616':'#16bdf5' }}>
                          <Label style={{margin:5}}>Confirm Password</Label>
                          <Input  secureTextEntry={true} returnKeyType="go" onChangeText={(text)=>{console.log(this.state.cpassword);this.setState({cpassword:text});}} textContentType="password" onSubmitEditing={()=>{console.log('Go Press')}}/>

                    </Item>
                    <Text style={{fontSize:12,color:'red',fontStyle:'italic' }}>{this.state.errorMsgcpassword}</Text>  
                  
                    <Button block full style={{alignSelf:'center',marginTop:5}} success onPress={()=>{console.log("Submit cpassword");this.checkValidation(); }} ><Text>Submit</Text></Button>


                    
                    
            </Card>
            </KeyboardAvoidingView>
                   
                   
               
        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
    tile:{color:'#000000',fontSize:25,fontWeight:'900',fontFamily:'ExpoConBol' },
    subtitle:{color:'#a1a1a1',fontSize:15}
  })