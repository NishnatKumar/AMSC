import React from 'react'; 
import {Logs} from 'expo';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
    BackHandler
  } from 'react-native';

export default class AuthLoadScreen extends React.Component {
    constructor() {
      super();
      this._bootstrapAsync();
    }
  
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
    //  await AsyncStorage.removeItem('userToken');
    //  await AsyncStorage.removeItem('profile');
    //  await AsyncStorage.removeItem('userDetails');
      const userToken = await AsyncStorage.getItem('userToken');

    
     this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

    componentDidMount() {
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
  
    componentWillUnmount() {
      this.backHandler.remove()
    }
  
    handleBackPress = () => {
      this.goBack(); // works best when the goBack is async
      return true;
    }  

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
  