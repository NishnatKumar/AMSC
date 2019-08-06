import React, { Component } from 'react';
import {StatusBar,KeyboardAvoidingView,AsyncStorage,NetInfo,Alert,BackHandler} from 'react-native';
import { Container, Header, Content, Form, Item, Input,Text, Label, Button,Card,CardItem,Body, Title, Thumbnail, View, Toast } from 'native-base';
import size from '../constants/Layout';
import { processFontFamily } from 'expo-font';
import app from '../constants/app';
import Logo from './Logo';
import Global from '../constants/Global';
import Processing from './Processing';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { parse } from 'qs';
export default class EmploySignInScreen extends Component {

    constructor(props)
    {
      super(props)
      this.state={
                    username:'',
                    isUsernameError:false,
                    usernameErrorMsg:'',

                    password:'',
                    isPasswordError:false,
                    passwordErrorMsg:'',

                    errorMsg:'',

                    loginType:null,

                    isLoading:false,
                }
    }

    
 
  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', () => this.props.navigation.goBack());
  }


    
    componentWillMount()
    {
      const { navigation } = this.props;
      const value = navigation.getParam('loginType', null);
      if(value != null)
        this.setState({loginType:value});
        BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
    }

    static navigationOptions = {
        header: null
    }

    
    _httpLogin = async (data) => {
  
    var connectionInfoLocal = '';
    NetInfo.getConnectionInfo().then((connectionInfo) => {
    
      if(connectionInfo.type == 'none'){
        console.log('no internet ');
       
        Global.MSG("No Internet ! ");
        return;
      }else{
       
        this.setState({
          isLoading:true,
        });
        fetch(Global.API_URL+'login', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',   
              'Content-Type':'application/json'   
            },
            body: JSON.stringify(data)
          }).then((response) =>response.json() )
          .then((responseJson) => {
            
            
             if(responseJson.success){
            
              this.setValues(responseJson.data)
             }
             else{
               console.log(responseJson);
              Global.MSG(responseJson.msg);
               this.setState({
                 isLoading:false,
                 isUsernameError:true,
                 isPasswordError:true,
                 usernameErrorMsg:'Username May Be error',
                passwordErrorMsg:'Password May be error'

               });
 
              
             }
         })
         .catch((error) => {


          ToastAndroid.showWithGravityAndOffset(
            'Network Failed!!! Retrying...',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          console.log('on error fetching:'+error);
          
        });
      }
    });
   
    }


  //To set user data in localhost
  async setValues(data)
  {
    
    

      try {

      console.log("DAta value : ",data);

      await AsyncStorage.setItem('userToken',data.token+"");
      await  AsyncStorage.setItem('userDetails',JSON.stringify(data.user))
      

      if(data.user.user_type == 'emp')
      {
        await AsyncStorage.setItem('profileEmp',JSON.stringify(data.profile))
        await AsyncStorage.setItem('cmp',JSON.stringify(data.company))
          Global.MSG(" Successful!  Login")

          let that = this;
          setTimeout(function(){
          
          
              that.props.navigation.navigate('Home') 
              that.setState({
                isLoading:false,
              });
             
          },3000,that);
           
      }
      else if(data.user.user_type == 'cmp')
      {

        data.profile['address'] = JSON.parse(data.profile.address);
        await AsyncStorage.setItem('profile',JSON.stringify(data.profile))
        Global.MSG(" Successful!  Login")

        
          
          // this.props.navigation.navigate('AdminWelcome') 
          let that = this;
          setTimeout(function(){
          
           
           
              that.props.navigation.navigate('AdminWelcome') 
              that.setState({
                isLoading:false,
              });
          },3000,that);
        
      }
      else
      {
        Global.MSG("Something get wrong ");
        this.props.navigation.navigate('HomePage');
      }
      

    
        
      //  this.props.navigation.navigate('AuthLoading');


      } catch (error) {
        console.log("Error is in EmployeeSignInScreen ",error);
        this.setState({isLoading:false});
      }
      

      // this.setState({isLoading:false});

    }

  admin(){  try {
                this.setState({
                  isLoading:false,
                });
                console.log("calll")
              this.props.navigation.navigate('AdminWelcome') 
            } catch (error) {
              
            } 
        }

    _signUP()
    {
      const {loginType} = this.state;
      if(loginType != null )
      {
        console.log(loginType);
        if(loginType == 'cmp')
          this.props.navigation.navigate('EmployeeSignUp',{loginType:loginType});  
        else if(loginType == 'emp')  
          this.props.navigation.navigate('CompanyList',{loginType:loginType});     
           
      }
      
    }
    
    checkValidation()
    {
    
      /**This code is for re-set fields */
      this.setState({
       
        isUsernameError:false,
        usernameErrorMsg:'',

        
        isPasswordError:false,
        passwordErrorMsg:''
    })



      let username = this.state.username;
      let password = this.state.password;



      if(username.length <3 )
      {
       
        this.setState({usernameErrorMsg :'Enter The Correct Email',
                        isUsernameError:true});

        console.log("Erroor in PAssword : ",this.state.usernameErrorMsg);
      }
      else if(password.length <3)
      {
        this.setState({
          isPasswordError:true,
          passwordErrorMsg :'Enter The Correct password',})

      }
      else
      {
      
          let data={email:username,password:password};
          this._httpLogin(data);
      }   


    }


    async _setValue(data)
    {
      //AsyncStorage
     await AsyncStorage.setItem('userToken',data);
      this.props.navigation.navigate('AuthLoading');
    }

  render() {

    const {isPasswordError,username,password,isLoading} =this.state;
    if(!isLoading)
    return (


      <Container>
      <StatusBar backgroundColor="green" barStyle="default" />
      <View style={{height:StatusBar.currentHeight}}></View>
         
      
        <Content>


            
         <KeyboardAvoidingView  behavior="padding" enabled>

                <Logo></Logo>
                <Card transparent style={app.Form}>
                  <View >
                    <Item regular  style={[app.formGroup,this.state.isUsernameError? app.errorBorder:app.borderPurpal]} >
                         <Input value={username}
                            placeholder="Username" 
                            onChangeText={(text)=>{this.setState({username:text}); 
                            console.log(text)}} 
                            textContentType="emailAddress"
                            keyboardType="default" 
                            blurOnSubmit={false}
                            onBlur={()=>{if(username.length ==0 )
                                            {
                                              this.setState({usernameErrorMsg:'Enter correct username',isUsernameError:true})
                                            }

                                          }}
                           
                           />                           
                    </Item>
                    <Text style={app.errorMsg}>
                              {this.state.usernameErrorMsg}
                    </Text>
                  </View>
                   

 

                    <View>
                    <Item regular  style={[app.formGroup,isPasswordError? app.errorBorder:app.borderPurpal,{marginTop:20}]}>
                         <Input 
                         value={password}
                          onChangeText={(text)=>{this.setState({password:text});}}
                           placeholder="Password" 
                           secureTextEntry={true} 
                           textContentType="password" 
                           onSubmitEditing={()=>{this.checkValidation()}}
                           returnKeyType={"go"}
                           onBlur={()=>{if(username.length ==0 )
                                            {
                                              this.setState({passwordErrorMsg :'Password Required', isPasswordError:true})
                                            }

                                          }}
                         
                            />
                    </Item>  
                    <Text style={app.errorMsg}>
                        {this.state.passwordErrorMsg}
                    </Text>
                  </View>

                  
                   
            <Button transparent style={{alignSelf:'flex-end'}} primary onPress={()=>{console.log("Forgot Press");
                    this.props.navigation.navigate('ForgotPassword');}}  ><Text style={[app.textGray,{fontSize:15,}]} > Forgot Password? </Text></Button>                 

                
                   
                       
                    
            </Card>


             
            </KeyboardAvoidingView>
            <View style={{paddingLeft:11}}>
            <Button block danger style={styles.btn} onPress={()=>{console.log("Login Press"); this.checkValidation(); }}  ><Text sty > Login  </Text></Button>
                   
               
            <Button  transparent style={{alignSelf:'center',marginTop:10}} onPress={()=>{console.log("SignUp"); this._signUP(); }} ><Text style={{color:'#bfc2c7',fontSize:15,fontFamily:'AlegreyaRegularItalic',}} > Don't have an account?</Text><Text style={{color:'#FF00DD',fontSize:15,fontFamily:'AlegreyaRegularItalic',textDecorationLine:'underline',textDecorationColor:'#000000' }} > SignUp </Text></Button> 
          </View>
                   
               
        </Content>
        </Container>
    );
    else
      return <Processing></Processing>
  }
}

const styles={btn:[app.btnPurple,app.btn]}