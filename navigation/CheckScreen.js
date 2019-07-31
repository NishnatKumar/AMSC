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
    async componentDidMount() {

      try {
        
      
    /** TODO : WE have to remove comment */    
    
      const userData =JSON.parse(await AsyncStorage.getItem('userDetails'));
     
   
      if(userData.user_type == 'cmp'){
     
       
          this.props.navigation.navigate('AdminWelcome');

      }
     else if(userData.user_type == 'emp'){
      
            this.props.navigation.navigate('Home');
      }
      else
      {
        this.props.navigation.navigate('Auth');
        // console.log("In error me hu",userData)
      }
    } catch (error) {
        console.log("Error ",error);
    }

   

    };
  
    // Render any loading content that you like here
    render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator color={'#000000'} />
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
  