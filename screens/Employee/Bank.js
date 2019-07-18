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
  KeyboardAvoidingView
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





export default class BankScreen extends React.Component {

    constructor(props)
    {
        super(props)
        this.state={
                      AC:'Nishant Kumar',
                    isACError:false,
                    errorACMsg:'',



                      IFCCODE:'',
                      isIFCError:false,
                        errorIFSCMsg:'',

                    Name:'',
                    isNameError:false,
                        errorNameCMsg:'',

                    Bank:'',
                    isBankError:false,
                        errorBankCMsg:'',


                        
                    }
    }

  static navigationOptions = {
    header: null
}



    _onBack()
    {
      this.props.navigation.navigate('Profile');
    }

    _submit()
    {
      console.log("Submit Press");
    }
    
    render(){
        return (
          
          <Container>
            <StatusBar backgroundColor="green" barStyle="default" />
              <View style={{marginTop:15}}></View>
              
              <Content>
              <KeyboardAvoidingView  behavior="padding" enabled>

         
              <Title style={app.title}>Bank Detail </Title>

                  <Card style={app.Form} transparent>

                    <Item regular style={[app.formGroup,app.borderPurpal,{marginBottom:20} ] }>
                         <Input  keyboardType="phone-pad" returnKeyType="go" placeholder="BANK NAME" placeholderTextColor="#dcdcde" onChangeText={(text)=>{console.log(this.state.phone);this.setState({phone:text});}} textContentType="telephoneNumber" onSubmitEditing={()=>{console.log('Go Press')}}/>

                    </Item>

                    <Item regular style={[app.formGroup,app.borderPurpal,{marginBottom:20}  ] }>
                         <Input  keyboardType="phone-pad" returnKeyType="go" placeholder="ACCOUNT HOLDER NAME" placeholderTextColor="#dcdcde" onChangeText={(text)=>{console.log(this.state.phone);this.setState({phone:text});}} textContentType="telephoneNumber" onSubmitEditing={()=>{console.log('Go Press')}}/>

                    </Item>

                    <Item regular style={[app.formGroup,app.borderPurpal,{marginBottom:20} ] }>
                         <Input  keyboardType="phone-pad" returnKeyType="go" placeholder="ACCOUNT NUMBER" placeholderTextColor="#dcdcde" onChangeText={(text)=>{console.log(this.state.phone);this.setState({phone:text});}} textContentType="telephoneNumber" onSubmitEditing={()=>{console.log('Go Press')}}/>

                    </Item>
                        
                    <Item regular style={[app.formGroup,app.borderPurpal,{marginBottom:20} ] }>
                         <Input  keyboardType="phone-pad" returnKeyType="go" placeholder="ACCOUNT IFSC CODE" placeholderTextColor="#dcdcde" onChangeText={(text)=>{console.log(this.state.phone);this.setState({phone:text});}} textContentType="telephoneNumber" onSubmitEditing={()=>{console.log('Go Press')}}/>

                    </Item>
                 

                    <Button block full style={[app.btn,app.borderPurpal,{marginLeft:-2.7,marginBottom:25}]} onPress={()=>{this._onSubmit();console.log("Next Click")}}><Title>Submit</Title></Button>
                 
                 
                    <Button block full style={[app.btn,app.btnPink,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this._onBack();console.log("Next Click")}}><Title>Back</Title></Button>
                    
                  </Card>
                </KeyboardAvoidingView> 
              </Content>

              

          </Container>

        );
    }
}

const styles ={ btn:[app.btn,app.btnPurpal,{marginBottom:20,}]}