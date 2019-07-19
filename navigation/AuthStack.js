import { createStackNavigator } from "react-navigation";
import SignInScreen from "../screens/SignInScreen";
import EmploySignInScreen from "../screens/EmploySignInScreen"; 
import ForgotScreen from "../screens/ForgotScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import EmploySignUpScreen from "../screens/EmploySignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import CompanyListScreen from "../screens/CompanyListScreen";


const AuthStack = createStackNavigator({ 

                                            
                                        CompanyList:CompanyListScreen,
                                        HomePage: HomeScreen ,
                                        EmployeeSignIn: EmploySignInScreen,
                                        ForgotPassword: ForgotScreen,
                                        ResetPassword:ResetPasswordScreen,
                                        EmployeeSignUp:EmploySignUpScreen,


 },{
     initialRouteName:'HomePage'
 });



export default AuthStack;