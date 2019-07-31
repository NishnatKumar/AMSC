 import {AsyncStorage,ToastAndroid,NetInfo,} from 'react-native';
import { conditionalExpression } from '@babel/types';

 const Global = {
    API_URL :'http://attendance.depixed.in/api/',
    API_PIC:'http://attendance.depixed.in',
    TOKEN:getToken(),
    MSG:showErrorMsg,
    USER:user(),
    PROFILE:profile(),
    PROFILE:profile(),
    PROFILECHECK:async function(userID,type) {
        // let data = null;
       let token = await Global.TOKEN
        let url;
        console.log("In Global PROFILE CHECK");
        if(type == "emp")
            url =Global.API_URL+'employee-details/'+userID;
        else if(type == "cmp")
            url = Global.API_URL+'company-details/'+userID;
        else {
            console.log("Type Not Found")
        return;}
    
      await  NetInfo.getConnectionInfo().then((connectionInfo) => {
         
          if(connectionInfo.type == 'none'){
            console.log('no internet ');
          Global.MSG("No Internet !");
            return;
          }else{
            console.log('yes internet '+url); 
           
            fetch(url, {
              method:'GET',
              headers: {
                  'Accept': 'application/json',   
                  "Content-Type": "application/json",
                  "Authorization":  token,              
                }
    
    
              }).then((response) =>response.json() )
              .then((responseJson) => {
               console.log("Responase IN GLobal Profile Check : ",responseJson)
              return responseJson;
            
                
             })
             .catch((error) => {
              ToastAndroid.showWithGravityAndOffset(
                'Network Failed!!! Retrying...',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
              console.log('on error fetching from Global check Function :'+error);
              //  this._httpSignUp(data);
            });
          }
        });
        
        // if(data !== 'undefined')
        //     return data;
      
    
    }
  
}


        /**GET  The TOKEN */
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

    /**Check Profile if exist or not  */

const profileCheck =async function(userID,type) {
    let data = null;
   let token = await Global.TOKEN
    let url;
    console.log("In Global PROFILE CHECK");
    if(type == "emp")
        url =Global.API_URL+'employee-details/'+userID;
    else if(type == "cmp")
        url = Global.API_URL+'company-details/'+userID;
    else {
        console.log("Type Not Found")
    return;}

  await  NetInfo.getConnectionInfo().then((connectionInfo) => {
     
      if(connectionInfo.type == 'none'){
        console.log('no internet ');
      Global.MSG("No Internet !");
        return;
      }else{
        console.log('yes internet '+url); 
       
        fetch(url, {
          method:'GET',
          headers: {
              'Accept': 'application/json',   
              "Content-Type": "application/json",
              "Authorization":  token,              
            }


          }).then((response) =>response.json() )
          .then((responseJson) => {
           console.log("Responase IN GLobal Profile Check : ",responseJson)
          return data =responseJson;
          console.log(data);
            
         })
         .catch((error) => {
          ToastAndroid.showWithGravityAndOffset(
            'Network Failed!!! Retrying...',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          console.log('on error fetching from Global check Function :'+error);
          //  this._httpSignUp(data);
        });
      }
    });
    
    console.log(data);
  return data;

}

     /**GET  The USER  */
async function user()
{
    try 
    {
      
        let user =  await AsyncStorage.getItem('userDetails');
        // console.log("In token",user);
        if(user != null)
        {
            console.log('user from GLOBAL  : ',user);
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

async function profile()
{
    try 
    {
        
         
        let user =  await AsyncStorage.getItem('profile');
        console.log("In token GEt user Profile",user);
        if(user != null)
        {
            // console.log('user : ',user);
           return JSON.parse(user);
        }
        else
            return null;

    } catch (error) {
        console.log("Error in profile : ",error)
    }
}

function Alert()
{
    try {

        
    } catch (error) {
        console.log("Error in Alert");
    }
}

export default Global;