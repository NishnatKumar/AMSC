import { createStackNavigator } from "react-navigation";
import SignInScreen from "../screens/SignInScreen";
import EmploySignInScreen from "../screens/EmploySignInScreen"; 
import ForgotScreen from "../screens/ForgotScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import EmploySignUpScreen from "../screens/EmploySignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import CompanyListScreen from "../screens/CompanyListScreen";
import ProfileScreen from "../screens/Employee/Profile";
import BankScreen from "../screens/Employee/Bank";
import CompanyProfileScreen from "../screens/Company/CompanyProfile";


const AuthStack = createStackNavigator({    
                                        HomePage: HomeScreen ,
                                        CompanyProfile:CompanyProfileScreen,  
                                        CompanyList:CompanyListScreen,
                                       
                                        EmployeeSignIn: EmploySignInScreen,
                                        ForgotPassword: ForgotScreen,
                                        ResetPassword:ResetPasswordScreen,
                                        EmployeeSignUp:EmploySignUpScreen,
                                        Bank:BankScreen , 
                                        Profile:ProfileScreen ,
                                        
 },{
     initialRouteName:'HomePage'
 });



export default AuthStack;