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
  TouchableHighlight
} from 'react-native';

import { MonoText } from '../../components/StyledText';
import { Container, Header,Thumbnail, Left, Body, Right, Button, Icon, Title, Footer, Content, Card } from 'native-base';
import size, {window} from '../../constants/Layout'
import { SizeClassIOS } from 'expo/build/ScreenOrientation/ScreenOrientation';
import app from '../../constants/app';
import Logo from '../Logo';
import Timer from './Timer';
import Time from '../../constants/Time';



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
                      data:[['12/04/2019','12:30','13:08'],['13/04/2019','09:30','13:08'],['14/04/2019','09:30','14:08'],],
                      borderColor:''
                        
                    }
    }

  static navigationOptions = {
    header: null
}

filter()
{

}

   
    render(){
      console.log("Header ",this.state.header);
        return (
          
          <Container>
            <StatusBar backgroundColor="green" barStyle="default" />
                <View style={{marginTop:10}}></View> 

                <Title style={app.title}>History</Title>

                <Button block full style={styles.btn} onPress={()=>{this.filter()}}><Title>Filter</Title><Icon name={'ios-arrow-down' } size={20}></Icon></Button>

                <Content>

                  <View style={{height:100}} >
                    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                        <View><Text>Hello</Text></View>
                        {this.state.header.forEach(element => {
                          <View><Text>element {element}</Text></View>
                        })}
                    </View>


                  </View> 


                </Content>
                
          </Container>

        );
    }
}

const styles ={ btn:[app.btn,app.btnPurpal,{marginBottom:20,justifyContent:'space-between',paddingHorizontal:10,}]}

const styles1=StyleSheet.create({table:{flex:1,borderColor:'#FF00DD'}});

