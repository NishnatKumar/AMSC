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
  ToastAndroid,
  BackHandler,
  Alert,
  AsyncStorage

} from 'react-native';

import { Container, Header,Thumbnail, Left, Body, Right, Button, Icon, Title, Footer, Content, Card, Item, Label, Input, Picker, Textarea, CardItem } from 'native-base';
import app from '../../constants/app';
import size from '../../constants/Layout';
import Global from '../../constants/Global';
import Headers from '../Headers';


export default class CompanyListScreen extends React.Component {

    constructor(props)
    {
        super(props)
        this.state={
                     companyList:[],
                     categoryList:[],
                     isLoading:true
                    }
                  
    }

    componentDidMount()
    {
      try {
        console.log("In employee List");
        this._httpList();
      } catch (error) {
        console.log("Error in ComponnetList : ");
      }
     
    }

    componentWillMount()
    {

      try {
        console.log("In employee List");
      
      } catch (error) {
        console.log("Error in ComponnetList : ");
      }
     

    }

    static navigationOptions = {
      header: null
  }



    /**Get the list of employee */
    _httpList= async ()=>{
 
    
      var connectionInfoLocal = '';
      let token =  await AsyncStorage.getItem('userToken');

   
      let profile = JSON.parse(await AsyncStorage.getItem('profile'));
      console.log("Profile : ", profile );
      if(profile == null)
      {
        this.props.navigation.goBack();
        Global.MSG("Profile Not Found ");
        return;
      }
      
      

  

  NetInfo.getConnectionInfo().then((connectionInfo) => {
   
    if(connectionInfo.type == 'none'){
   

      Global.MSG('Oops! No Internet Connection');
      return;
    }else{
      console.log('yes internet '); 
      this.setState({
        isLoading:true,
      });
      fetch(Global.API_URL+'employee-list/'+profile.id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',    
            'Content-Type':'application/json',
            "Authorization":'Bearer '+ token,     
          },
        
        }).then((response) =>response.json() )
        .then((responseJson) => {
              if(responseJson.message ==="Unauthenticated.")
              {
                Global.MSG('Your Session Expired');
                this.props.navigation.navigate('HomePage');
                return;
              }
          console.log("Response : ",responseJson);
           if(responseJson.success){
                console.log(responseJson.data);
          this.setState({companyList:responseJson.data.data});
            
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
               isLoading:false,
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
  console.log(connectionInfoLocal);
}

  
componentWillMount() {
  BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', () => this.props.navigation.goBack());
}
  

setValues(data)
{
  console.log("Data Value : ",data);
}

_keyExtractor = (item, index) => item.id+'';

_onPressItem = (value) => {
  
 


  this.props.navigation.navigate('EmployeeView',{data:value});

 
};

_rendercompanyListItem = ({item}) => {

  return(
    <TouchableHighlight onPress={()=>{this._onPressItem(item)}}>
         <Card style={{elevation :20}}> 
            <CardItem>
            <Left>
              <Thumbnail small source={{uri:Global.API_PIC+item.image}}/>     
            </Left>
            <Body>
               <Title style={{fontSize:20,fontWeight:'900',color:'#000000'}} >{item.name}</Title>
               <Title style={{fontSize:15,fontWeight:'500',color:'#c0c1c2'}}>{item.designation} </Title>
            </Body>
            <Right>
              {
                item.status == 0 ?<View style={{backgroundColor:'#ec971f',padding:5,borderRadius:5}} ><Text style={{color:'#fff'}}>Not Verified</Text></View>
                :
                item.status == 1 ?
                <View style={{backgroundColor:'#3cd1c2',padding:5,borderRadius:5}} ><Text style={{color:'#fff'}}>Active</Text></View>
                :
                <View style={{backgroundColor:'#d9534f',padding:5,borderRadius:5}} ><Text style={{color:'#fff'}}>Blocked</Text></View>
              
     
     
              }
                       </Right>
            </CardItem>
        </Card>
        </TouchableHighlight>);
};

    _loading = ()=>{
      if(this.state.isLoading)
      return(
        <View  style={{alignItems:'center'}}> 
          <Text>Wait List is Loading....</Text>
        </View>
      )
      else
        return(<View style={{alignItems:'center'}}>
            <Text>List is Empty......</Text>
             </View>)
    }
  

    
    render(){
        return (
          
          <Container>
              <Headers title={"Employee List"}/>
              <View style={{marginTop:15}}></View>
              <Content>
                      <FlatList
                          data={this.state.companyList}
                          extraData={this.state}
                          keyExtractor={this._keyExtractor}
                          renderItem={this._rendercompanyListItem}
                          ListEmptyComponent={this._loading}
                        />    

                     

                 
                  
              </Content>

              

          </Container>

        );
    }
}



const styles1=StyleSheet.create({table:{margin:10,width:size.window.width-20,borderColor:'#FF00DD',borderWidth:1,borderRadius:5 },
row:{flexDirection:'row' },cell:{width:(size.window.width-20)/3,borderWidth:1,borderColor:'#FF00DD',justifyContent:'center',padding:5 },
th:{alignSelf:'center',fontWeight:'900',fontSize:20}, td:{alignSelf:'center',} });

