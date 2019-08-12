
import {StatusBar,KeyboardAvoidingView,AsyncStorage,NetInfo,Alert,BackHandler} from 'react-native';
import Global from '../constants/Global';
export const login = data => {
  
   
   return NetInfo.getConnectionInfo().then((connectionInfo) => {
    
      if(connectionInfo.type == 'none'){
        console.log('no internet ');
       
        Global.MSG("No Internet ! ");
        return null;
      }else{       
      
       return fetch(Global.API_URL+'login', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',   
              'Content-Type':'application/json'   
            },
            body: JSON.stringify(data)
          }).then((response) =>response.json() )       
       
      }
    });
   
    }