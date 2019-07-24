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
  NetInfo,
  ToastAndroid,
  DatePickerAndroid
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





export default class ProfileScreen extends React.Component {

    constructor(props)
    {
        super(props)
        this.state={
                      
                      // post:'',
                      // image:'',
                     
                      gender:'',
                        isgenderError:false,
                          genderErrorMsg:'',

                      StartDate:'Select Join Date',
                      DateOfBirth:'Select DOB', 
                    
                      MobileNumber:'',
                      EmailAddress:'',
                     

                      
                

                      name:'Nishant Kumar',
                        isnameError:false,
                          nameErrorMsg:'',
                      
                      join:'',
                        isjoinError:false,
                          joinErrorMsg:'',
                      
                      DOB:'',
                        isDOBError:false,
                          DOBErrorMsg:'',

                      resume:null,
                        isresumeError:false,
                          resumeErrorMsg:'',

                      pic:null,
                        ispicError:false,
                          picErrorMsg:'',

                      phone:'',
                        isphoneError:false,
                          phoneErrorMsg:'',
                      
                      
                      address:{
                        address:' B-103,  Samudra,',
                        street:' Navrangpura',
                        city:'Ahmedabad',
                        state:'Gujarat',
                        pincode:'380009',
                        email:'info@depixed.com',
                       
                  },
                isaddressError:false,
                  addressErrorMsg:'',

                      
                        
                    }
              console.log("In profile")
    }


    componentDidMount()
    {
      const { navigation } = this.props;
      const value =navigation.getParam('userData', 'NO-ID');
      if(value!= null)
      {
        this.setState({name:value.name,userID:value.id}); 
      }
      console.log("USer Data : ",value);


    }

  static navigationOptions = {
        header: null
    }

    
  onValueChnageAddress(text,key){
    console.log("Text : ",text);
    console.log("Key ",key);
   let tempAddress = this.state.address;

    if(key == 'Office')
    {

      tempAddress.address = text;
      this.setState({address:tempAddress});
     
    }
    else if(key == 'Street')
    {

      tempAddress.street = text;
      this.setState({address:tempAddress});
     
    }
    else if(key == 'City')
    {

      tempAddress.city = text;
      this.setState({address:tempAddress});
     
    }
    else if(key == 'State')
    {

      tempAddress.state = text;
      this.setState({address:tempAddress});
     
    }
    else if(key == 'Url')
    {
      tempAddress.state = text;
      this.setState({url:tempAddress});
    }
    
    else if(key == 'Title')
    {
      this.setState({companyname:text})
    }
    else if(key == 'Reg')
    {
      this.setState({regNo:text})
    }
    else if(key == 'Owner')
    {
      this.setState({owner:text})
    }
    
    
}

  async _onDocument()
    {

      try {

          const { type, uri, name, size } =await DocumentPicker.getDocumentAsync({type:'image/*',copyToCacheDirectory:true});



            if(type == 'success')
            {

              console.log("File selected ",size);
              console.log("File selected ",uri);
              console.log("File selected ",name);
              this.setState({resume:{ type:'image/*', uri, name, size }});

            }
            else
            console.log("File Note Selected");

          } catch (e) {
            console.log(e.message)
            console.log(e.stack)
        }
        
    }


  async  _profilePic()
  {

    try {

      const { type, uri, name, size } =await DocumentPicker.getDocumentAsync({type:'image/*',copyToCacheDirectory:true});

        console.log("File Type ",type)

        if(type == 'success')
        {

          console.log("File selected ",size);
          console.log("File selected ",uri);
          console.log("File selected ",name);
          this.setState({pic:{ type:'image/*', uri, name, size }});

        }
        else
        console.log("File Note Selected");

      } catch (e) {
        console.log(e.message)
        console.log(e.stack)
    }

  }
// Use `new Date()` for current date.
          // May 25 2020. Month 0 is January.
          // Selected year, month (0-11), day
          //const {action, year, month, day} 
   async cylender()
    {
        try {
          const {action, year, month, day} = await DatePickerAndroid.open({           
            date: new Date()
        });

        if (action !== DatePickerAndroid.dismissedAction) {
            // console.log(day+' - '+month+' - '+year)
           return day+'-'+month+'-'+year
            
        }
      } catch ({code, message}) {
        console.warn('Cannot open date picker', message);
      }
      
    }

    async onDOBDate()
    {
      let date = await this.cylender();
     await this.setState({DateOfBirth :'DOB : '+date, DOB:date });
     console.log("DOB Date : ",date);
    }

   async onJoinDate()
    {
      let date = await this.cylender();
     await this.setState({StartDate:'Join Date : '+date, join:date });
     console.log("Join Date : ",date);
    }

    checkVAlidation()
    {
      console.log("In Check validation");
      const {gender,join,DOB,resume,pic,phone,address} = this.state;
      let data = null;
      if(gender =='')
      {
        console.log("Gender Not selected");
      }
      else if(resume == null)
      {
        console.log("Document Selected");
      }
      else if(pic == null)
      {
        console.log("Pic not selected");
      }
      else
      {
        console.log("VAlidation PAss");
       data = {gender:gender,join:join,DOB:DOB,resume:resume,pic:pic,address:address}
      }
      return data;
    }

  async  _onNext()
    {
      console.log("Ein next");
     let data = await this.checkVAlidation();
      if(data!=null)
      {
        console.log("Next Press");
       this.props.navigation.navigate('Bank',{data:data });
      }
      else
      {
          console.log("Error in ");
      }

     
    }
  
    render(){

      const {address} = this.state
        return (
          
          <Container>
            <StatusBar backgroundColor="green" barStyle="default" />
              <View style={{marginTop:15}}></View>
              <Content>
              <Title style={app.title}>Profile </Title>
                  <Card style={app.Form} transparent >
                 
                    <View>
                      <Title style={[app.placeholder,{color:'#000000',fontWeight:'900'}]}>{this.state.name} </Title>
                    </View>
                        
                       
                 

                    <View style={[app.btn,app.btnPurpal,{marginLeft:-2.7,marginBottom:15}]}>
                          <Picker
                            mode="dialog"
                            placeholder="Select Gender"
                            iosIcon={<Icon name="arrow-down" color='#ffffff' />}
                            placeholder="Select Gender"
                            textStyle={{ color: "#ffffff" }}
                            itemStyle={{
                              backgroundColor: "#d3d3d3",
                              marginLeft: 0,
                              paddingLeft: 10
                            }}
                            itemTextStyle={{ color: '#788ad2' }}
                            style={{ width: undefined,borderColor:'#16bdf5',color:'#ffffff',borderWidth:0.5 ,marginTop:10}}
                            selectedValue={this.state.gender}
                            onValueChange={(itemValue, itemIndex)=>{
                              console.log("Item Value :",itemValue);
                              this.setState({gender: itemValue})}}
                          
                          >
                            <Picker.Item label="Select Gender" value="" />
                            <Picker.Item label="Female" value="F" />
                            <Picker.Item label="Male" value="M" />
                            <Picker.Item label="Other" value="O" />
                            
                          </Picker> 
                    </View>

                    <Button block full style={[app.btn,app.btnPurpal,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this.onJoinDate();console.log("Cylender Click")}}><Title>{this.state.StartDate}</Title></Button>
                    <Button block full style={[app.btn,app.btnPurpal,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this.onDOBDate();console.log("Cylender Click")}}><Title>{this.state.DateOfBirth}</Title></Button>
                    <View style={{justifyContent: 'space-between' , flexDirection: 'row',  }}>
                          <Item regular style={[{marginBottom:20,width:(size.window.width/2)-20},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPink]} >
                            <Input placeholder="Office" value={address.address} onChangeText={(text)=>{this.onValueChnageAddress(text,'Office')}} style={{}} />
                          </Item>
                          <Item regular style={[{marginBottom:20,width:(size.window.width/2)-20},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPink]} >
                            <Input value={address.street} onChangeText={(text)=>{this.onValueChnageAddress(text,'Street')}} placeholder="Street" style={{}} />
                          </Item>
                  </View>

                    <Item regular style={[{marginBottom:20},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPink]} >
                      <Input value={address.city} onChangeText={(text)=>{this.onValueChnageAddress(text,'City')}} placeholder="City" style={{}} />
                    </Item>
                    <Item regular style={[{marginBottom:20},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPink]} >
                      <Input value={address.state} onChangeText={(text)=>{this.onValueChnageAddress(text,'State')}} placeholder="State" style={{}} />
                    </Item>
                    <Button block full style={[app.btn,app.btnPurpal,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this._onDocument();console.log("Cylender Click")}}><Title>Select Document    + </Title></Button>
                            
                    <Button block full style={[app.btn,app.btnPurpal,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this._profilePic();console.log("Cylender Click")}}><Title>Select Pic    + </Title></Button>
                  
                   
                   
                    <Button block full style={[app.btn,app.btnPink,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this._onNext();}}><Title>Next</Title></Button>
                 
                  </Card>
                  
              </Content>

              

          </Container>

        );
    }
}

const styles ={ btn:[app.btn,app.btnPurpal,{marginBottom:20,}]}