import React, { Component } from 'react'

import { Container, Content, Card, CardItem,Text, Left, Thumbnail, Body,View, Right, Title, Subtitle, Button, Icon, Header } from "native-base";
import { BackHandler,
    Alert,StatusBar} from 'react-native';
import Processing from '../Processing';
import Global from '../../constants/Global';
import size from '../../constants/Layout';
import app from '../../constants/app';
import { Avatar } from 'react-native-elements';
import Headers from '../Headers';

export default class CompanyProfileViewScreen extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            isLoading:true,

            uri:"",

            name:'',
            status:'0',
            resume:'',
            address:{address:'',street:'hs',Pincode:''},
            contact:'9939224274',
            post:'Developer',

            bank:{},
            email:'',
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
      
        BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.navigate('AdminWelcome'));

    }

    componentDidMount()
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
    }

    render()
    {
        const {name,contact,email,isLoading,address,uri,Owner,type} =this.state;
        if(!isLoading)
        return(
            <Container>
                <Headers title="Profile"/>
                <Content>
                  
                   
                    <View style={[{height:120},app.bgPurple]}>

                        </View>
                        <View style={{justifyContent:'center',marginTop:-70,marginLeft:size.window.width/3.5,paddingBottom:10 }}>
                            <Avatar
                                        size="xlarge"
                                        rounded
                                        title={this.state.name.length ==0 ? 'P': this.state.name[0]}
                                        
                                        activeOpacity={0.7}
                                    
                                        source={{
                                                uri:
                                                uri!=null?uri:'u',
                                                }}
                                        
                                        />
                            <Text style={{fontSize:20,fontWeight:'900'}}>{name}</Text>
                            <Text style={{fontSize:15,fontWeight:'300',fontStyle:'italic',color:'#bdbfbe'}}>{type}</Text>
                        </View>

                    
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
                               
                                <Subtitle style={{color:'#000000'}}>{address.contact}</Subtitle>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Title style={{color:'#000000'}}>Email</Title>
                            </Left>
                            <Right>
                               
                                <Subtitle style={{color:'#000000'}}>{address.email}</Subtitle>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Title style={{color:'#000000'}}>Website </Title>
                            </Left>
                            <Right>
                               
                                <Subtitle style={{color:'#000000'}}>{address.url}</Subtitle>
                            </Right>
                        </CardItem>
                    </Card>
                 
                  
                    
                </Content>
            </Container>
        )
        return <Processing></Processing>
        
        
    }
}