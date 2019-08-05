import React, { Component } from 'react'

import { Container, Content, Card, CardItem,Text, Left, Thumbnail, Body,View, Right, Title, Subtitle, Button, Header } from "native-base";

import { BackHandler,
    Alert} from 'react-native';
import Processing from '../Processing';
import Global from '../../constants/Global';
import Headers from '../Headers';

export default class ProfileViewScreen extends React.Component
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
            address:{address:'atdr',street:'hds',pincode:'813209'},
            contact:'',
            post:'Developer',

            bank:{},
            email:'nishnatraj656@gmail.com',
            gender:'Other',
            DOB:'',
            joining_date:''

            
        }

    }

    componentDidMount()
    {
        const { navigation } = this.props;
        const data = navigation.getParam('data', null);
        console.log("#########################Data Value he ye  : ",data);
        if(data != null)
        {
            this.setState({isLoading:false,address:data.address,bank:data.bank,name:data.name,
            contact:data.contact_no,post:data.designation,email:data.email_id,gender:data.gender,DOB:data.date_of_birth,
            uri:Global.API_PIC+data.image,joining_date:data.joining_date
        })
        }
        this.setState({isLoading:false});
        

    }

    static navigationOptions = {
        header: null
    }

    
componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.navigate('Home'));
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.props.navigation.navigate('Home'));
  }
    

    render()
    {
        const {name,post,contact,email,isLoading,address,uri,bank,DOB,gender,joining_date,id} =this.state;
        if(!isLoading)
        return(
            <Container>
                <Headers title="Profile"/>
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail large source={{uri:uri}}/>
                            </Left>
                            <Body>
                                 <Text style={{fontSize:20,fontWeight:'900'}}>{name}</Text>
                                <Text style={{fontSize:15,fontWeight:'300',fontStyle:'italic',color:'#bdbfbe'}}>{post}</Text>
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
                                <Title style={{color:'#000000'}}>DOB</Title>
                            </Left>
                            <Right>
                               
                                <Subtitle style={{color:'#000000', alignItems:'baseline'}}>{DOB}</Subtitle>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Title style={{color:'#000000'}}>Gender</Title>
                            </Left>
                            <Right>
                               
                                <Subtitle style={{color:'#000000',alignItems:'baseline'}}>{gender}</Subtitle>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Title style={{color:'#000000'}}>Joining Date</Title>
                            </Left>
                            <Right>
                               
                                <Subtitle style={{color:'#000000'}}>{joining_date}</Subtitle>
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
                   
                    <View style={{padding:5,paddingHorizontal:5,alignItems:'center',backgroundColor:'#ededed',justifyContent:'space-between',flexDirection:'row',borderColor:'#000000' }}>
                    <View>
                  
                        <Text style={{alignSelf:'center'}}>Bank</Text>
                    </View>
                    <View>
                        
                    </View>

                    </View>
                    <Card>
                        
                        <CardItem>
                            <Left>
                                <Title style={{color:'#000000'}}>Name</Title>
                            </Left>
                            <Right>
                               
                                <Subtitle style={{color:'#000000'}}>{bank.name}</Subtitle>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Title style={{color:'#000000'}}>Bank</Title>
                            </Left>
                            <Right>                               
                                <Subtitle style={{color:'#000000'}}>{bank.Bank}</Subtitle>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Title style={{color:'#000000'}}>AC</Title>
                            </Left>
                            <Right>                               
                                <Subtitle style={{color:'#000000'}}>{bank.AC}</Subtitle>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Title style={{color:'#000000'}}>IFSC CODE</Title>
                            </Left>
                            <Right>                               
                                <Subtitle style={{color:'#000000'}}>{bank.IFSCCODE}</Subtitle>
                            </Right>
                        </CardItem>
                    </Card>

                    <Button block full onPress={()=>{this.props.navigation.navigate('History',{'id':id})}}><Title>View History</Title></Button>

                    
                </Content>
            </Container>
        )
        return <Processing></Processing>
        
        
    }
}