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
  AsyncStorage
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

                      type:1,
                        istypeError:false,
                          typeErrorMsg:'',

                      companyname:'Depixed',
                        iscompanynameError:false,
                          companynameErrorMsg:'',

                      regNo:'wert543yui',
                        isregNoError:false,
                          regNoErrorMsg:'',

                      owner:'Mox',
                        isownerError:false,
                          ownerErrorMsg:'',

                      company:'',
                        iscompanyError:false,
                          companyErrorMsg:'',

                      address:{
                                    address:' B-103,  Samudra,',
                                    street:' Navrangpura',
                                    city:'Ahmedabad',
                                    state:'Gujarat',
                                    pincode:'380009',
                                    contact:'+91 9724016900',
                                    email:'info@depixed.com',
                                    url:'http://www.depixed.in/'
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

                    isLoding:false
                        
                    }
    }

  static navigationOptions = {
    header: null
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

        } catch (error) {
          console.log("Error in CompnayProfile : ",error);
        }
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
    let data =[{name:'nishant',key:1},{name:'hello',key:2},{name:'herror',key:67},{name:'ieywu',key:34}];
    let picker = [];
    data.forEach(element=>{
        picker.push(<Picker.Item label={element.name} value={element.key} /> );
    });
    this.setState({
      companyList:picker
    });
  }

    onValueChange()
    {

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


  createFormData = (photo) => {
    let body = this.state;
  let data = new FormData();
    console.log(photo);

    if(photo == null)
      return;
  data.append("pic",photo );

  // Object.keys(body).forEach(key => {
  //   data.append(key, body[key]);
  // });
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

   async _onSave()
    {
        const {type,companyname,regNo,address, owner,photo}=this.state;
      //  let data = await {type,companyname,regNo,address,owner};
       await this._httpSignUp(await this.createFormData(photo));

       
    }


    onValueChange()
    {
      
    }


  _httpSignUp = async (data) => {
   
    var connectionInfoLocal = '';
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
      // connectionInfo.type = 'none';//force local loding
      if(connectionInfo.type == 'none'){
        console.log('no internet ');
        ToastAndroid.showWithGravityAndOffset(
          'Oops! No Internet Connection',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        return;
      }else{
        console.log('yes internet '); 
        this.setState({
          isLoding:true,
        });
        fetch(Global.API_URL+'comapny-store', {
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
            // var itemsToSet = responseJson.data;
             console.log('resp:',responseJson);
             if(responseJson.success){
                this.setProfile(responseJson.data)
             }else{
               ToastAndroid.showWithGravityAndOffset(
                 'Internal Server Error',
                 ToastAndroid.LONG,
                 ToastAndroid.BOTTOM,
                 25,
                 50,
               );
               this.setState({
                 isLoding:false,
               });
 
               console.log("Error in signUP :",)
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

 async setProfile(data)
  {

    data['address']= JSON.parse(data.address);

    this.setState({
      isLoding:false
    });
    console.log("Profile Data y ",data);
    await AsyncStorage.setItem('profile',JSON.stringify(data));
    this.props.navigation.navigate('Check');

  }

    
    render(){
      const {photo,isLoding,userID,companyname, address,company,regNo,owner} = this.state;

      if(!isLoding)
        return (
          
          <Container>
            <StatusBar backgroundColor="green" barStyle="default" />
              <View style={{marginTop:15}}></View>
              <Content>
              <Title style={app.title}>Details </Title>
                  <Card style={app.Form} transparent >



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

                    {/* <Button block full style={[app.btn,app.btnPink,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this.checkPermission();console.log("Cylender Click")}}><Title>Current Location </Title></Button>
                   */}


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
                            onValueChange={(itemValue, itemIndex)=>{
                              console.log("Item Value :",itemValue);
                              this.setState({company: itemValue})}}                          
                          >
                          {
                           this.state.companyList
                          }
                         
                            
                          </Picker> 
                    </View>
                  
                    <Item regular style={[{marginBottom:20},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPink]} >
                      <Input value={companyname} onChangeText={(text)=>{this.onValueChnageAddress(text,'Title')}} placeholder="Title" style={{}} />
                    </Item>

                    <Item regular style={[{marginBottom:20},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPink]} >
                      <Input value={regNo } onChangeText={(text)=>{this.onValueChnageAddress(text,'Reg')}} placeholder="Reg. No." style={{}} />
                    </Item>

                    <Item regular style={[{marginBottom:20},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPink]} >
                      <Input value={owner} onChangeText={(text)=>{this.onValueChnageAddress(text,'Owner')}} placeholder="Owner Name" style={{}}/>
                    </Item>

                    <Item regular style={[{marginBottom:20},app.formGroup,this.state.isNameErorr? app.errorBorder:app.borderPink]} >
                      <Input value={address.url} onChangeText={(text)=>{this.onValueChnageAddress(text,'Url')}} placeholder="Website" style={{}} />
                    </Item>


                   

                    

                    {photo && (
                    <Image source={{uri: photo.uri}} style={{width:100, height:100 }}/>)}
                    
                    <Button block full style={[app.btn,app.btnPink,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this._onDocument();console.log("Cylender Click")}}><Title>Select Logo    + </Title></Button>
                    <Button block full style={[app.btn,app.btnPurpal,{marginLeft:-2.7,marginBottom:15}]} onPress={()=>{this._onSave();console.log("Next Click")}}><Title>Save</Title></Button>
                 
                  </Card>
                  
              </Content>

              

          </Container>

        );
        else
          return <Processing></Processing>
    }
}

const styles ={ btn:[app.btn,app.btnPurpal,{marginBottom:20,}]}