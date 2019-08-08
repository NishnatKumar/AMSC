import * as React from 'react';
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
  KeyboardAvoidingView,
  AsyncStorage,
  NetInfo,
  ToastAndroid,
  BackHandler,
  Alert
} from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button, Title } from 'native-base';
import Global from '../../constants/Global';

export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
    
  }


  
  _http = async (data) => {
    console.log("In http",data);
     var connectionInfoLocal = '';
     let token = await AsyncStorage.getItem('userToken');
     NetInfo.getConnectionInfo().then((connectionInfo) => {
       console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
       // connectionInfo.type = 'none';//force local loding
       if(connectionInfo.type == 'none'){
         console.log('no internet ');
        Global.MSG('No Internet');
         return;
       }else{
         console.log('yes internet '); 
         this.setState({
           isLoding:true,
         });
         fetch( Global.API_URL+'attendance-store', {
           "async": true,
           method: 'POST',
           headers: {
               'Accept': 'application/json',   
               "Content-Type": "application/json",
               "Authorization":'Bearer '+ token, 
              
             },
             body:JSON.stringify(data) 
           }).then((response) =>response.json() )
           .then((responseJson) => {
             // var itemsToSet = responseJson.data;
              console.log('resp:',responseJson);
              if(responseJson.success){
                
                 this.setData(responseJson.data,data);
              }else{
               Global.MSG("Server Error")
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


  async setData(data,value)
  {
    
    console.log("Data : ",data);

    try {
      if(data.in)
      {
        await AsyncStorage.setItem('in',JSON.stringify({'in':JSON.parse(data.in),id:data.id}));
        console.log("In in time")
      }
      if(data == 1)
      {
       await AsyncStorage.setItem('out',JSON.stringify({'out':JSON.parse(value.out)}));
        console.log("In out time",value);
      }

    } catch (error) {


      Global.MSG("This is Not Your Company Code Scan Correct Code ")
      console.log("Eroor sfdsfdsff ",error)
    }
    
  }
 

  

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        
        <Button block transparent full style={{marginBottom:20,}} onPress={()=>{this.props.navigation.navigate('Home');}} disabled={this.state.isIn}><Title>Cancel </Title></Button>

              
      </View>
    );
  }


  QurCodeChecker(data)
  {
    try {

      console.log(data);
      let emp =  data.empReg.split(".")[3].replace('"','');
  
      let time = data.in.split(" ")[0].replace('"','');
    
      console.log("Emp Timei : "+emp+"  Time : "+time);
     return emp===time
      
    } catch (error) {
      console.log("Error tyui : ",error)
      Global.MSG("This is Not Your Company Code Scan Correct Code ")
    }
  

  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
}
componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.props.navigation.goBack());
}

  handleBarCodeScanned =async ({ type, data }) => {
    this.setState({ scanned: true });
   // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  //  console.log("QRCode data is : ",data);

   try {

        let user =JSON.parse(await AsyncStorage.getItem('profileEmp'));

          // console.log("USER DETAILS : ",user);  
            const { navigation } = this.props;
            const value = navigation.getParam('types', null);

           

            if(value != null  && user != null  )
            {
                  if(value == 'in')
                  {
                    // console.log("Emp REg ID : ",user.emp_reg_id);
                    data.replace('"',"");
                    let dataToSave = {'empReg':user.emp_reg_id,'in':data};
                   if(this.QurCodeChecker(dataToSave))
                   {
                      this._http(dataToSave);
                   }                    
                   else
                   {
                      ToastAndroid.showWithGravityAndOffset(
                        'This is Not Your Company Code Scan Correct Code ',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50,
                      );

                      // Alert.alert( 'This is Not Your Company Code Scan Correct Code ');
                    }
                   // await AsyncStorage.setItem('in',data)
                  }
                  if(value == 'out')
                  { 
                 //await AsyncStorage.setItem('out',data)
                 console.log("Date out : ");
                  let inTime = JSON.parse(await AsyncStorage.getItem('in'));
                        console.log("Date out : ",inTime);
                      if(inTime!= null)
                      {
                        console.log(data)
                        data.replace('"',"");
                        let dataToSave = {'empReg':user.emp_reg_id,'out':data,id:inTime.id};
                        console.log("Data toi save : ",dataToSave);

                        let emp =  dataToSave.empReg.split(".")[3].replace('"','');
    
                        let time = dataToSave.out.split(" ")[0].replace('"','');
                      
                        console.log("Emp Timei : "+emp+"  Time : "+time);
                      
                        if( emp==time)
                        {
                          
                            this._http(dataToSave);
                        }                    
                        else
                        {
                            Global.MSG('This is Not Your Company Code Scan Correct Code ');
                            // ToastAndroid.showWithGravityAndOffset(
                            //   'This is Not Your Company Code Scan Correct Code ',
                            //   ToastAndroid.LONG,
                            //   ToastAndroid.BOTTOM,
                            //   25,
                            //   50,
                            // );
                          }

                      }
                      else
                      {
                        console.log("In else ",await AsyncStorage.getItem('in'))
                      }
                     
                      
                
                  }
                  this.props.navigation.navigate('Home');
            }
    
     
   } catch (error) {
     console.log("Error 124 : ",error);
     Global.MSG(' This is Not Your Company Code Scan Correct Code. ')
   }


   
  };
}