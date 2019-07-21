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
  ActivityIndicator
} from 'react-native';

import { Container, Header,Thumbnail, Left, Body, Right, Button, Icon, Title, Footer, Content, Card, Item } from 'native-base';
import size, {window} from '../constants/Layout'




export default class Processing extends React.Component {

    render()
    {
        return(<Content style={{ backgroundColor:'rgba(0,0,0,.6)',alignContent:'center'}}>
        <View style={{justifyContent:'center',flexDirection:'row'}} >
            <Card style={{marginTop:size.window.height/2-30,padding:5,width:240}}>
              <Item style={{borderWidth:0,padding:15,alignContent:'center'}}>
                <Left><ActivityIndicator size="large" color="#0000ff"/></Left>
                <Body><Text>Wait Loding.....</Text></Body>                    
              </Item>
            </Card>
        </View>
     

    </Content>)
    }

}