/** */import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
  } from 'react-native';

export default class CheckScreen extends React.Component {
    constructor() {
      super();
     
    }
  
    // Fetch the token from storage then navigate to our appropriate place
    async componentWillMount() {

      try {
        
      
    /** TODO : WE have to remove comment */    
      const userToken = await AsyncStorage.getItem('userToken');
      const userData =JSON.parse(await AsyncStorage.getItem('userDetails'));
      const profile = JSON.parse(await AsyncStorage.getItem('profile'));

      console.log("Profile : ",profile);
      console.log("User Data  : ",userData);
      console.log("UserToken : ",userToken);

      if(userData.user_type == 'cmp'){
        console.log("User DAta : ",profile);
        if(!profile)
          this.props.navigation.navigate('CompanyProfile');
        else
          this.props.navigation.navigate('AdminWelcome');

      }
     else if(userData.user_type == 'emp'){
          if(!profile){
            console.log("In profile")
            this.props.navigation.navigate('Profile',{userData:userData});
          }
          else
            this.props.navigation.navigate('Home');
      }
      else
      {
        this.props.navigation.navigate('Auth');
        console.log("In error me hu",userData)
      }
    } catch (error) {
        console.log("Error ",error);
    }

    //   if(userToken != null)
    //   {
    //     const userData = JSON.parse(userToken);

          
    //   }

    };
  
    // Render any loading content that you like here
    render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
  }
  

  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  