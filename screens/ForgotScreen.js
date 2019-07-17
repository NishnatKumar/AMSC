import React, { Component } from 'react';
import {StatusBar,KeyboardAvoidingView,StyleSheet} from 'react-native';
import { Container, Header, Content, Form, Item, Input,Text, Label, Button,Card,CardItem,Body, Title, Thumbnail, View, Subtitle } from 'native-base';
import size from '../constants/Layout';
import Logo from './Logo';
import app from '../constants/app';

export default class ForgotScreen extends Component {

  constructor(props){
    super(props);
    this.state={
                  phone:'',
                  isphoneerror:false,
                  
                  errorMsgPhone:'',
                  errorMsgOTP:'',
                 
                  OTP:'',
                  isOTPerror:false,
                  // TODO: make it false
                  isOTPsend:true,
                }
  }

    static navigationOptions = {
        header: null
    }

    // check the validation ofn forgot password 
    checkValidation=()=>{
      let phone =this.state.phone;

      if(phone.length != 10)
      {
        this.setState({errorMsgPhone:'Enter Phone Number',isphoneerror:true});

        
      }
      else
      {
        this.setState({errorMsgPhone:'',isphoneerror:false});
        this.reciveOTP(phone);
      }

    }

    // Recive OTP to the number
    reciveOTP(phone)
    {
      console.log("OTP Send on "+phone);
      this.setState({isOTPsend:true})
    }

    sendOTP()
    {
      let otp = this.state.OTP;

      if(otp.length != 6)
      {
        this.setState({errorMsgOTP:'Enter OTP',isOTPerror :true});

        
      }
      else
      {
        this.setState({errorMsgPhone:'',isOTPerror:false});
        this.props.navigation.navigate('ResetPassword');
        //this.reciveOTP(phone);
      }
    }

  render() {
    return (
      <Container>
      <StatusBar backgroundColor="green" barStyle="default" />
         
        
        <Content>
        
            
         <KeyboardAvoidingView  behavior="padding" enabled>
                <Logo></Logo>
                <Card transparent style={{marginTop:size.window.height/10 }}>
              
                
                  <Title style={app.tile} >Forgot Password ? </Title>
                  <Subtitle style={styles.subtitle}>
                  Enter Your Registered Phone No. for OTP.
                  </Subtitle>
                    <Item  regular floatingLabel style={[app.formGroup,{marginHorizontal:10},this.state.isphoneerror?app.errorMsg:app.borderPurpal]}>
                          <Label style={app.placeholder}>Phone</Label>
                          <Input  keyboardType="phone-pad" returnKeyType="go" onChangeText={(text)=>{console.log(this.state.phone);this.setState({phone:text});}} textContentType="telephoneNumber" onSubmitEditing={()=>{console.log('Go Press')}}/>

                    </Item>
                    <Text  style={{fontSize:12,color:'red',fontStyle:'italic' }}>{this.state.errorMsgPhone}</Text>  
                    <Button style={styles.btn} block full primary onPress={()=>{console.log("Send OTP");this.checkValidation();}} disabled={this.state.isOTPsend} ><Text>Send OTP</Text></Button>
                  { this.state.isOTPsend?
                    <View style={{marginTop:10}}>

                    <Text style={{color:'#bdbfbe', fontSize:18,fontStyle:'normal' }}>OTP Sent on {this.state.phone} Check for OTP </Text>

                    <Item  regular floatingLabel style={[app.formGroup,{marginHorizontal:10},this.state.isphoneerror?app.errorMsg:app.borderPurpal]}>
                          <Label style={app.placeholder}>OTP</Label>
                          <Input  keyboardType="phone-pad" returnKeyType="go" onChangeText={(text)=>{console.log(this.state.OTP);this.setState({OTP:text});}} textContentType="telephoneNumber" onSubmitEditing={()=>{console.log('Go Press')}}/>

                    </Item>
                    <Text style={{fontSize:12,color:'red',fontStyle:'italic' }}>{this.state.errorMsgOTP}</Text>  
                  
                    <Button block full style={styles.btn} success onPress={()=>{console.log("Submit Otp");this.sendOTP(); }} ><Text>Submit</Text></Button>


                    <Button transparent style={{alignSelf:'center',marginTop:5}} primary onPress={()=>{console.log("re-Send OTP");}} ><Text style={app.textPurpal} >Re-Send</Text></Button>
                    </View>
                    :

                    <Text></Text>
                  }
                  
                       
                    
            </Card>
            </KeyboardAvoidingView>
                   
                   
               
        </Content>
      </Container>
    );
  }
}

const styles ={
  btn:[app.btn,app.btnPurpal]
}

// const styles = StyleSheet.create({
//     tile:{color:'#000000',fontSize:25,fontWeight:'900',fontFamily:'ExpoConBol' },
//     subtitle:{color:'#a1a1a1',fontSize:15}
//   })