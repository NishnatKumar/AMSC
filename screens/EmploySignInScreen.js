import React, { Component } from 'react';
import {StatusBar,KeyboardAvoidingView,AsyncStorage,NetInfo} from 'react-native';
import { Container, Header, Content, Form, Item, Input,Text, Label, Button,Card,CardItem,Body, Title, Thumbnail, View, Toast } from 'native-base';
import size from '../constants/Layout';
import { processFontFamily } from 'expo-font';
import app from '../constants/app';
import Logo from './Logo';
import Global from '../constants/Global';
import Processing from './Processing';
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

                    isLoding:false,
                }
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
          isLoding:true,
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
                 isLoding:false,
                 isUsernameError:true,
                 isPasswordError:true,
                 usernameErrorMsg:'Username May Be error',
                passwordErrorMsg:'Password may be error'

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
  
    this.setState({isLoding:false});

    try {

      console.log("DATA OF LOGIN : ",data.token);

     await AsyncStorage.setItem('userToken',data.token+"");
    await  AsyncStorage.setItem('userDetails',JSON.stringify(data.user))

    if(data.user.user_type == 'emp')
    {
        this.props.navigation.navigate('Profile')
      // await AsyncStorage.setItem('profileEmp',JSON.stringify(data.data));
    }
    else if(data.user.user_type == 'cmp')
    {
        this.props.navigation.navigate('AdminWelcome')
    }
    else
    {
      Global.MSG("Somthing get wrong ");
      this.props.navigation.navigate('HomePage');
    }
    
      
    //  this.props.navigation.navigate('AuthLoading');

    } catch (error) {
      console.log("Eroor is signup ",error);
    }
    



  }


    componentWillMount()
    {
      const { navigation } = this.props;
      const value = navigation.getParam('loginType', 'NO-ID');
      
      this.setState({loginType:value});
    }

    _signUP()
    {
      const {loginType} = this.state;
      if(loginType != null )
      {
       
        if(loginType == 'emp')
          this.props.navigation.navigate('CompanyList',{loginType:loginType});
        else if(loginType == 'cmp')
          this.props.navigation.navigate('EmployeeSignUp',{loginType:loginType});
      }
      
    }
    
    checkValidation()
    {
    
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

        console.log("Erroor ins PAssword : ",this.state.usernameErrorMsg);
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

    const {usernameErrorMsg,passwordErrorMsg,isUsernameError,isPasswordError,errorMsg,username,password,isLoding} =this.state;
    if(!isLoding)
    return (


      <Container>
      <StatusBar backgroundColor="green" barStyle="default" />
         
      
        <Content>


            
         <KeyboardAvoidingView  behavior="padding" enabled>

                <Logo></Logo>
                <Card transparent style={{marginTop:5,padding:20 }}>
               
                  {/* { this.state.errorMsg.length !=0 ?
                    <View style={{margin:10, backgroundColor:'#ebb7c1',borderWidth:0.5,borderColor:'red',borderRadius:5,padding:7}}>
                      <Text style={{fontSize:20,color:'red'}}>{this.state.errorMsg}</Text>
                    </View>
                    :
                    <Text></Text>
                  }                   */}
                    <Item regular  style={[app.formGroup,this.state.isUsernameError? app.errorBorder:app.borderPurpal]} >
                         <Input value={username} placeholder="Username" onChangeText={(text)=>{this.setState({username:text}); console.log(text)}} textContentType="username" keyboardType="default" />
                    </Item>
                    <Text style={app.errorMsg}>
                      {this.state.usernameErrorMsg}
                    </Text>

 

                    			{/* { usernameErrorMsg.length !=0 ?
                    <View style={{margin:10, backgroundColor:'#ebb7c1',borderWidth:0.5,borderColor:'red',borderRadius:5,padding:7}}>
                    <Text style={{fontSize:20,color:'red'}}>{usernameErrorMsg}</Text>
                    </View>:<Text></Text>} */}
                    
                    <Item regular  style={[app.formGroup,isPasswordError? app.errorBorder:app.borderPurpal,{marginTop:size.window.height/15}]}>
                         <Input value={password} onChangeText={(text)=>{this.setState({password:text});}} placeholder="Password" secureTextEntry={true} textContentType="password"  />
                    </Item>  
                    <Text style={app.errorMsg}>
                        {this.state.passwordErrorMsg}
                    </Text>


                    {/* { passwordErrorMsg.length !=0 ?
                    <View style={{margin:10, backgroundColor:'#ebb7c1',borderWidth:0.5,borderColor:'red',borderRadius:5,padding:7}}>
                    <Text style={{fontSize:20,color:'red'}}>{passwordErrorMsg}</Text>
                    </View>:<Text></Text>} */}
                   
            <Button transparent  style={{alignSelf:'flex-end' }} primary onPress={()=>{console.log("Forgot Press");
                    this.props.navigation.navigate('ForgotPassword');}}  ><Text style={{color:'#a6a4a8',fontSize:15}} > Forgot Password? </Text></Button>



                
                   
                       
                    
            </Card>


            <Button block danger style={styles.btn} onPress={()=>{console.log("Login Press"); this.checkValidation(); }}  ><Text sty > Login  </Text></Button>
                   
                  
            </KeyboardAvoidingView>
            <Button  transparent style={{alignSelf:'center',marginTop:10}} onPress={()=>{console.log("SignUp"); this._signUP(); }} ><Text style={{color:'#bfc2c7',fontSize:15,fontFamily:'AlegreyaRegularItalic',}} > Don't have an account?</Text><Text style={{color:'#FF00DD',fontSize:15,fontFamily:'AlegreyaRegularItalic',textDecorationLine:'underline',textDecorationColor:'#000000' }} > SignUp </Text></Button> 
           
                   
               
        </Content>
        </Container>
    );
    else
      return <Processing></Processing>
  }
}

const styles={btn:[app.btnPurpal,app.btn]}