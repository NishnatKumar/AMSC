import React, { Component } from 'react';
import {StatusBar,KeyboardAvoidingView,StyleSheet} from 'react-native';
import { Container, Header, Content, Form, Icon,Item, Input,Picker,Text, Label, Button,Card,CardItem,Body, Title, Thumbnail, View } from 'native-base';
import size from '../constants/Layout';
import { processFontFamily } from 'expo-font';
export default class EmploySignUpScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      company: "",
      isCompanyError:false,
      isCompanyErrorMsg:'',

      name:'',
      isNameErorr:false,
      isNameErrorMsg:'',

      userName:'',
      isUserNameError:false,
      isUserNameErrorMsg:'',

      password:'',
      isPasswordError:false,
      isPasswordErrorMsg:'',

      cpassword:'',
      isCPasswordError:false,
      isCPasswordErrorMsg:''
    };
  }
  onValueChange(value) {
    this.setState({
      company: value
    });
  }

    static navigationOptions = {
        header: null
    }

  // This function will check all the validation rule
  checkValidation()
  {
    console.log("On check validation");
    let userName = this.state.userName;
    let cpassword = this.state.cpassword;
    let password = this.state.password;
    let company = this.state.company;
    let name = this.state.name;
    this.resetFunction();
    if(name.length < 3)
    {
      this.setState({ isNameErorr:true,
        isNameErrorMsg:'Enter the Correct Name ',});
    }
    else if(userName.length < 3)
    {
      this.setState({ isUserNameError:true,
        isUserNameErrorMsg:'Enter the Correct Name ',});
    }
    else if(company != '')
    {
      this.setState({ isCompanyError:true,
        isCompanyErrorMsg:'Enter the Correct Name ',});
    }
    else if(password.length < 3)
    {
      this.setState({ isPasswordError:true,
        isPasswordErrorMsg:'Enter the Correct Name ',});
    }
    else if(password != cpassword)
    {
      this.setState({ isCPasswordError:true,
        isCPasswordErrorMsg:'Password Not Match',});
    }
    else
    {
      console.log("Data Save .....")
    }

    
  }


  // this function is use to reset
  resetFunction()
  {
    this.setState({
                   
                    isCompanyError:false,
                    isCompanyErrorMsg:'',

                 
                    isNameErorr:false,
                    isNameErrorMsg:'',

                   
                    isUserNameError:false,
                    isUserNameErrorMsg:'',

                   
                    isPasswordError:false,
                    isPasswordErrorMsg:'',

                   
                    isCPasswordError:false,
                    isCPasswordErrorMsg:''
                  });
  }
  render() {
    return (
      <Container>
      <StatusBar backgroundColor="green" barStyle="default" />
         
      
        <Content>
        
            
         <KeyboardAvoidingView  behavior="padding" enabled>
                <Card transparent style={{marginTop:size.window.height/8,padding:20 }}>
                <Thumbnail style={{alignSelf:'center' }} large source={{uri:"https://images7.boattrader.com/resize/1/23/81/7112381_20190614055920183_1_LARGE.jpg?t=1300421"}}/>
      
                 <Title style={{color:'#1367ed',fontSize:20,fontStyle:'normal',fontWeight:'bold'}}>Depixed</Title>   

                 <Picker
                        mode="dropdown"
                        placeholder="Select your Company"
                        iosIcon={<Icon name="arrow-down" />}
                        placeholder="Select your Company"
                        textStyle={{ color: "#5cb85c" }}
                        itemStyle={{
                          backgroundColor: "#d3d3d3",
                          marginLeft: 0,
                          paddingLeft: 10
                        }}
                        itemTextStyle={{ color: '#788ad2' }}
                        style={{ width: undefined,borderColor:'#16bdf5',borderWidth:0.5 ,marginTop:10}}
                        selectedValue={this.state.company}
                        onValueChange={this.onValueChange.bind(this)}
                       
                      >
                        <Picker.Item label="Select Your Company" value="" />
                        <Picker.Item label="ATM Card" value="key1" />
                        <Picker.Item label="Debit Card" value="key2" />
                        <Picker.Item label="Credit Card" value="key3" />
                        <Picker.Item label="Net Banking" value="key4" />
                      </Picker>
                   
                    
                    <Item regular floatingLabel style={[{margin:5},this.state.isNameErorr? styles.error: styles.normalItem]} >
                        <Label style={styles.lable}>Name</Label>
                        <Input textContentType='name' onChangeText={(text)=>{this.setState({name:text})}}  />
                    </Item> 
                    
                    <Text style={styles.errorMsg}>
                      {this.state.isNameErrorMsg}
                    </Text>


                    <Item regular floatingLabel style={[{margin:5},this.state.isUserNameError? styles.error: styles.normalItem]} >
                        <Label style={styles.lable}>Username</Label>
                        <Input textContentType='username' onChangeText={(text)=>{this.setState({userName:text})}}  />
                    </Item> 
                    <Text style={styles.errorMsg}>
                      {this.state.isUserNameErrorMsg}
                    </Text>
                    <Item regular floatingLabel style={[{margin:5},this.state.isPasswordError? styles.error: styles.normalItem]}>
                        <Label style={styles.lable}>Password</Label>
                        <Input textContentType='newPassword' secureTextEntry={true} onChangeText={(text)=>{this.setState({password:text})}}  />
                    </Item>  
                    <Text style={styles.errorMsg}>
                      {this.state.isPasswordErrorMsg}
                    </Text>

                     <Item regular floatingLabel style={[{margin:5},this.state.isCPasswordError ? styles.error: styles.normalItem]}>
                        <Label style={styles.lable}>Confirm Password</Label>
                        <Input textContentType='password' secureTextEntry={true} onChangeText={(text)=>{this.setState({cpassword:text})}}  />
                    </Item>  
                    <Text style={styles.errorMsg}>
                      {this.state.isCPasswordErrorMsg}
                    </Text> 

                    
                  
                    <Button block danger onPress={()=>{console.log("Next Press");this.checkValidation();}}  ><Text > Sign UP </Text></Button>
                   
                    
                
                   
                       
                    
            </Card>
            </KeyboardAvoidingView>
                   
                   
               
        </Content>
      </Container>
    );
  }
}

const styles= StyleSheet.create({
  lable:{ marginLeft:10},
  item:{
    marginTop:5
  },
  errorMsg:{
    color:'red',
    fontSize:10,
    fontStyle:'italic',
  },
  error:{
    borderColor:'#fa0a3a',
    
  },
  normalItem:{
    borderColor:'#16bdf5',
  }
})