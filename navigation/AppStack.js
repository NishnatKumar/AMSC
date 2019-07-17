import HomeScreen from "../screens/HomeScreen";
import { createStackNavigator } from "react-navigation";


const AppStack = createStackNavigator({ Home:HomeScreen,navigationOptions: () => ({
    headerVisible: false,
    header:null,
    title: `A`,
    headerBackTitle: 'A much too long text for back button from B to A',
    headerTruncatedBackTitle: `to A`,
    
  }) },config);
const config = {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
   }

export default AppStack