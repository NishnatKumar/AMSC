import React, { Component } from 'react';
import {StatusBar,KeyboardAvoidingView,AsyncStorage,NetInfo} from 'react-native';
import { Container, Header, Content, Form, Item, Input,Text, Label, Button,Card,CardItem,Body, Title, Thumbnail, View } from 'native-base';
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
    console.log("Data to send : "+Global.API_URL+'login');
    console.log("Data : ",data);
    var connectionInfoLocal = '';
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
      // connectionInfo.type = 'none';//force local loding
      if(connectionInfo.type == 'none'){
        console.log('no internet ');
        ToastAndroid.showWithGravityAndOffset(
          'Oops! No Internet Connection',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        return;
      }else{
        console.log('yes internet '); 
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
            
            console.log("Response : ",responseJson);
             if(responseJson.success){
             //  console.log("Login dtfddtdta ",responseJson);
              this.setValues(responseJson)
             }
             if(responseJson.error)
             {
                this.setState({errorMsg:'Login Or Username Not found',isLoding:false});

             }
             else{
               ToastAndroid.showWithGravityAndOffset(
                 'Internal Server Error',
                 ToastAndroid.LONG,
                 ToastAndroid.BOTTOM,
                 25,
                 50,
               );
               this.setState({
                 isLoding:false,
               });
 
               console.log("Error in signUP :",responseJson)
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
           this._httpSignUp(data);
        });
      }
    });
    console.log(connectionInfoLocal);
  }


  //To set user data in localhost
 async setValues(data)
  {
    console.log(data);
    this.setState({isLoding:false});

    try {

      
     await AsyncStorage.setItem('userToken',data.token+"");
    await  AsyncStorage.setItem('userDetails',JSON.stringify(data.user))

    if(data.user.user_type == 'emp')
    {
      await AsyncStorage.setItem('profile',JSON.stringify(data.data));
    }
    
      
     this.props.navigation.navigate('AuthLoading');

    } catch (error) {
      console.log("Eroor is signup ",error);
    }
    



  }


    componentWillMount()
    {
      const { navigation } = this.props;
      const value = navigation.getParam('loginType', 'NO-ID');
      console.log("Login Type : ",value);
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
      console.log("In check validation ");
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
        console.log("jsagdjg",username);
        this.setState({errorMsg :'Enter The Correct Username',
                        isUsernameError:true});
      }
      else if(password.length <3)
      {console.log("password");
        this.setState({
          isPasswordError:true,
          errorMsg :'Enter The Correct password',})

      }
      else
      {
        console.log("Username");
          let data={email:username,password:password};
          this._httpLogin(data);
      }   


    }

    // _htttpLogin(data)
    // {
    //   console.log("Data value : ",data);
    //     if(data.username == 'admin' && data.password == 'admin2' )
    //     {
    //       console.log("Login");
    //      let data = {userType:'cmp'}
    //       this._setValue(JSON.stringify(data))
    //     }
    //     else{
    //       this.setState({
    //         isPasswordError:true,
    //         errorMsg :'Enter The Correct username and  password',})
    //     }
    // }

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
               
                  { this.state.errorMsg.length !=0 ?
                    <View style={{margin:10, backgroundColor:'#ebb7c1',borderWidth:0.5,borderColor:'red',borderRadius:5,padding:7}}>
                      <Text style={{fontSize:20,color:'red'}}>{this.state.errorMsg}</Text>
                    </View>
                    :
                    <Text></Text>
                  }                  
                    <Item regular  style={[app.formGroup,this.state.isUsernameError? app.errorMsg:app.borderPurpal]} >
                         <Input value={username} placeholder="Username" onChangeText={(text)=>{this.setState({username:text}); console.log(text)}} textContentType="username" keyboardType="default" />
                    </Item> 

                    			{ usernameErrorMsg.length !=0 ?
                    <View style={{margin:10, backgroundColor:'#ebb7c1',borderWidth:0.5,borderColor:'red',borderRadius:5,padding:7}}>
                    <Text style={{fontSize:20,color:'red'}}>{usernameErrorMsg}</Text>
                    </View>:<Text></Text>}
                    
                    <Item regular  style={[app.formGroup,isPasswordError? app.errorMsg:app.borderPurpal,{marginTop:size.window.height/10}]}>
                         <Input value={password} onChangeText={(text)=>{this.setState({password:text});}} placeholder="Password" secureTextEntry={true} textContentType="password"  />
                    </Item>  


                    { passwordErrorMsg.length !=0 ?
                    <View style={{margin:10, backgroundColor:'#ebb7c1',borderWidth:0.5,borderColor:'red',borderRadius:5,padding:7}}>
                    <Text style={{fontSize:20,color:'red'}}>{passwordErrorMsg}</Text>
                    </View>:<Text></Text>}
                   
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