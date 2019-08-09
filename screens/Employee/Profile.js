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
  DatePickerAndroid,
  AsyncStorage,
  KeyboardAvoidingView,
  BackHandler
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
import Global from '../../constants/Global';
import Headers from '../Headers';
import { Avatar } from 'react-native-elements';





export default class ProfileScreen extends React.Component {

    constructor(props)
    {
        super(props)
        this.state={
                      
                    

                      companyList:[],
                     
                      gender:'M',
                        isgenderError:false,
                          genderErrorMsg:'',

                      StartDate:'Select Join Date',
                      DateOfBirth:'Select DOB', 
                    
                     

 
                      companyname:'',

                      name:'',
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

                      email:'',
                      isemailError:false,
                        emailErrorMsg:'',

                      mobile:'',
                        ismobileError:false,
                          mobileErrorMsg:'',

                     
                      
                      address:{
                        address:'',
                        street:'',
                        city:'',
                        state:'',
                        pincode:''
                        
                       
                  },
                isaddressError:false,
                  addressErrorMsg:'',

                isLoading:false,

                data:''
                        
                    }
              console.log("In profile");

             
    }


   async componentDidMount()
    {
       
        const { navigation } = this.props;
        let data = navigation.getParam('data', null);
        this.setState({data:data})
        console.log("Data : ",data);
    }

    componentWillMount() {     
      BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.navigate('EmployeeSignUp'));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () => this.props.navigation.navigate('EmployeeSignUp'));
    }
  

    static navigationOptions = {
        header: null
    }
    
  onValueChange(text,key){
 
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
    else if(key == 'PinCode')
    {
      tempAddress.pincode =text
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
    else if(key == 'Email')
    {
      this.setState({email:text})
    }
    else if(key == 'Mobile')
    {
      this.setState({mobile:text})
    }
    else if(key == 'Name')
    {
      this.setState({name:text})
    }

    
    
}

  async _onDocument()
    {

      try {

          const { type, uri, name, size } =await DocumentPicker.getDocumentAsync({type:'*/*',copyToCacheDirectory:true});



            if(type == 'success')
            {

              let type = name.split(".");
              type = type[type.length-1]
              
              this.setState({resume:{ type:type, uri, name, size }});

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

          let type = name.split(".");
                type = type[type.length-1]

          this.setState({pic:{ type:type, uri, name, size }});

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
   async calender()
    {
        try {
          const {action, year, month, day} = await DatePickerAndroid.open({           
            date: new Date()
        });

        if (action !== DatePickerAndroid.dismissedAction) {
            // console.log(day+' - '+month+' - '+year)
           return  year+'-'+month+'-'+day
            
        }
        else
          return null;
      } catch ({code, message}) {
        console.warn('Cannot open date picker', message);
      }
      
    }

    async onDOBDate()
    {
      let date = await this.calender();


      if(date != null)
     await this.setState({DateOfBirth :'DOB : '+date, DOB:date });
     console.log("DOB Date : ",date);
    }

   async onJoinDate()
    {
      let date = await this.calender();

      if(date != null)
     await this.setState({StartDate:'Join Date : '+date, join:date });
     console.log("Join Date : ",date);
    }

    checkValidation()
    {
      console.log("In Check validation");
      const {gender,join,DOB,resume,pic,mobile,address,name,companyname} = this.state;
      let data = null;
      
      if(gender =='')
      {
        console.log("Gender Not selected");
        this.setState({isgenderError:true,genderErrorMsg:'Select Gender'});
      }
      else if(resume == null)
      {
        console.log("Document Selected");
        this.setState({isresumeError:true,resumeErrorMsg:'Select the Resume'})
      }
      else if(pic == null)
      {
        console.log("Pic not selected");
        this.setState({ispicError:true,picErrorMsg:'Select the Pic'})
      }
    
      else if(name.length < 3)
      {
        console.log("Enter Correct name",name);
        this.setState({isnameErorr:true,nameErrorMsg:'Enter The Correct Name'});
      }
      else if(mobile.length != 10)
      {
        console.log("Enter Correct Mobile no.",mobile);
        this.setState({isMobileErorr:true,mobileErrorMsg:'Enter The Correct Mobile No.'});
      }
      else
      {
        
        let temp = this.state.data
       
        if(temp !=null){
          data = {gender:gender,join:join,DOB:DOB,resume:resume,pic:pic,address:address,name:name,
            company_id:temp.companyID,mobile:mobile,email: temp.email,name:temp.name,password:temp.password,user_type:temp.user_type};

            this.props.navigation.navigate('Bank',{data:data });
          
        }
            else
            console.log("Temp value not found ");
      }
      
    }

 
    render(){

      const {address,email,mobile,resume,pic,join,DOB,name} = this.state
        return (
          
          <Container>
            <Headers title="profile"/>
            
              
              <Content>
              <KeyboardAvoidingView behavior="padding" enabled>

              <View style={[{height:120},app.bgPurple]}>

              </View>
              <View style={{justifyContent:'center',marginTop:-70,marginLeft:size.window.width/3.5}}>
                  <Avatar
                                size="xlarge"
                                rounded
                                title={this.state.name.length ==0 ? 'P': this.state.name[0]}
                                onPress={() => {this._profilePic();}}
                                activeOpacity={0.7}
                            
                                source={{
                                        uri:
                                        this.state.pic !=null?this.state.pic.uri:'u',
                                      }}
                                showEditButton={true}
                              />
              </View>
              <Text style={app.errorMsg}>
                      {this.state.picErrorMsg}
                    </Text>
                  <Card style={app.Form} transparent >
                 
                 <View>
                    <Item regular style={[app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPurpal]} >
                      <Input placeholder="Name" value={name} 
                      onChangeText={(text)=>{this.onValueChange(text,'Name')}} 
                      style={{}}
                      textContentType = "name"
                      
                      enablesReturnKeyAutomatically={true} />
                    </Item>
                    <Text style={app.errorMsg}>
                      {this.state.nameErrorMsg}
                    </Text>
                </View>
                        
               

                    <View>
                      <View style={[app.btn,app.btnPurple,{marginBottom:15}]}>
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
                      <Text style={app.errorMsg}>
                        {this.state.genderErrorMsg}
                      </Text>
                    </View>

                  <View >
                    <Button block full style={[app.btn,app.btnPurple,{marginBottom:15}]} onPress={()=>{this.onJoinDate();console.log("calender Click")}}>
                    <Title style={{fontSize:15,alignSelf:'center',textAlign:'left'}}>{this.state.StartDate}                              </Title>
                    <Icon name={"ios-calendar"} fontSize={20} ></Icon>
                    </Button>
                    <Text style={app.errorMsg}>
                      {this.state.joinErrorMsg}
                    </Text>
                  </View>

                  <View>
                    <Button block full style={[app.btn,app.btnPurple,{marginBottom:15}]} onPress={()=>{this.onDOBDate();console.log("calender Click")}}>
                    <Title style={{fontSize:15,alignSelf:'center',textAlign:'left'}}>{this.state.DateOfBirth}                                     </Title>
                    <Icon name={"ios-calendar"} fontSize={20} ></Icon>
                    </Button>
                    <Text style={app.errorMsg}>
                      {this.state.DOBErrorMsg}
                    </Text>
                    
                  </View>

                  <View>
                        <Item regular style={[{marginBottom:20,width:(size.window.width/2)-20},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPurpal]} >
                              <Input 
                              placeholder="Office"
                               value={address.address} 
                               onChangeText={(text)=>{this.onValueChange(text,'Office')}}
                               enablesReturnKeyAutomatically={true}
                                style={{}} />
                            </Item>
                            <Text style={app.errorMsg}>
                              {this.state.addressErrorMsg}
                            </Text>

                   </View>
                  
                  <View>
                                
                      <View style={{justifyContent: 'space-between' , flexDirection: 'row',  }}>
                            
                            <Item regular style={[{marginBottom:20,width:(size.window.width/2)-20},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPurpal]} >
                              <Input 
                              value={address.street} 
                              onChangeText={(text)=>{this.onValueChange(text,'Street')}}
                              enablesReturnKeyAutomatically={true}
                               placeholder="Street" style={{}} />
                            </Item>                          
                          
                    </View>
                  </View>
                 
                  <View>
                    <Item regular style={[app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPurpal]} >
                      <Input 
                      value={address.city} 
                      onChangeText={(text)=>{this.onValueChange(text,'City')}} 
                      enablesReturnKeyAutomatically={true}
                      placeholder="City" style={{}} />
                    </Item>
                  </View>

                  <View>
                    <Item regular style={[app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPurpal]} >
                      <Input 
                      value={address.state}
                       onChangeText={(text)=>{this.onValueChange(text,'State')}}
                        placeholder="State" 
                        enablesReturnKeyAutomatically={true}
                        style={{}} />
                    </Item>
                    </View>
                  <View>
                    <Item regular style={[app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPurpal]} >
                      <Input
                       value={address.pincode}  
                      onChangeText={(text)=>{this.onValueChange(text,'PinCode')}} 
                      placeholder="PinCode"
                      keyboardType="number-pad"
                      enablesReturnKeyAutomatically={true}
                       style={{}} />
                    </Item>
                    </View>
                    

                    <View>
                    <Item regular style={[app.formGroup,this.state.isMobileErorr? app.errorBorder:app.borderPurpal]} >
                      <Input
                      value={mobile}
                       onChangeText={(text)=>{this.onValueChange(text,'Mobile')}}
                        placeholder="Mobile"
                        enablesReturnKeyAutomatically={true}
                        keyboardType="phone-pad"
                         style={{}} />
                    </Item>
                    <Text style={app.errorMsg}>
                      {this.state.mobileErrorMsg}
                    </Text>
                    </View>
                  
                    <View style={{alignItems:'center'}}>
                        {this.state.resume != null ? <Text style={app.textGray}>{this.state.resume.name}</Text>:<Text></Text>}
                        <Button block full style={[app.btn,app.btnPurple,this.state.isNameErorr? app.errorBorder:app.borderPurpal]} onPress={()=>{this._onDocument();console.log("calender Click")}}>
                        <Title style={{fontSize:15,alignSelf:'center'}}>Select Document    +                   </Title>
                        <Icon name={'ios-albums'} />
                        </Button>
                        <Text style={app.errorMsg}>
                          {this.state.resumeErrorMsg}
                        </Text>
                    </View>
              
                   
                   <View>
                    <Button block full style={[app.btn,app.btnPink,{marginBottom:15}]} onPress={()=>{this.checkValidation();}}><Title>Next</Title></Button>
                    </View>
                  </Card>
                </KeyboardAvoidingView>
                  
              </Content>

              

          </Container>

        );
    }
}

const styles ={ btn:[app.btn,app.btnPurple,{marginBottom:20,}]}