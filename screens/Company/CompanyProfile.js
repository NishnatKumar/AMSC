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
  BackHandler
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




export default class CompanyProfileScreen extends React.Component {

    constructor(props)
    {
        super(props)
        this.state={                      
                      

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
                                    url:''
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

                    isLoding:false,

                   
                        
                    }

                  this._httpGetUserIndustry();
                    this._httpGetUserProfile();
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

  componentWillMount()
  {
    // this._httpGetUserIndustry();
  }





 
  
  async componentDidMount() {
    try {
      
          let userID =JSON.parse(await AsyncStorage.getItem('userDetails'));
          if(!userID)
          {
            this.props.navigation.navigate('EmployeeSignIn');  
            
          }
           
         this.setState({userID:userID.id});
            console.log(userID)
       // this._httpGetUserProfile(userID.id)

        } catch (error) {
          console.log("Error in CompnayProfile : ",error);
        }
  }

  // Get Indistry type
  //get user DAta 
  
  _httpGetUserIndustry = async () => {
   
    let token =await Global.TOKEN;
    var connectionInfoLocal = '';
    NetInfo.getConnectionInfo().then((connectionInfo) => {
     
      if(connectionInfo.type == 'none'){
       Global.MSG("No Internet ! ")
        return;
      }else{
        console.log('yes internet ',Global.API_URL+'industry'); 
        this.setState({
          isLoding:true,
        });
       fetch(Global.API_URL+'industry', {
          
          headers: {
              'Accept': 'application/json',   
              "Content-Type": "application/json",
              "Authorization": token,              
            }
          })
          .then((response) =>response.json() )
          .then((responseJson) => {
           
             console.log('resp:',responseJson.data);
             if(responseJson.success)
             {
               this.setState({companyList:responseJson.data,isLoding:false})
             }
             else
             {
               Global.MSG("Somthing Error");
                this.setState({isLoding:false})
             }
           
         })
         .catch((error) => {
         Global.MSG('Server Error');
          //  this._httpSignUp(data);
          console.log("Error : ",error);
        });
      }
    });
    console.log(connectionInfoLocal);
  }
  

  //get user DAta   
  _httpGetUserProfile = async () => {
   
    let token = await Global.TOKEN;
    let user = await Global.USER;
    if(user != null)
    {
      user = user.id;
      this.setState({userID:user.id});
      console.log('yes internet '+Global.API_URL+'company-details/'+user); 
    }
    else{
      console.log("Error ");
      Global.MSG('Not Login');
      // this.props.navigation.navigate('HomePage');
    }

    var connectionInfoLocal = '';
    NetInfo.getConnectionInfo().then((connectionInfo) => {
     
      if(connectionInfo.type == 'none'){
        console.log('no internet ');
      Global.MSG("No Internet !");
        return;
      }else{
        console.log('yes internet '+Global.API_URL+'company-details/'+user); 
        this.setState({
          isLoding:true,
        });
        fetch(Global.API_URL+'company-details/'+user, {
          method:'GET',
          headers: {
              'Accept': 'application/json',   
              "Content-Type": "application/json",
              "Authorization": token,              
            }


          }).then((response) =>response.json() )
          .then((responseJson) => {
            // var itemsToSet = responseJson.data;
            // console.log('of Get PRofile resp :',responseJson);
             if(responseJson.success)
             {
               // console.log(responseJson.data);
                this.setState({isLoding:false});
                this.setProfile(responseJson.data);
             }
             else
             {
                console.log('User Not found ');
                this.setState({isLoding:false});
             }
            
         })
         .catch((error) => {
          ToastAndroid.showWithGravityAndOffset(
            'Network Failed!!! Retrying...',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          console.log('on error fetching:'+error);
          //  this._httpSignUp(data);
        });
      }
    });
    console.log(connectionInfoLocal);
  }


  //Save PRofile on server  
  _httpSetUserProfile = async (data) => {
   
    let token = await Global.TOKEN;
    let user = await Global.USER;
    console.log("USer : ",user);
     var connectionInfoLocal = '';
     NetInfo.getConnectionInfo().then((connectionInfo) => {
      
       if(connectionInfo.type == 'none'){
         console.log('no internet ');
       Global.MSG("No Internet !");
         return;
       }else{
         console.log('yes internet '); 
         this.setState({
           isLoding:true,
         });
         fetch(Global.API_URL+'company-store', {
           
           headers: {
               'Accept': 'application/json',   
               "Content-Type": "application/json",
               "Authorization": token,              
             }
 
 
           }).then((response) =>response.json() )
           .then((responseJson) => {
             // var itemsToSet = responseJson.data;
              console.log('resp:',responseJson);
             
          })
          .catch((error) => {
           ToastAndroid.showWithGravityAndOffset(
             'Network Failed!!! Retrying...',
             ToastAndroid.LONG,
             ToastAndroid.BOTTOM,
             25,
             50,
           );
           console.log('on error fetching:'+error);
           //  this._httpSignUp(data);
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
  componentWillMount() {
   
    let picker = [];
    this.state.companyList.forEach(element=>{
        picker.push(<Picker.Item label={element} value={element} /> );
    });
    this.setState({
      companyList:picker
    });
  }

   

  async _onDocument()
    {
      const body = this.state;

      try {

          const { type, uri, name, size } =await DocumentPicker.getDocumentAsync({type:'image/*',copyToCacheDirectory:true});



            if(type == 'success')
            {

              console.log("File selected ",size);
              console.log("File selected ",uri);
              console.log("File selected ",name);
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

  return data;
};

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
        tempAddress.url = text;
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


  _httpSaveUp = async (data) => {
   
      let token = await Global.TOKEN;
      let user  = await Global.USER;

      if(user != null)
      {
         console.log(user.id);
         data.append('user_id',user.id+"");
      }
      else
      {

      }

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
          isLoding:true,
        });
        fetch(Global.API_URL+'company-store', {
          "async": true,
          method: 'POST',
          headers: {
              'Accept': 'application/json',   
              "Content-Type": "multipart/form-data",
              "Cache-Control": "no-cache",
              "Authorization": token, 
            },
            body: data 
          }).then((response) =>response.json() )
          .then((responseJson) => {
            // var itemsToSet = responseJson.data;
             console.log('resp:',responseJson);
             if(responseJson.success){
               this.setProfile(responseJson.data)
             }else{
              Global.MSG(responseJson.msg)
              this.setState({isLoding:false})
               console.log("Error in signUP :",responseJson.msg)
             }
         })
         .catch((error) => {
          ToastAndroid.showWithGravityAndOffset(
            'Network Failed!!! Retrying...',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          console.log('on error fetching:'+error);
          //  this._httpSaveUp(data);
        });
      }
    });
    console.log(connectionInfoLocal);
  }

 async setProfile(data)
  {

    try {
      
    if( data != 1)
    {
      console.log(data);
        data['address']= JSON.parse(data.address);

        this.setState({
          isLoding:false
        });
        console.log("Profile Data y ",data);
        await AsyncStorage.setItem('profile',JSON.stringify(data));
        this.props.navigation.navigate('CompanyProfileView',{'data':data});
    }
    else
    {
      this._httpGetUserProfile();
    }
  } catch (error) {

    console.log("Error In Conpony Prfile",error);
    this._httpGetUserProfile();
      
  }

  }

    
    render(){
      const {photo,isLoding,userID,companyname, address,company,regNo,owner} = this.state;

      if(!isLoding)
        return (
          
          <Container>
            <StatusBar backgroundColor="green" barStyle="default" />
              <View style={{marginTop:25}}></View>
             
              <Content>
              <KeyboardAvoidingView behavior="padding" enabled>
             
              <Title style={app.title}>Details </Title>
                  <Card style={app.Form} transparent >



                       
                 

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
                  
                    <Item regular style={[{marginBottom:20},app.formGroup,this.state.iscompanyError? app.errorBorder:app.borderPurpal]} >
                      <Input value={companyname} onChangeText={(text)=>{this.onValueChnageAddress(text,'Title')}} placeholder="Title" style={{}} />
                    </Item>
                    <Text style={app.errorMsg}>
                      {this.state.companyErrorMsg}
                    </Text>

                    <Item regular style={[{marginBottom:20},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPurpal]} >
                      <Input value={regNo } onChangeText={(text)=>{this.onValueChnageAddress(text,'Reg')}} placeholder="Reg. No." style={{}} />
                    </Item>
                    <Text style={app.errorMsg}>
                      {this.state.regNoErrorMsg}
                    </Text>

                    <Item regular style={[{marginBottom:20},app.formGroup,this.state.isownerError? app.errorBorder:app.borderPurpal]} >
                      <Input value={owner} onChangeText={(text)=>{this.onValueChnageAddress(text,'Owner')}} placeholder="Owner Name" style={{}}/>
                    </Item>
                    <Text style={app.errorMsg}>
                      {this.state.ownerErrorMsg}
                    </Text>

                    <Item regular style={[{marginBottom:20},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPurpal]} >
                      <Input value={address.url} onChangeText={(text)=>{this.onValueChnageAddress(text,'Url')}} placeholder="Website" style={{}} />
                    </Item>


                   

                    

                    {photo && (
                    <Image source={{uri: photo.uri}} style={{width:100, height:100 }}/>)}
                    
                    <Button block full style={[app.btn,app.btnPink,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this._onDocument();console.log("Cylender Click")}}><Title>Select Logo    + </Title></Button>
                   
                    <View style={{justifyContent: 'space-between' , flexDirection: 'row',  }}>
                          <Item regular style={[{marginBottom:20,width:(size.window.width/2)-20},app.formGroup,this.state.address? app.errorBorder:app.borderPurpal]} >
                            <Input placeholder="Office" value={address.address} onChangeText={(text)=>{this.onValueChnageAddress(text,'Office')}} style={{}} />
                          </Item>
                          <Item regular style={[{marginBottom:20,width:(size.window.width/2)-20},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPurpal]} >
                            <Input value={address.street} onChangeText={(text)=>{this.onValueChnageAddress(text,'Street')}} placeholder="Street" style={{}} />
                          </Item>
                  </View>
                  <Text style={app.errorMsg}>
                      {this.state.addressErrorMsg}
                    </Text>

                    <Item regular style={[{marginBottom:20},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPurpal]} >
                      <Input value={address.city} onChangeText={(text)=>{this.onValueChnageAddress(text,'City')}} placeholder="City" style={{}} />
                    </Item>
                    <Item regular style={[{marginBottom:20},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPurpal]} >
                      <Input value={address.state} onChangeText={(text)=>{this.onValueChnageAddress(text,'State')}} placeholder="State" style={{}} />
                    </Item>

                    {/* <Button block full style={[app.btn,app.btnPink,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this.checkPermission();console.log("Cylender Click")}}><Title>Current Location </Title></Button>
                   */}


                    <View>
                      <Title style={[app.placeholder,{color:'#000000',fontWeight:'900'}]}>{this.state.name} </Title>
                    </View>

                    <Button block full style={[app.btn,app.btnPurpal,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this.checkValidation();console.log("Next Click")}}><Title>Save</Title></Button>
                 
                        
                  </Card>
                  </KeyboardAvoidingView>
              </Content>
             
              

          </Container>

        );
        else
          return <Processing></Processing>
    }
}

const styles ={ btn:[app.btn,app.btnPurpal,{marginBottom:20,}]}