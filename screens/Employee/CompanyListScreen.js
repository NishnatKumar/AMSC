import React, { Component } from 'react';
import {FlatList,NetInfo } from 'react-native';
import { Container, Content, Item, Left, Thumbnail, Subtitle } from 'native-base';
import Global from '../../constants/Global';
import Headers from '../Headers';
class CompanyListScreen extends React.Component
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

    async _httpGetCompanyList()
    {

         
        NetInfo.getConnectionInfo().then((connectionInfo) => {
     
            if(connectionInfo.type == 'none'){
              console.log('no internet ');
            Global.MSG('No Internet')
              return;
            }else{
            
              this.setState({
                isLoading:true,
              });
              fetch(Global.API_URL+'register', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',   
                    'Content-Type':'application/json'   

                  },
                  body: JSON.stringify(data)
                }).then((response) =>response.json() )
                .then((responseJson) => {
                 
                  
      
                   this.setState({isLoading:false});
                 
                   if(responseJson.success){
                     Message('Enter Userid And Password to login');
                     Alert.alert('User Registration Successful! Please Login')
                     
                   
                   this.setState({
                     isLoading:false,
                   });
                   this.props.navigation.navigate('EmployeeSignIn');
                   }else{
                    
                    
                     this.setState({
                       isLoading:false,isUserNameError:true,isUserNameErrorMsg:responseJson.msg
                     });
       
                     console.log("Error in signUP :")
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
          console.log(connectionInfoLocal);
    }

    _renderItem=(item)=>
    {
        return(
            <Item>
                <Left>
                    <Thumbnail source={{uri:item.pic}} large/>
                </Left>
                <Body>
                    <Title>{item.name}</Title>
                    <Subtitle></Subtitle>
                </Body>
            </Item>
        )
    }

    
    _loading = ()=>{
      if(this.state.isLoading)
      return <Processing/>
      else
        return(<View style={{alignItems:'center'}}>
            <Text>List is Empty......</Text>
             </View>)
    }

    render()
    {
        const {companyList,categoryList,searchText,searchData} = this.state;
        return(
            <Container>
                <Headers/>
                <Content>
                    <FlatList
                        data={categoryList}
                        extraData = {this.state}
                        renderItem={this._renderItem}
                        ListEmptyComponent={this._loading}


                        />
                </Content>

               

            </Container>
        );
    }

}