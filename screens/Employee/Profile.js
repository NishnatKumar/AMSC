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

                      name:'Empl',
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

                      email:'nishant@gmail.com',
                      isemailError:false,
                        emailErrorMsg:'',

                      mobile:'9939224274',
                        ismobileError:false,
                          mobileErrorMsg:'',

                     
                      
                      address:{
                        address:'emp',
                        street:'sdf',
                        city:'city',
                        state:'state',
                        pincode:'987680'
                        
                       
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
   

//  async setProfile(responseJson)
//   {
//       console.log("USer Profile :",responseJson);
//       responseJson.address =JSON.parse(responseJson.address);
//       responseJson.bank = JSON.parse(responseJson.bank);
//       await AsyncStorage.setItem('profileEmp',JSON.stringify(responseJson));
//       this.props.navigation.navigate('ProfileView',{data:responseJson});
//   }

    
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
           return  year+'-'+month+'-'+day
            
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

    checkValidation()
    {
      console.log("In Check validation");
      const {gender,join,DOB,resume,pic,mobile,email,address,name,companyname} = this.state;
      let data = null;
      
      if(gender =='')
      {
        console.log("Gender Not selected");
        this.setState({isgenderError:true,genderErrorMsg:'Select Gender'});
      }
      else if(resume == null)
      {
        console.log("Document Selected");
        this.setState({isresumeError:true,picErrorMsg:'Select the Resume'})
      }
      else if(pic == null)
      {
        console.log("Pic not selected");
        this.setState({ispicError:true,picErrorMsg:'Select the Pic'})
      }
      else if(email.length<5 )
      {
          console.log("Enter the Correct email");
          this.setState({isEmailErorr:true,emailErrorMsg:'Enter the correct email'});
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
              <View style={{marginTop:25}}></View>
              
              <Content>
              <KeyboardAvoidingView behavior="padding" enabled>
          
                  <Card style={app.Form} transparent >
                 
                 <View>
                    <Item regular style={[{marginBottom:20},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPink]} >
                      <Input placeholder="Name" value={name} onChangeText={(text)=>{this.onValueChange(text,'Name')}} style={{}} />
                    </Item>
                    <Text style={app.errorMsg}>
                      {this.state.nameErrorMsg}
                    </Text>
                </View>
                        
                  {/* <View style={[app.btn,app.btnPurple,{marginLeft:-2.7,marginBottom:15}]}>
                         
                         <Picker
                                   selectedValue={this.state.companyname}
                                   textStyle={{ color: "#ffffff" }}
                                   itemTextStyle={{ color: '#788ad2' }}
                                   onValueChange={(itemValue, itemIndex) => this.setState({companyname: itemValue})} 
                                   placeholder="Select Company"
                                   style={{ width: undefined,borderColor:'#16bdf5',color:'#ffffff',borderWidth:0.5 ,marginTop:10}}
                          >
                                    <Picker.Item label="Select Company" value="" key="-1" />  
                                   { this.state.companyList.map((item, key)=>(
                                   <Picker.Item label={item.company_name} value={item.id} key={key} />)
                                   )}
                           
                         </Picker>
                  </View>   
                  <Text style={app.errorMsg}>
                      {this.state.companyErrorMsg}
                    </Text> */}

                    <View>
                      <View style={[app.btn,app.btnPurple,{marginLeft:-2.7,marginBottom:15}]}>
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

                  <View>
                    <Button block full style={[app.btn,app.btnPurple,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this.onJoinDate();console.log("Cylender Click")}}><Title>{this.state.StartDate}</Title></Button>
                    <Text style={app.errorMsg}>
                      {this.state.joinErrorMsg}
                    </Text>
                  </View>

                  <View>
                    <Button block full style={[app.btn,app.btnPurple,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this.onDOBDate();console.log("Cylender Click")}}><Title>{this.state.DateOfBirth}</Title></Button>
                    <Text style={app.errorMsg}>
                      {this.state.DOBErrorMsg}
                    </Text>
                  </View>
                  
                  <View>
                      <View style={{justifyContent: 'space-between' , flexDirection: 'row',  }}>
                            <Item regular style={[{marginBottom:20,width:(size.window.width/2)-20},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPink]} >
                              <Input placeholder="Office" value={address.address} onChangeText={(text)=>{this.onValueChange(text,'Office')}} style={{}} />
                            </Item>
                            <Text style={app.errorMsg}>
                              {this.state.addressErrorMsg}
                            </Text>

                            <Item regular style={[{marginBottom:20,width:(size.window.width/2)-20},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPink]} >
                              <Input value={address.street} onChangeText={(text)=>{this.onValueChange(text,'Street')}} placeholder="Street" style={{}} />
                            </Item>                          
                          
                    </View>
                  </View>
                 
                  
                    <Item regular style={[{marginBottom:20},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPink]} >
                      <Input value={address.city} onChangeText={(text)=>{this.onValueChange(text,'City')}} placeholder="City" style={{}} />
                    </Item>


                    <Item regular style={[{marginBottom:20},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPink]} >
                      <Input value={address.state} onChangeText={(text)=>{this.onValueChange(text,'State')}} placeholder="State" style={{}} />
                    </Item>

                    <Item regular style={[{marginBottom:20},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPink]} >
                      <Input value={address.pincode}  onChangeText={(text)=>{this.onValueChange(text,'PinCode')}} placeholder="PinCode" style={{}} />
                    </Item>

                    <Item regular style={[{marginBottom:20},app.formGroup,this.state.isEmailErorr? app.errorBorder:app.borderPink]} >
                      <Input value={email} onChangeText={(text)=>{this.onValueChange(text,'Email')}} placeholder="Email" style={{}} />
                    </Item>
                    <Text style={app.errorMsg}>
                      {this.state.emailErrorMsg}
                    </Text>

                    <Item regular style={[{marginBottom:20},app.formGroup,this.state.isMobileErorr? app.errorBorder:app.borderPink]} >
                      <Input value={mobile} onChangeText={(text)=>{this.onValueChange(text,'Mobile')}} placeholder="Mobile" style={{}} />
                    </Item>
                    <Text style={app.errorMsg}>
                      {this.state.mobileErrorMsg}
                    </Text>

                  
                   
                    <Button block full style={[app.btn,app.btnPurple,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this._onDocument();console.log("Cylender Click")}}><Title>Select Document    + </Title></Button>
                    <Text style={app.errorMsg}>
                      {this.state.resumeErrorMsg}
                    </Text>
                    
                    {this.state.pic && (
                    <Image source={{uri: this.state.pic.uri}} style={{width:100, height:100 }}/>)}
                    <Button block full style={[app.btn,app.btnPurple,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this._profilePic();}}><Title>Select Pic    + </Title></Button>
                    <Text style={app.errorMsg}>
                      {this.state.picErrorMsg}
                    </Text>
                   
                   
                    <Button block full style={[app.btn,app.btnPink,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this.checkValidation();}}><Title>Next</Title></Button>
                 
                  </Card>
                </KeyboardAvoidingView>
                  
              </Content>

              

          </Container>

        );
    }
}

const styles ={ btn:[app.btn,app.btnPurple,{marginBottom:20,}]}