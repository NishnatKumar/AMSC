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
    console.log("In http");
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
         fetch( Global.API_URL+'attendance-store', {
           "async": true,
           method: 'POST',
           headers: {
               'Accept': 'application/json',   
               "Content-Type": "application/json",
              
             },
             body:JSON.stringify(data) 
           }).then((response) =>response.json() )
           .then((responseJson) => {
             // var itemsToSet = responseJson.data;
              console.log('resp:',responseJson);
              if(responseJson.success){
                 this.setData(responseJson.data);
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


  async setData(data)
  {
    

    try {
      if(data.in)
        await AsyncStorage.setItem('in',JSON.stringify({'in':JSON.parse(data.in),id:data.id}));
      
      if(data.out)
        await AsyncStorage.setItem('in',JSON.stringify({'out':JSON.parse(data.in),id:data.id}));
      

    } catch (error) {
      console.log("Eroor ",error)
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
   
    let emp =  data.emp_reg_id.split(".")[3].replace('"','');
    let time = data.in.split(" ")[0].replace('"','');
  

   return emp===time

  }

  handleBarCodeScanned =async ({ type, data }) => {
    this.setState({ scanned: true });
   // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
   console.log("QRCode data is : ",data);

   try {

        let user =JSON.parse(await AsyncStorage.getItem('profile'));

          console.log("USER DETAILS : ",user);  
            const { navigation } = this.props;
            const value = navigation.getParam('types', null);

           

            if(value != null  && user != null  )
            {
                  if(value == 'in')
                  {
                    console.log("Emp REg ID : ",user.emp_reg_id);
                    let dataToSave = {'emp_reg_id':user.emp_reg_id,'in':data};
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
                    }
                   // await AsyncStorage.setItem('in',data)
                  }
                  if(value == 'out')
                  {
                 //await AsyncStorage.setItem('out',data)
                  }
                  this.props.navigation.navigate('Home');
            }
    
     
   } catch (error) {
     console.log("Error : ",error);
   }


   
  };
}
// import React from 'react';
// import { Text, View, TouchableOpacity } from 'react-native';
// import * as Permissions from 'expo-permissions';
// import { Camera } from 'expo-camera';


// export default class QRScanner extends React.Component {
//   state = {
//     hasCameraPermission: null,
//     type: Camera.Constants.Type.back,
//   };

//   async componentDidMount() {
//     const { status } = await Permissions.askAsync(Permissions.CAMERA);
//     this.setState({ hasCameraPermission: status === 'granted' });
//   }

//   _onBarCodeRead(data)
//   {
//       console.log("DAta OF QR COde : ",data);
//   }


//   render() {
//     const { hasCameraPermission } = this.state;
//     if (hasCameraPermission === null) {
//       return <View />;
//     } else if (hasCameraPermission === false) {
//       return <Text>No access to camera</Text>;
//     } else {
//       return (
//         <View style={{ flex: 1 }}>
//           <Camera style={{ flex: 1 }}
//                 autoFocus={true}
//                 onBarCodeRead = {this._onBarCodeRead}
           
//            type={this.state.type}>
//             <View
//               style={{
//                 flex: 1,
//                 backgroundColor: 'transparent',
//                 flexDirection: 'row',
//               }}>
//               <TouchableOpacity
//                 style={{
//                   flex: 0.1,
//                   alignSelf: 'flex-end',
//                   alignItems: 'center',
//                 }}
//                 onPress={() => {
//                   this.setState({
//                     type:
//                       this.state.type === Camera.Constants.Type.back
//                         ? Camera.Constants.Type.front
//                         : Camera.Constants.Type.back,
//                   });
//                 }}>
//                 <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
//               </TouchableOpacity>
//             </View>
//           </Camera>
//         </View>
//       );
//     }
//   }
// }
