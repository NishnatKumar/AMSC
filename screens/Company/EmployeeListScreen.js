import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ImageBackground,
  TouchableHighlight,
  DatePickerAndroid,
  FlatList,
  NetInfo,
  ToastAndroid

} from 'react-native';

import { Container, Header,Thumbnail, Left, Body, Right, Button, Icon, Title, Footer, Content, Card, Item, Label, Input, Picker, Textarea, CardItem } from 'native-base';
import app from '../../constants/app';
import size from '../../constants/Layout';
import Global from '../../constants/Global';


export default class CompanyListScreen extends React.Component {

    constructor(props)
    {
        super(props)
        this.state={
                     companyList:[],
                     categoryList:[],
                      loginType:null
                    }
                    
    }

    componentWillMount()
    {

      try {
        console.log("In company List : ")
        const { navigation } = this.props;
        const value = navigation.getParam('loginType', 'NO-ID');
      
        this.setState({loginType:value});
        console.log("Login Type : "+value+"  ",this.state.loginType);
        
        this._httpList();
      } catch (error) {
        console.log("Error in ComponnetList : ");
      }
     

    }

      static navigationOptions = {
        header: null
    }


    
    _httpList= async ()=>{
    console.log("Api Access : ",Global.API_URL+'comapny');
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
      fetch(Global.API_URL+'employee', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',   
            'Content-Type':'application/json'   
          }
        }).then((response) =>response.json() )
        .then((responseJson) => {
          
          console.log("Response : ",responseJson);
           if(responseJson.success){
             console.log(responseJson.data);
            this.setState({companyList:responseJson.data});
            
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
        //  this._httpList();
      });
    }
  });
  console.log(connectionInfoLocal);
}


setValues(data)
{
  console.log("Data Value : ",data);
}

_keyExtractor = (item, index) => item.id+'';

_onPressItem = (value) => {
  // updater functions are preferred for transactional updates

  const {loginType} = this.state;
  console.log("Key press Key Type : ",value);

  console.log("Login Type  : ",loginType);

  this.props.navigation.navigate('EmployeeSignUp',{loginType:'emp',cmpID:value.id});

};

_rendercompanyListItem = ({item}) => {
 console.log("ITem ",Global.API_PIC+item.pic)
  return(
    <TouchableHighlight onPress={()=>{this._onPressItem(item)}}>
         <Card style={{elevation :20}}> 
            <CardItem>
            <Left>
              <Thumbnail small source={{uri:Global.API_URL+item.image}}/>     
            </Left>
            <Body>
               <Title style={{fontSize:20,fontWeight:'900',color:'#000000'}} >{item.name}</Title>
               <Title style={{fontSize:15,fontWeight:'500',color:'#c0c1c2'}}>{item.type} </Title>
            </Body>
            </CardItem>
        </Card>
        </TouchableHighlight>);
};
  

    
    render(){
        return (
          
          <Container>
            <StatusBar backgroundColor="green" barStyle="default" />
              <View style={{marginTop:15}}></View>
              <Content>
                <Title style={app.title}>Employee List </Title>

                      <FlatList
                          data={this.state.companyList}
                          extraData={this.state}
                          keyExtractor={this._keyExtractor}
                          renderItem={this._rendercompanyListItem}
                        />    

                      {/* <FlatList
                          data={this.state.categoryList}
                          extraData={this.state}
                          keyExtractor={this._keyExtractor}
                          renderItem={this._rendercompanyListItem},
                          
                        />                */}

                 
                  
              </Content>

              

          </Container>

        );
    }
}



const styles1=StyleSheet.create({table:{margin:10,width:size.window.width-20,borderColor:'#FF00DD',borderWidth:1,borderRadius:5 },
row:{flexDirection:'row' },cell:{width:(size.window.width-20)/3,borderWidth:1,borderColor:'#FF00DD',justifyContent:'center',padding:5 },
th:{alignSelf:'center',fontWeight:'900',fontSize:20}, td:{alignSelf:'center',} });

