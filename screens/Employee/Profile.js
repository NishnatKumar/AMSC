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
                      name:'Nishant Kumar',
                      post:'',
                      image:'',
                      gender:'',
                      StartDate:'Select Join Date',
                      DateOfBirth:'Select DOB', 
                      Address:'',
                      MobileNumber:'',
                      EmailAddress:'',
                      Resume:''
                        
                    }
    }

  static navigationOptions = {
    header: null
}

    _officeIn()
    {
          this.props.navigation.navigate('QRCode');
          if(this.state.isIN)
          {
            
              let formatted_date = "IN : "+Time();

                console.log("In Office in ",formatted_date);
                this.setState({inTime:formatted_date,isIn:true});

          }

    }

    _officeOut()
    {
        this.props.navigation.navigate('QRCode');
        if(this.state.isOut)
        {
          let formatted_date = "Out : "+Time();

          console.log("Out Office : ",formatted_date);
          this.setState({outTime:formatted_date,isOut:true});
        }
    }

    onValueChange()
    {

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
     await this.setState({DateOfBirth :'DOB : '+date});
     console.log("DOB Date : ",date);
    }

   async onJoinDate()
    {
      let date = await this.cylender();
     await this.setState({StartDate:'Join Date : '+date});
     console.log("Join Date : ",date);
    }

    _onNext()
    {
      console.log("Next Press");
    }
    
    render(){
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
                            selectedValue={this.state.company}
                            onValueChange={this.onValueChange.bind(this)}
                          
                          >
                            <Picker.Item label="Select Gender" value="" />
                            <Picker.Item label="Female" value="F" />
                            <Picker.Item label="Male" value="M" />
                            <Picker.Item label="Other" value="O" />
                            
                          </Picker> 
                    </View>

                    <Button block full style={[app.btn,app.btnPurpal,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this.onJoinDate();console.log("Cylender Click")}}><Title>{this.state.StartDate}</Title></Button>
                    <Button block full style={[app.btn,app.btnPurpal,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this.onDOBDate();console.log("Cylender Click")}}><Title>{this.state.DateOfBirth}</Title></Button>
                    <Item regular style={[{height:110,marginBottom:15},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPurpal]} >
                      <Textarea placeholder="Address" >

                      </Textarea>
                    </Item>
                    <Button block full style={[app.btn,app.btnPurpal,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this._onDocument();console.log("Cylender Click")}}><Title>Select Document    + </Title></Button>
                    <Button block full style={[app.btn,app.btnPink,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this._onNext();console.log("Next Click")}}><Title>Next</Title></Button>
                 
                  </Card>
                  
              </Content>

              

          </Container>

        );
    }
}

const styles ={ btn:[app.btn,app.btnPurpal,{marginBottom:20,}]}