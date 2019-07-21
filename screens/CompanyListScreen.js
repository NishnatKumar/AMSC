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
  FlatList
} from 'react-native';

import { Container, Header,Thumbnail, Left, Body, Right, Button, Icon, Title, Footer, Content, Card, Item, Label, Input, Picker, Textarea, CardItem } from 'native-base';
import app from '../constants/app';
import size from '../constants/Layout';







export default class CompanyListScreen extends React.Component {

    constructor(props)
    {
        super(props)
        this.state={
                     companyList:[{id:1,name:'Depixed Media',pic:'https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/fc/3034007-inline-i-applelogo.jpg','category':'IT'}],
                     categoryList:[],
                      loginType:null
                    }
    }

    componentWillMount()
    {
      const { navigation } = this.props;
      const value = navigation.getParam('loginType', 'NO-ID');
      console.log("Login Type : ",value);
      this.setState({loginType:value});

    }

  static navigationOptions = {
    header: null
}

_keyExtractor = (item, index) => item.id+'';

_onPressItem = (value) => {
  // updater functions are preferred for transactional updates

  const {loginType} = this.state;

  this.props.navigation.navigate('EmployeeSignUp',{loginType:'cmp',cmpID:value.id})

 // this.setState((state) => {
  /**   // copy the map rather than modifying state.
    const selected = new Map(state.selected);
    selected.set(id, !selected.get(id)); // toggle
    return {selected};*/

 // });
};

_rendercompanyListItem = ({item}) => {
  console.log("ITem ",item)
  return(
    <TouchableHighlight onPress={()=>{this._onPressItem(item)}}>
         <Card style={{elevation :20}}> 
            <CardItem>
            <Left>
              <Thumbnail small source={{uri:item.pic}}/>     
            </Left>
            <Body>
               <Title style={{fontSize:20,fontWeight:'900',color:'#000000'}} >{item.name}</Title>
               <Title style={{fontSize:15,fontWeight:'500',color:'#c0c1c2'}}>{item.category} </Title>
            </Body>
            </CardItem>
        </Card>
        </TouchableHighlight>)
};
  

    
    render(){
        return (
          
          <Container>
            <StatusBar backgroundColor="green" barStyle="default" />
              <View style={{marginTop:15}}></View>
              <Content>
                <Title style={app.title}>Company Lsit </Title>

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

