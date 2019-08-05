import HomeScreen from "../screens/HomeScreen";
import { createStackNavigator } from "react-navigation";
import {StyleSheet} from  'react-native';
import WelcomeScreen from "../screens/Employee/WelcomeScreen";
import QRScanner from "../screens/Employee/QRScanner";

import HistoryScreen from "../screens/Employee/History";
import AdminWelcomeScreen from "../screens/Company/AdminWelcomeScreen";
import QRCodeScreen from "../screens/Company/CompanyQRCodeScreen";
import CheckScreen from "./CheckScreen";
import EmpListScreen from "../screens/Company/EmployeeListScreen";
import ProfileViewScreen from "../screens/Company/ProfileViewScreen";
import CompanyProfileViewScreen from "../screens/Company/CompnayProfileViewScreen";
import CheckProfile from "../screens/Employee/CheckProfile";
import EmployeeViewScreen from "../screens/Company/EmployeeViewScreen";



const AppStack = createStackNavigator({
                                       
                                         Check:{screen: CheckScreen },                                     
                                        CompanyProfileView:{screen:CompanyProfileViewScreen},
                                        Home:{screen:WelcomeScreen},
                                        CheckProfile:{screen:CheckProfile},
                                  
                                        QRCodeScreen:{screen:QRCodeScreen},
                                        EmployeeView:{screen:EmployeeViewScreen},
                                   
                                        AdminWelcome:{screen:AdminWelcomeScreen},
                                        History:{screen:HistoryScreen},
                                      
                                        EmpList:{screen:EmpListScreen },
                                       QRCode:{screen:QRScanner },
                                       ProfileView:{screen:ProfileViewScreen },
                                                                            
                                      
                                         },config);
const config = {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
    initialRouteName:'QRCode'
   }  
  
  
  

export default AppStack