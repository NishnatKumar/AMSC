import React from 'react'; 
import {
    AsyncStorage,
    StyleSheet,
    View,
    BackHandler,Text
  } from 'react-native';

export default class AuthLoadScreen extends React.Component {
    constructor(props) {
      super(props);
      this._bootstrapAsync();
    }
  
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
    //  await AsyncStorage.removeItem('userToken');
    //  await AsyncStorage.removeItem('profile');
    //  await AsyncStorage.removeItem('userDetails');
      const userToken =await AsyncStorage.getItem('userToken'); 

      console.log("Token Get : ",userToken)
     this.props.navigation.navigate(userToken ? 'App' : 'Auth');
     
    };

    componentDidMount() {
    
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
  
    componentWillUnmount() {
     
      this.backHandler.remove()
    }
  
    handleBackPress = () => {
     
      this._bootstrapAsync();
      return true;
    }  

    // Render any loading content that you like here
    render() {
      return (
        <View style={styles.container}>
          <Text/>
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
  