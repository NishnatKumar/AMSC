import React, { Component } from 'react'

import { Container, Content, Card, CardItem,Text, Left, Thumbnail, Body,View, Right, Title, Subtitle, Button, Icon, Header } from "native-base";
import { BackHandler,
    Alert,StatusBar} from 'react-native';
import Processing from '../Processing';
import Global from '../../constants/Global';

export default class CompanyProfileViewScreen extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            isLoading:true,

            uri:"",

            name:'Nishant Kumar',
            status:'0',
            resume:'',
            address:{address:'atdr',street:'hds',Pincode:'813209'},
            contact:'9939224274',
            post:'Developer',

            bank:{},
            email:'nishnatraj656@gmail.com',
            Owner:'Other',
            DOB:'',
            type:''

            
        }

    }

   
    static navigationOptions = {
        header: null
    }
 
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.props.navigation.navigate('AdminWelcome'));
  }
    
    componentWillMount()
    {
        const { navigation } = this.props;
        const data = navigation.getParam('data', null);
        console.log("#########################Data Value he ye  : ",data);
        if(data != null)
        {
            this.setState({isLoading:false,address:data.address,name:data.company_name,
            contact:data.address.contact_no,email:data.address.email_id,Owner:data.owner,type:data.type,
            uri:Global.API_PIC+data.pic
        })
        }
        BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.navigate('AdminWelcome'));

    }

    render()
    {
        const {name,contact,email,isLoading,address,uri,Owner,type} =this.state;
        if(!isLoading)
        return(
            <Container>
                <StatusBar
                            backgroundColor="blue"
                            barStyle="light-content"
                        />
                <View style={{height:StatusBar.currentHeight,backgroundColor:'#022cfa'}}></View>
                <Header>
                    <Left/>
                    <Body>
                        <Title>Profile</Title>
                    </Body>
                </Header>
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail large source={{uri:uri}}/>
                            </Left>
                            <Body>
                            <Button transparent onPress={()=>{this.props.navigation.navigate('CompanyProfile')}}><Text>Edit</Text></Button>
                           
                                <Text style={{fontSize:20,fontWeight:'900'}}>{name}</Text>
                                <Text style={{fontSize:15,fontWeight:'300',fontStyle:'italic',color:'#bdbfbe'}}>{type}</Text>
                               
                            </Body>
                           
                        </CardItem>
                    </Card>

                    
                    <View style={{padding:5,paddingHorizontal:5,backgroundColor:'#ededed',height:5,justifyContent:'space-between',flexDirection:'row',borderColor:'#000000' }}>
                    <View>
                  
                        
                    </View>
                    <View>
                        
                    </View>

                    </View>

                    <Card>
                       
                        <CardItem>
                            <Left>
                                <Title style={{color:'#000000'}}>Owner</Title>
                            </Left>
                            <Right>
                               
                                <Subtitle style={{color:'#000000'}}>{Owner}</Subtitle>
                            </Right>
                        </CardItem>
                        
                    </Card>
                   

                    <View style={{padding:5,paddingHorizontal:5,backgroundColor:'#ededed',height:5,justifyContent:'space-between',flexDirection:'row',borderColor:'#000000' }}>
                    <View>
                  
                        
                    </View>
                    <View>
                        
                    </View>

                    </View>

                    <Card>
                        <CardItem>
                            <Left>
                                <Title style={{color:'#000000'}}>Address</Title>
                            </Left>
                            <Right>
                               
                                <Subtitle style={{color:'#000000'}}>{address.address}</Subtitle>
                                <Subtitle style={{color:'#000000'}}>{address.street}</Subtitle>
                                <Subtitle style={{color:'#000000'}}>{address.state}</Subtitle>
                                <Subtitle style={{color:'#000000'}}>{address.pincode}</Subtitle>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Title style={{color:'#000000'}}>Contact No.</Title>
                            </Left>
                            <Right>
                               
                                <Subtitle style={{color:'#000000'}}>{contact}</Subtitle>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Title style={{color:'#000000'}}>Email</Title>
                            </Left>
                            <Right>
                               
                                <Subtitle style={{color:'#000000'}}>{email}</Subtitle>
                            </Right>
                        </CardItem>
                    </Card>
                 
                  
                    
                </Content>
            </Container>
        )
        return <Processing></Processing>
        
        
    }
}