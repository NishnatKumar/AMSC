
import React, { Component } from 'react'
import {NetInfo,ToastAndroid,BackHandler,AsyncStorage} from 'react-native';
import Global from '../../constants/Global';
import Processing from '../Processing';
export default class CheckProfile extends React.Component
{
        constructor(props)
        {
            super(props)
            this.state={
                isLoading:false
            }
        }

    componentDidMount()
    {
        this.http();  
    }

    static navigationOptions = {
      header: null
  }

     
componentWillMount() {
  try {
    BackHandler.addEventListener('hardwareBackPress', () =>{this.props.navigation.goBack();});
  } catch (error) {
    console.log("Error in CheckProfile.js ",error); this.http();  
  }
 
} 
componentWillUnmount() {
  try {
    BackHandler.addEventListener('hardwareBackPress', () =>{this.props.navigation.goBack();});
  } catch (error) {
    console.log("Error in CheckProfile.js ",error); this.http();  
  }
}
  

    async http() {
        // let data = null;


        this.setState({isLoading:true})

       let token = await Global.TOKEN
        let url;
        let nav;
        let nNav;
        let store;
        
        let user =JSON.parse( await AsyncStorage.getItem('userDetails'));
        if(user == null)
        {
          this.props.navigation.goBack();
          Global.MSG("Wait.....")
          return;
        }
        console.log("In Global PROFILE CHECK",user);
        if(user.user_type == "emp")
        {
          url =Global.API_URL+'employee-details/'+user.id;
          nav = 'ProfileView';
          nNav='Profile';
          store = 'profileEmp';
        }
           
        else if(user.user_type == "cmp")
        {
          url = Global.API_URL+'company-details/'+user.id;
          nav = 'CompanyProfileView';
          nNav ='CompanyProfile';
          store = 'profile';
        }
            
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
              .then(async (responseJson) => {
              
                
               if(responseJson.success)
               {

                console.log("Responase IN GLobal Profile Check : ",responseJson);
                responseJson.data['address']= JSON.parse(responseJson.data.address);

                if(store == 'profileEmp')
                  responseJson.data['bank']= JSON.parse(responseJson.data.bank);

                this.props.navigation.navigate(nav,{'data':responseJson.data})
                try {
                  await AsyncStorage.setItem(store,JSON.stringify(responseJson.data));
                } catch (error) {
                  console.log("Error vin store ");
                }
                

                this.setState({isLoading:false})
               }
               else
               {
                this.props.navigation.navigate(nNav,{'data':responseJson.data});
                this.setState({isLoading:false})
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
              this.setState({isLoading:false})
              console.log('on error fetching from Global check Function :'+error);
              //  this._httpSignUp(data);
            });
          }
        });
      
    
    }

    render()
    {
       
            return <Processing/>
       
    }
    
}