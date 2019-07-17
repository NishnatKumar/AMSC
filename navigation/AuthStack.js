import { createStackNavigator } from "react-navigation";
import SignInScreen from "../screens/SignInScreen";
import EmploySignInScreen from "../screens/EmploySignInScreen"; 
import ForgotScreen from "../screens/ForgotScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import EmploySignUpScreen from "../screens/EmploySignUpScreen";
import HomeScreen from "../screens/HomeScreen";


const AuthStack = createStackNavigator({ 
                                        HomePage: HomeScreen ,
                                        EmployeeSignIn: EmploySignInScreen,
                                        ForgotPassword: ForgotScreen,
                                        ResetPassword:ResetPasswordScreen,
                                        EmployeeSignUp:EmploySignUpScreen,
 },{
     initialRouteName:'ResetPassword'
 });



export default AuthStack;