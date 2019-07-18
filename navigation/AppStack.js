import HomeScreen from "../screens/HomeScreen";
import { createStackNavigator } from "react-navigation";
import WelcomeScreen from "../screens/Employee/WelcomeScreen";
import QRScanner from "../screens/Employee/QRScanner";
import ProfileScreen from "../screens/Employee/Profile";
import BankScreen from "../screens/Employee/Bank";
import HistoryScreen from "../screens/Employee/History";


const AppStack = createStackNavigator({
                                        History:{screen:HistoryScreen},
                                        Bank:{screen:BankScreen }, 
                                        Profile:{screen:ProfileScreen },
                                        Home:{screen:WelcomeScreen},
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