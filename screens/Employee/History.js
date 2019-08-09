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
  FlatList,
  NetInfo,
  ToastAndroid,
  BackHandler,
  Alert,
  AsyncStorage
} from 'react-native';

import { MonoText } from '../../components/StyledText';
import { Container, Header,Thumbnail, Left, Body, Right, Button, Icon, Title, Footer, Content, Card } from 'native-base';
import size, {window} from '../../constants/Layout'
import { SizeClassIOS } from 'expo/build/ScreenOrientation/ScreenOrientation';
import app from '../../constants/app';
import Logo from '../Logo';
import Timer from './Timer';
import Time from '../../constants/Time';
import Global from '../../constants/Global';
import Headers from '../Headers';



export default class HistoryScreen extends React.Component {

    constructor(props)
    {
        super(props)
        this.state={
                      isIn:false,
                      inTime:'Office In',
                      outTime:'Office Out',
                      isOut:false,

                      header:['Date','In','Out'],
                      data:[],
                      borderColor:'',
                      userID:'',
                      isLoading:true,

                        
                    }
    }

  static navigationOptions = {
    header:null
}

  componentDidMount()
  {
    this._httpGetUserProfile();
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
}
componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.props.navigation.goBack());
}

_httpGetUserProfile = async () => {
   
  let token =  await AsyncStorage.getItem('userToken');
  let user = await AsyncStorage.getItem('userDetails');
  const { navigation } = this.props;
  const value = navigation.getParam('id', null);
  
  let url;
  let body
     
    
    if(value!=null)
    {
      this.setState({userID:value});
      console.log("USer ID from other : ",this.state.userID);
     url = Global.API_URL+'attendance-show';
     body =JSON.stringify({id:this.state.userID})
    }
    else if(user != null){
      user = JSON.parse(user);
     
      console.log("User value ",typeof user)
      user = user.id;
      this.setState({userID:user});
      url = Global.API_URL+'attendance-history';
      body=JSON.stringify({userID:user})
    }
    else{
      console.log("Nothing to use");
      return;
    }
    

  
    

    console.log('yes internet '+Global.API_URL+'attendance-history Data : ',{userID:this.state.userID}); 
 

  var connectionInfoLocal = '';
  NetInfo.getConnectionInfo().then((connectionInfo) => {
   
    if(connectionInfo.type == 'none'){
      console.log('no internet ');
    Global.MSG("No Internet !");
      return;
    }else{
      // console.log('yes internet '+Global.API_URL+'attendance-history Data : '+JSON.stringify(body)); 
      this.setState({
        isLoding:true,
      });
      fetch(url, {
        method:'POST',
        headers: {
            'Accept': 'application/json',   
            "Content-Type": "application/json",
            "Authorization":'Bearer '+ token,             
          },
        body:body



        }).then((response) =>response.json() )
        .then((responseJson) => {
          // var itemsToSet = responseJson.data;
        console.log('of Get PRofile resp :',responseJson);
           if(responseJson.success)
           {
              // console.log(responseJson.data);
              this.setState({isLoading:false,data:responseJson.data.data});
              // this.setProfile(responseJson.data);
           }
           else
           {
              console.log('User Not found ');
              this.setState({isLoading:false});
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
        //  this._httpSignUp(data);
      });
    }
  });
  console.log(connectionInfoLocal);
}

filter()
{

}

        _keyExtractor = (item, index) => item.id+"";

        _onPressItem = (id) => {
          // updater functions are preferred for transactional updates
          this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id)); // toggle
            return {selected};
          });
        };

        _renderItem = ({item}) => {
          console.log("ITem ",item)
          let intime = item.in
          let out =item.out
          let date = item.in
          return(  

          <View style={styles1.row}>

            <View style={styles1.cell} >
              <Text style={styles1.td} >{date.split(" ")[1]}</Text> 
            </View>
            <View style={styles1.cell} >
              <Text style={styles1.td}>{date.split(" ")[2]}</Text> 
            </View>
            <View style={styles1.cell} >
              <Text style={styles1.td}>{out!=null?date.split(" ")[2]:''}</Text> 
            </View>
          </View>
          )
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
      console.log("Header ",this.state.header);
        return (
          
          <Container>

              <Headers title="History"/>

                

                {/* <Button block full style={styles.btn} onPress={()=>{this.filter()}}><Title>Filter</Title><Icon name={'ios-arrow-down' } size={20}></Icon></Button> */}

                <Content>

                  <View style={styles1.table} >
                    {/* <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                        <View><Text>Hello</Text></View>
                        {this.state.header.forEach(element => {
                          <View><Text>element {element}</Text></View>
                        })}
                    </View> */}

                      <View style={styles1.row}>

                        <View style={styles1.cell} >
                          <Text style={styles1.th} >Date</Text> 
                        </View>
                        <View style={styles1.cell} >
                          <Text style={styles1.th}>In</Text> 
                        </View>
                        <View style={styles1.cell} >
                          <Text style={styles1.th}>Out</Text> 
                        </View>
                      </View>

                      <FlatList
                              data={this.state.data}
                              extraData={this.state}
                              keyExtractor={this._keyExtractor}
                              renderItem={this._renderItem}
                              ListEmptyComponent={this._loading}
                            />


                  </View> 


                </Content>
                
          </Container>

        );
    }
}

const styles ={ btn:[app.btn,app.btnPurple,{marginBottom:20,justifyContent:'space-between',paddingHorizontal:10,}]}

const styles1=StyleSheet.create({table:{margin:10,width:size.window.width-20,borderColor:'#FF00DD',borderWidth:1,borderRadius:5 },
row:{flexDirection:'row' },cell:{width:(size.window.width-20)/3,borderWidth:1,borderColor:'#FF00DD',justifyContent:'center',padding:5 },
th:{alignSelf:'center',fontWeight:'900',fontSize:20}, td:{alignSelf:'center',} });

