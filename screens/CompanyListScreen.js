import React, { Component } from 'react';
import {FlatList,NetInfo,BackHandler } from 'react-native';
import { Container, Content, Item, Left, Thumbnail, Subtitle, Body, Title, View } from 'native-base';
import Global from '../constants/Global'
import Headers from '../screens/Headers';
import app from '../constants/app';
import { SearchBar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class CompanyListScreen extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            companyList:[],
            searchData:[],
            searchText:'',
            categoryList:[],

            isLoading:false
        }


    }
  
    static navigationOptions = {
      header: null
  }

    componentDidMount()
    {
      this._httpGetCompanyList()
    }

    componentWillMount()
    {
      BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
    }
     
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () => this.props.navigation.goBack());
    }

    async _httpGetCompanyList()
    {

         var connectionInfo="";
        NetInfo.getConnectionInfo().then((connectionInfo) => {
     
            if(connectionInfo.type == 'none'){
              console.log('no internet ');
            Global.MSG('No Internet')
              return;
            }else{
            
              this.setState({
                isLoading:true,
              });
              fetch(Global.API_URL+'company', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',   
                    'Content-Type':'application/json'   

                  },
                 
                }).then((response) =>response.json() )
                .then((responseJson) => {
                 
                  
      
                  
                 
                   if(responseJson.success){                  
                    
                  
                    this.setState({companyList:responseJson.data.data,searchData:responseJson.data.data});
                    
                    
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
                this.setState({isLoading:false});
                console.log('on error fetching:'+error);
                //  this._httpSignUp(data);
              });
            }
          });
         
    }

    _renderItem=({item})=>
    {
      console.log(item);
        return(
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('EmployeeSignUp',{"companyID":item.id,"loginType":"emp"})}}>
            <Item style={app.item}>
                <Left>
                    <Thumbnail source={{uri:Global.API_PIC+item.pic}} large/>
                </Left>
                <Body>
                    <Title style={{color:'#000000'}}>{item.company_name}</Title>
                    <Subtitle style={{color:'#CFD5E3',}}>{item.type}</Subtitle>
                </Body>
            </Item>
            </TouchableOpacity>
        )
    }

    _onChangeText=(text) =>{
      try {
          console.log(text);
          let local = this.state.searchData;
          
          this.setState({searchText:text})
          let temp =[];
          local.forEach(element => {
             if(element.company_name.split(',')[0].toUpperCase().search(text.toUpperCase()) != -1 || element.type.split(',')[0].toUpperCase().search(text.toUpperCase()) != -1  ){
                 temp.push(element);
               
             } else{ } 
          });
          this.setState({companyList:temp});
                   
          
      } catch (error) {
          console.log(error)
      }
  }

  _onClearText=(text) =>{
     try {
      this.setState({searchText:text})
         
     } catch (error) {
         
     }
 }

  _onPress=(item)=>{

            }

    render()
    {
        const {companyList,categoryList,searchText,searchData} = this.state;
        return(
            <Container>
                <Headers title={"Company List"}/>
                <SearchBar
                  round
                  onChangeText={this._onChangeText}
                  onClearText={this._onClearText}
                  placeholder='Type Here...' 
                  value={searchText}

                  />
                <Content>
                    <FlatList
                       
                        data={companyList}                        
                        renderItem={this._renderItem}
                        keyExtractor={item => item.id.toString()}
                        ItemSeparatorComponent={()=>{return(
                          <View style={{ margin:5 }}>

                          </View>
                        )}}
                        />
                </Content>

               

            </Container>
        );
    }

}