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
import Time from '../../constants/Time';
import * as DocumentPicker from 'expo-document-picker';





export default class CompanyProfileScreen extends React.Component {

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
      this.props.navigation.navigate('Bank');
    }
    
    render(){
        return (
          
          <Container>
            <StatusBar backgroundColor="green" barStyle="default" />
              <View style={{marginTop:15}}></View>
              <Content>
              <Title style={app.title}>Details </Title>
                  <Card style={app.Form} transparent >
                 
                    <View>
                      <Title style={[app.placeholder,{color:'#000000',fontWeight:'900'}]}>{this.state.name} </Title>
                    </View>
                        
                       
                 

                    <View style={[app.btn,app.btnPink,{marginLeft:-2.7,marginBottom:15}]}>
                          <Picker
                            mode="dialog"
                            placeholder="Select Company Type"
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
                            <Picker.Item label="Select Company Type" value="" />
                            {/* <Picker.Item label="Female" value="F" />
                            <Picker.Item label="Male" value="M" />
                            <Picker.Item label="Other" value="O" /> */}
                            
                          </Picker> 
                    </View>
{/* 
                    <Button block full style={[app.btn,app.btnPurpal,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this.onJoinDate();console.log("Cylender Click")}}><Title>{this.state.StartDate}</Title></Button>
                    <Button block full style={[app.btn,app.btnPurpal,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this.onDOBDate();console.log("Cylender Click")}}><Title>{this.state.DateOfBirth}</Title></Button> */}
                    <Item regular style={[{marginBottom:20},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPink]} >
                      <Input placeholder="Title" style={{}} />
                    </Item>

                    <Item regular style={[{marginBottom:20},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPink]} >
                      <Input placeholder="Reg. No." style={{}} />
                    </Item>

                    <Item regular style={[{marginBottom:20},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPink]} >
                      <Input placeholder="Owner Name" style={{}} />
                    </Item>

                    <Item regular style={[{marginBottom:20},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPink]} >
                      <Input placeholder="Website" style={{}} />
                    </Item>


                    <Button block full style={[app.btn,app.btnPink,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this._onDocument();console.log("Cylender Click")}}><Title>Select Location    + </Title></Button>
                    
                    <Button block full style={[app.btn,app.btnPink,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this._onDocument();console.log("Cylender Click")}}><Title>Select Logo    + </Title></Button>
                    <Button block full style={[app.btn,app.btnPurpal,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this._save();console.log("Next Click")}}><Title>Save</Title></Button>
                 
                  </Card>
                  
              </Content>

              

          </Container>

        );
    }
}

const styles ={ btn:[app.btn,app.btnPurpal,{marginBottom:20,}]}