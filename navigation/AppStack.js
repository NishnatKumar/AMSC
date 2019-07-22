import HomeScreen from "../screens/HomeScreen";
import { createStackNavigator } from "react-navigation";
import {StyleSheet} from  'react-native';
import WelcomeScreen from "../screens/Employee/WelcomeScreen";
import QRScanner from "../screens/Employee/QRScanner";
import ProfileScreen from "../screens/Employee/Profile";
import BankScreen from "../screens/Employee/Bank";
import HistoryScreen from "../screens/Employee/History";
import CompanyProfileScreen from "../screens/Company/CompanyProfile";
import AdminWelcomeScreen from "../screens/Company/AdminWelcomeScreen";
import QRCodeScreen from "../screens/Company/CompanyQRCodeScreen";
import CheckScreen from "./CheckScreen";
import EmpListScreen from "../screens/Company/EmployeeListScreen";


const AppStack = createStackNavigator({
                                        Check:{screen: CheckScreen },
                                        CompanyProfile:{screen:CompanyProfileScreen},
                                        
                                        Home:{screen:WelcomeScreen},
                                        QRCodeScreen:{screen:QRCodeScreen},
                                       
                                   
                                        AdminWelcome:{screen:AdminWelcomeScreen},
                                        History:{screen:HistoryScreen},
                                        Bank:{screen:BankScreen }, 
                                        Profile:{screen:ProfileScreen },
                                        EmpList:{screen:EmpListScreen },
                                       QRCode:{screen:QRScanner },
                                                                            
                                      
                                         },config);
const config = {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
    initialRouteName:'QRCode'
   }

 

//  class CheckScreen extends React.Component {
//     constructor() {
//       super();
     
//     }
  
//     // Fetch the token from storage then navigate to our appropriate place
//     async componentWillMount() {
//       const userToken = await AsyncStorage.getItem('userToken');

//       if(userToken != null)
//       {
//         const userData = JSON.parse(userToken);

          
//       }

//     };
  
//     // Render any loading content that you like here
//     render() {
//       return (
//         <View style={styles.container}>
//           <ActivityIndicator />
//           <StatusBar barStyle="default" />
//         </View>
//       );
//     }
//   }
  
  
  
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  

export default AppStack