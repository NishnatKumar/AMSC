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
import DocumentViewScreen from "../screens/Company/DocumentViewScreen";



const AppStack = createStackNavigator({
                                       
                                        Check: CheckScreen ,                                     
                                        CompanyProfileView:CompanyProfileViewScreen,
                                        Home:WelcomeScreen,
                                        CheckProfile:CheckProfile,
                                  
                                        QRCodeScreen:QRCodeScreen,
                                        EmployeeView:EmployeeViewScreen, 
                                   
                                        AdminWelcome:AdminWelcomeScreen,
                                        History:HistoryScreen,
                                      
                                        EmpList:EmpListScreen ,
                                       QRCode:QRScanner ,
                                       ProfileView:ProfileViewScreen ,
                                      //  DocumentView:DocumentViewScreen,
                                      
                                                                            
                                      
},config);
const config = {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
    initialRouteName:'QRCode'
   }  
  
  
  

export default AppStack