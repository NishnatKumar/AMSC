import HomeScreen from "../screens/HomeScreen";
import { createStackNavigator } from "react-navigation";
import WelcomeScreen from "../screens/Employee/WelcomeScreen";
import QRScanner from "../screens/Employee/QRScanner";
import ProfileScreen from "../screens/Employee/Profile";
import BankScreen from "../screens/Employee/Bank";
import HistoryScreen from "../screens/Employee/History";
import CompanyProfileScreen from "../screens/Company/CompanyProfile";
import AdminWelcomeScreen from "../screens/Company/AdminWelcomeScreen";
import QRCodeScreen from "../screens/Company/CompanyQRCodeScreen";


const AppStack = createStackNavigator({
                                        
                                        Home:{screen:WelcomeScreen},
                                        QRCodeScreen:{screen:QRCodeScreen},
                                       
                                        CompanyProfile:{screen:CompanyProfileScreen},
                                        AdminWelcome:{screen:AdminWelcomeScreen},
                                        History:{screen:HistoryScreen},
                                        Bank:{screen:BankScreen }, 
                                        Profile:{screen:ProfileScreen },
                                        
                                       QRCode:{screen:QRScanner },
                                                                            
                                      
                                         },config);
const config = {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
    initialRouteName:'QRCode'
   }

export default AppStack