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
  NetInfo,
  ToastAndroid,
  KeyboardAvoidingView,
  AsyncStorage,
  BackHandler,
  Alert
} from 'react-native';

import { MonoText } from '../../components/StyledText';
import { Container, Header,Thumbnail, Left, Body, Right, Button, Icon, Title, Footer, Content, Card, Item, Label, Input, Picker, Textarea } from 'native-base';
import size, {window} from '../../constants/Layout'
import { SizeClassIOS } from 'expo/build/ScreenOrientation/ScreenOrientation';
import app from '../../constants/app';
import Time from '../../constants/Time';
import * as DocumentPicker from 'expo-document-picker';
import Global from '../../constants/Global';

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Processing from '../Processing';
import Headers from '../Headers';
import { Avatar } from 'react-native-elements';




export default class CompanyProfileScreen extends React.Component {

    constructor(props)
    {
        super(props)
        this.state={                      
                      data:'',

                      companyList:[],

                      type:"IT",
                        istypeError:false,
                          typeErrorMsg:'',

                      companyname:'',
                        iscompanynameError:false,
                          companynameErrorMsg:'',

                          user:'',
                          isuserError:false,
                            userErrorMsg:'',

                      regNo:'',
                        isregNoError:false,
                          regNoErrorMsg:'',

                      owner:'',
                        isownerError:false,
                          ownerErrorMsg:'',

                      company:'',
                        iscompanyError:false,
                          companyErrorMsg:'',

                      address:{
                                    address:'',
                                    street:'',
                                    city:'',
                                    state:'',
                                    pincode:'',
                                    contact:'',
                                    email:'',
                                    url:'',
                                 
                              },
                        isaddressError:false,
                          addressErrorMsg:'',

                      photo:null,
                        isphotoError:false,
                          photoErrorMsg:'',

                    userID:1,
                      isuserIDError:false,
                        userIDErrorMsg:'',

                    location:null,
                      islocationError:false,
                        locationErrorMsg:'',

                    isLoading:false,

                   
                        
                    }
                    this._httpGetUserIndustry();
                                 
    }

   async checkValidation()
    {
      let that = this.state;
      let address = that.address;

     this.setState({                     
       
          iscompanynameError:false,
            companynameErrorMsg:'',

         

        owner:'',
          isownerError:false,
            ownerErrorMsg:'',

        company:'',
          iscompanyError:false,
            companyErrorMsg:'',

    
          isaddressError:false,
            addressErrorMsg:'',     
      });


      if(that.type == "")
      {
        console.log("error in type")
        this.setState({istypeError:true,
        typeErrorMsg:'Select the company type'})
      }
      else if(that.companyname <3)
      {
        console.log("Error in compnay name")
        this.setState({iscompanyError:true,companyErrorMsg:"Enter the correct company Name"});
      }
      else if(that.owner <3)
      {
        console.log("Error in Owner name")
        this.setState({isownerError:true,ownerErrorMsg:"Enter the correct Owner Name"});
      }
      else if(that.owner <3)
      {
        console.log("Error in Owner name")
        this.setState({isownerError:true,ownerErrorMsg:"Enter the correct Owner Name"});
      }
      else if(address.address <3)
      {
        console.log('Error in address')
        this.setState({isaddressError:true,addressErrorMsg:'Plese Enter Correct Address'})
      }
      
      else
      {
          await this._httpSaveUp(await this.createFormData());
      }
    
      

    }


  static navigationOptions = {
    
}

 

 
  //get Industry Type
  
  _httpGetUserIndustry = async () => {
   
  
    var connectionInfoLocal = '';
    NetInfo.getConnectionInfo().then((connectionInfo) => {
     
      if(connectionInfo.type == 'none'){
       Global.MSG("No Internet ! ")
        return;
      }else{
        console.log('yes internet ',Global.API_URL+'industry'); 
        this.setState({
          isLoading:true,
        });
       fetch(Global.API_URL+'industry', {
          
          headers: {
              'Accept': 'application/json',   
              "Content-Type": "application/json",
              
            }
          })
          .then((response) =>response.json() )
          .then((responseJson) => {
           
             console.log('resp:',responseJson);
             if(responseJson.success)
             {
               this.setState({companyList:responseJson.data,isLoading:false})
             }
             else
             {
               Global.MSG("Something Error");
                this.setState({isLoading:false})
             }
           
         })
         .catch((error) => {
         Global.MSG('Server Error');
         
          console.log("Error : ",error);
        });
      }
    });
    console.log(connectionInfoLocal);
  }
 

  checkPermission()
  {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        locationErrorMsg: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }

  }



    
componentWillMount() {
      let picker = [];
      this.state.companyList.forEach(element=>{
          picker.push(<Picker.Item label={element} value={element} /> );
      });
      this.setState({
        companyList:picker
      });

      const { navigation } = this.props;
      let data = navigation.getParam('data', null);
      this.setState({data:data})

      BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.navigate('AdminWelcome'));
}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', () => this.props.navigation.navigate('AdminWelcome'));
}
  
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    
    let address =Location.reverseGeocodeAsync(location);
    console.log("Location : ",location);


    
  };

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  
   

  async _onDocument()
    {
      const body = this.state;

      try {

          const { type, uri, name, size } =await DocumentPicker.getDocumentAsync({type:'image/*',copyToCacheDirectory:true});



            if(type == 'success')
            {

              
              this.setState({photo:{ type:'image/png', uri, name, size }});

            }
            else
              console.log("File Note Selected");

          } catch (e) {
            console.log(e.message)
            console.log(e.stack)
        }
        
    }


  createFormData = () => {
    let body = this.state;

    let temp = this.state.data;


    console.log("Temp Data : ",temp);
  let data = new FormData();
  

    if(body.photo != null)
      data.append("pic",body.photo );

 
   console.log(body);
  data.append('company_name',body.companyname+"")
  data.append('type',body.type+"")
  data.append('address',JSON.stringify(body.address))
  data.append('owner',body.owner+"")
  data.append('user_id',body.userID+"")
  data.append('reg_no',body.regNo+"")
  data.append('email',temp.email)
  data.append('name',temp.name)
  data.append('password',temp.password)
  data.append('user_type',temp.user_type)

  return data;
};

  onValueChangeAddress(text,key){
   
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
        tempAddress.url = text;
        this.setState({address:tempAddress});
      }
      else if(key == 'Email')
      {
        tempAddress.email = text;
        this.setState({address:tempAddress});
      }
      else if(key == 'Contact')
      {
        tempAddress.contact = text;
        this.setState({address:tempAddress});
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
      else if(key == 'PinCode')
      {
      
        tempAddress.pincode = text;
        this.setState({address:tempAddress});
      }
      
      
  }



   async cylender()
    {
      try 
        {
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

  


    onValueChange()
    {
      
    }

    /**Save Data on server */
  _httpSaveUp = async (data) => {
   
     

    var connectionInfoLocal = '';
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
      // connectionInfo.type = 'none';//force local loding
      if(connectionInfo.type == 'none'){
        console.log('no internet ');
       
        Global.MSG('Oops! No Internet Connection')
        return;
      }else{
        console.log('yes internet '); 
        this.setState({
          isLoading:true,
        });
        fetch(Global.API_URL+'register', {
          "async": true,
          method: 'POST',
          headers: {
              'Accept': 'application/json',   
              "Content-Type": "multipart/form-data",
              "Cache-Control": "no-cache",
           
            },
            body: data 
          }).then((response) =>response.json() )
          .then((responseJson) => {
           
             console.log('resp:',responseJson);
             if(responseJson.success){
                  Alert.alert('Sign Up Complete','You have successfully created account Please Login. ')
                  this.props.navigation.navigate('EmployeeSignIn')
             }else{
               if(responseJson.msg === 'The email has already been taken.')
               {
                 this.props.navigation.goBack();
               }
              Global.MSG(responseJson.msg)
              this.setState({isLoading:false})
               console.log("Error in signUP :",responseJson.msg)
             }
         })
         .catch((error) => {
         Global.MSG("Server Error ",error)
          console.log('on error fetching:'+error);
        
        });
      }
    });
    console.log(connectionInfoLocal);
  }


  static navigationOptions = {
    header: null
}

    
    render(){
      const {photo,isLoading,userID,companyname, address,company,regNo,owner} = this.state;

      if(!isLoading)
        return (
          
          <Container>
              <Headers title="Company Profile"/>
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
             
                 
                 <Card  style={app.Form} transparent >   
                    <View style={app.formGroup}>

                      <View style={[app.btn,app.btnPink,{marginLeft:-2.7,marginBottom:15}]}>
                          
                            <Picker
                                      selectedValue={this.state.type}
                                      textStyle={{ color: "#ffffff" }}
                                      onValueChange={(itemValue, itemIndex) => this.setState({type: itemValue})} >
                          
                                      { this.state.companyList.map((item, key)=>(
                                      <Picker.Item label={item} value={item} key={key} />)
                                      )}
                              
                            </Picker>
                      </View>
                                        


                    </View>

                  <View>
                    <Item regular style={[app.formGroup,this.state.iscompanyError? app.errorBorder:app.borderPink]} >
                      <Input
                       value={companyname}
                       onChangeText={(text)=>{this.onValueChangeAddress(text,'Title')}}
                        placeholder="Title" style={{}} 
                          textContentType="name"

                          
                        />
                    </Item>
                    <Text style={app.errorMsg}>
                      {this.state.companyErrorMsg}
                    </Text>
                  </View>
                  
                  <View>
                    <Item regular style={[app.formGroup,this.state.isNameError? app.errorBorder:app.borderPink]} >
                      <Input value={regNo } 
                      onChangeText={(text)=>{this.onValueChangeAddress(text,'Reg')}}
                      placeholder="Reg. No." 
                      style={{}} />
                    </Item>
                    <Text style={app.errorMsg}>
                      {this.state.regNoErrorMsg}
                    </Text>
                  </View> 

                  <View>  
                    <Item regular style={[app.formGroup,this.state.isNameError? app.errorBorder:app.borderPink]} >
                      <Input 
                      value={address.contact} 
                      onChangeText={(text)=>{this.onValueChangeAddress(text,'Contact')}}
                       placeholder="Contact"
                       textContentType="telephoneNumber"
                         keyboardType="phone-pad"
                       />
                    </Item>
                  </View>

                  <View>
                    <Item regular style={[app.formGroup,this.state.isNameError? app.errorBorder:app.borderPink]} >
                      <Input 
                      value={address.email} 
                      onChangeText={(text)=>{this.onValueChangeAddress(text,'Email')}} 
                      placeholder="Email" 
                      textContentType="emailAddress"
                      keyboardType="email-address"
                      style={{}} />
                    </Item>
                  </View>
                
                    

                  <View>
                    <Item regular style={[app.formGroup,this.state.isownerError? app.errorBorder:app.borderPink]} >
                      <Input 
                      value={owner}
                       onChangeText={(text)=>{this.onValueChangeAddress(text,'Owner')}}
                        placeholder="Owner Name" 
                        textContentType="name"
                        style={{}}/>
                        
                    </Item>
                    <Text style={app.errorMsg}>
                      {this.state.ownerErrorMsg}
                    </Text>
                  </View>

                  <View>
                    <Item regular style={[app.formGroup,this.state.isNameError? app.errorBorder:app.borderPink]} >
                      <Input value={address.url} 
                      onChangeText={(text)=>{this.onValueChangeAddress(text,'Url')}} 
                      placeholder="Website" style={{}}
                      textContentType="URL" 
                        keyboardType="url"
                      />
                    </Item>
                  </View>

                   

                    
                  <View>
                   
                          <Item regular style={[{marginBottom:20,width:(size.window.width/2)-20},app.formGroup,this.state.address.address? app.errorBorder:app.borderPink]} >
                            <Input 
                            placeholder="Office" 
                            value={address.address}
                             onChangeText={(text)=>{this.onValueChangeAddress(text,'Office')}}
                             textContentType="streetAddressLine1"
                              style={{}} />
                        </Item>
                        <Text style={app.errorMsg}>
                      {this.state.addressErrorMsg}
                    </Text>



                          
                  </View>
                 
                    <Item regular style={[{marginBottom:20,width:(size.window.width/2)-20},app.formGroup,this.state.isNameError? app.errorBorder:app.borderPink]} >
                            <Input value={address.street} 
                            onChangeText={(text)=>{this.onValueChangeAddress(text,'Street')}}
                             placeholder="Street"
                             textContentType="fullStreetAddress"
                              style={{}} />
                    </Item>

                    <Item regular style={[app.formGroup,this.state.isNameError? app.errorBorder:app.borderPink]} >
                      <Input
                       value={address.city} onChangeText={(text)=>{this.onValueChangeAddress(text,'City')}}
                        placeholder="City" 
                        textContentType="addressCityAndState"
                        style={{}} />
                    </Item>
                    <Item regular style={[app.formGroup,this.state.isNameError? app.errorBorder:app.borderPink]} >
                      <Input value={address.state}
                       onChangeText={(text)=>{this.onValueChangeAddress(text,'State')}} 
                       placeholder="State"
                       textContentType="addressState"
                        style={{}} />
                    </Item>

                    <Item regular style={[app.formGroup,this.state.isNameError? app.errorBorder:app.borderPink]} >
                      <Input value={address.pincode}
                        onChangeText={(text)=>{this.onValueChangeAddress(text,'PinCode')}} 
                        placeholder="PinCode"
                        textContentType="postalCode"
                        keyboardType="number-pad" 
                        style={{}} />
                    </Item>


                    {/* <Button block full style={[app.btn,app.btnPink,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this.checkPermission();console.log("Cylender Click")}}><Title>Current Location </Title></Button>
                   */}


                    <View>
                      <Title style={[app.placeholder,{color:'#000000',fontWeight:'900'}]}>{this.state.name} </Title>
                    </View>

                    <Button block full style={[app.btn,app.btnPurple,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this.checkValidation();console.log("Next Click")}}><Title>Save</Title></Button>
                 
                        
                  </Card>
                  </KeyboardAvoidingView>
              </Content>
             
              

          </Container>

        );
        else
          return <Processing></Processing>
    }
}

const styles ={ btn:[app.btn,app.btnPurple,{marginBottom:20,}]}