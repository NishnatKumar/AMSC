 import {AsyncStorage,ToastAndroid} from 'react-native';
import { conditionalExpression } from '@babel/types';

 const Global = {
    API_URL :'http://attendance.depixed.in/api/',
    API_PIC:'http://attendance.depixed.in',
    TOKEN:getToken(),
    MSG:showErrorMsg,
    USER:user()
    // API_URL :'http://attendance.gangaservices.com/public/api/'
}

async function getToken()
{
    try 
    {
        // await AsyncStorage.removeItem('userToken');
        let token =  await AsyncStorage.getItem('userToken');
        // console.log("In token",token);
        if(token != null)
        {
            // console.log('Token : ',token);
            return  "Bearer "+token;
        }
        else
            return null;
      


    } catch (error) {
        console.log("Error In token get ",error);
    }
    
}


async function user()
{
    try 
    {
      
        let user =  await AsyncStorage.getItem('userDetails');
        // console.log("In token",user);
        if(user != null)
        {
            // console.log('user : ',user);
           return JSON.parse(user);
        }
        else
            return null;
      


    } catch (error) {
        console.log("Error In token get ",error);
    }
    
}


async function showErrorMsg(msg)
{
    try {

        ToastAndroid.showWithGravityAndOffset(
            msg,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        
    } catch (error) {
        console.log("Eroor in tosta",error);
    }
}

export default Global;