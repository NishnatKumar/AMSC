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
  FlatList
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
                      data:[{date:'12/04/2019',in:'12:30',out:'13:08'},{'date':'13/04/2019',in:'09:30',out:'13:08'},{'date':'14/04/2019',in:'09:30',out:'14:08'}],
                      borderColor:'',


                        
                    }
    }

  static navigationOptions = {
    header: null
}

filter()
{

}

        _keyExtractor = (item, index) => item.date;

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
          return(  <View style={styles1.row}>

            <View style={styles1.cell} >
              <Text style={styles1.td} >{item.date}</Text> 
            </View>
            <View style={styles1.cell} >
              <Text style={styles1.td}>{item.in}</Text> 
            </View>
            <View style={styles1.cell} >
              <Text style={styles1.td}>{item.out}</Text> 
            </View>
          </View>)
        };
          
           
         
       


   
    render(){
      console.log("Header ",this.state.header);
        return (
          
          <Container>
            <StatusBar backgroundColor="green" barStyle="default" />
                <View style={{marginTop:10}}></View> 

                <Title style={app.title}>History</Title>

                <Button block full style={styles.btn} onPress={()=>{this.filter()}}><Title>Filter</Title><Icon name={'ios-arrow-down' } size={20}></Icon></Button>

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
                            />


                  </View> 


                </Content>
                
          </Container>

        );
    }
}

const styles ={ btn:[app.btn,app.btnPurpal,{marginBottom:20,justifyContent:'space-between',paddingHorizontal:10,}]}

const styles1=StyleSheet.create({table:{margin:10,width:size.window.width-20,borderColor:'#FF00DD',borderWidth:1,borderRadius:5 },
row:{flexDirection:'row' },cell:{width:(size.window.width-20)/3,borderWidth:1,borderColor:'#FF00DD',justifyContent:'center',padding:5 },
th:{alignSelf:'center',fontWeight:'900',fontSize:20}, td:{alignSelf:'center',} });

