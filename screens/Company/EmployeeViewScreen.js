import React from 'react'

import { Container, Content, Card, CardItem,Text, Left, Thumbnail, Body,View, Right, Title, Subtitle, Button, Item, Input } from "native-base";

import { BackHandler,
    Alert,Modal,AsyncStorage,NetInfo,TouchableHighlight} from 'react-native';
import Processing from '../Processing';
import Global from '../../constants/Global';
import Headers from '../Headers';
import size from '../../constants/Layout';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import app from '../../constants/app';

export default class EmployeeViewScreen extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            isLoading:true,

            uri:"",
            status:'0',

            name:'Nishant Kumar',
            status:'0',
            resume:'',
            address:{address:'atdr',street:'hds',pincode:'813209'},
            contact:'',
            designation:'Developer',

            bank:{},
            email:'nishnatraj656@gmail.com',
            gender:'Other',
            DOB:'',
            joining_date:'',
            id:'',

            modalVisible:false,
            data:null

            
        }

    }

    componentDidMount()
    {
        this.setState({isLoading:false});
        const { navigation } = this.props;
        const data = navigation.getParam('data', null);
     
        if(data != null)
        {
            this.setState({isLoading:false,address:JSON.parse(data.address),bank:JSON.parse(data.bank),name:data.name,
            contact:data.contact_no,designation:data.designation,email:data.email_id,gender:data.gender,DOB:data.date_of_birth,
            uri:Global.API_PIC+data.image,joining_date:data.joining_date,id:data.id,status:data.status,data:data
            });

            this.render();
        }
        this.setState({isLoading:false});
        

    }

    

    static navigationOptions = {
        header: null
    }




    
        componentWillMount() {
            BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
        }
        componentWillUnmount() {
            BackHandler.removeEventListener('hardwareBackPress', () => this.props.navigation.goBack());
        }


        
    /**Get the list of employee */
    _httpList= async (data)=>{
 
        console.log("Click");
      
        let token =  await AsyncStorage.getItem('userToken');
        
        let temp = this.state.data;

        if(temp !=null)
        {
            temp.status = this.state.status;
            temp.designation = this.state.designation;
            this.setState({data:temp})
        }
     
      
        
  
    
  
    NetInfo.getConnectionInfo().then((connectionInfo) => {
     
      if(connectionInfo.type == 'none'){
     
  
        Global.MSG('Oops! No Internet Connection');
        return;
      }else{
        console.log('yes internet '); 
        this.setState({
          isLoading:true,
        });
        fetch(Global.API_URL+'change-status', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',    
              'Content-Type':'application/json',
              "Authorization":'Bearer '+ token,     
            },
            body:JSON.stringify(data)
          
          }).then((response) =>response.json() )
          .then((responseJson) => {
                if(responseJson.message ==="Unauthenticated.")
                {
                  Global.MSG('Your Session Expired');
                  this.props.navigation.navigate('HomePage');
                  return;
                }
          
             if(responseJson.success){

                  this.props.navigation.navigate('AdminWelcome');
                  this.setState({isLoading:false})
                  Global.MSG("Profile Update ");
            
              
             }
            
             else{
              console.log("Server");
              Global.MSG("Server Error");
              this.setState({isLoading:false})
  
               
             }
         })
         .catch((error) => {
            Global.MSG("Network Error Check the connection");
          console.log('on error fetching:'+error);
        
        });
      }
    });
   
  }
  
    

    render()
    {
        const {name,designation,contact,email,isLoading,address,uri,bank,DOB,gender,joining_date,id,status,data} =this.state;
        console.log("Address : ",address);
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
                                <Text style={{fontSize:15,fontWeight:'300',fontStyle:'italic',color:'#bdbfbe'}}>{designation}</Text>
                                <Button transparent onPress={()=>{this.setState({modalVisible:true})}}><Text style={{color:'blue'}}>Edit</Text></Button>
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

                    {/* Document */}
                    <View style={{padding:5,paddingHorizontal:5,alignItems:'center',backgroundColor:'#ededed',justifyContent:'space-between',flexDirection:'row',borderColor:'#000000' }}>
                    <View>
                  
                        <Text style={{alignSelf:'center'}}>Document</Text>
                    </View>
                    <View>
                        
                    </View>

                    </View>
                    <Card>
                        
                        <CardItem>
                            <Left>
                                <Title style={{color:'#000000'}}>Resume</Title>
                            </Left>
                            <Right>
                                {/* TODO : this.props.navigation.navigate('DocumentView',{uri:Global.API_PIC+data.resume})  */}
                               <TouchableOpacity onPress={()=>{}}>
                                <Title style={{color:'#000000'}}>{Global.API_PIC+data.resume}</Title></TouchableOpacity>
                            </Right>
                        </CardItem>
                       
                    </Card>


                    <Button block full onPress={()=>{this.props.navigation.navigate('History',{'id':id})}}><Title>View History</Title></Button>

                    
                </Content>

                {/* Model Start */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <Content style={{ backgroundColor:'rgba(0,0,0,.6)',alignContent:'center'}}>
                        <View style={{justifyContent:'center',flexDirection:'row',marginTop:size.window.width/4}} >
                            <Card >
                                <CardItem>
                                    <Right><Button light onPress={()=>{ this.setState({modalVisible:false})}}  style={{padding:20}}><Text>X</Text></Button></Right>
                                   
                                    
                                </CardItem>
                                <CardItem>

                                
                                        <View>
                                            <Item regular style={[{width:(size.window.width/2)-20},app.formGroup,this.state.isstreetError? app.errorBorder:app.borderPink]} >
                                                    <Input value={designation} 
                                                    onChangeText={(text)=>{this.setState({designation:text})}}
                                                    placeholder="Designation"
                                                    textContentType="fullStreetAddress"
                                                    style={{}} />
                                            </Item>
                                            <Text style={app.errorMsg}>
                                        {this.state.streetErrorMsg}
                                        </Text>
                                    </View>   
                                </CardItem>

                                <CardItem>
                                    <Left>{status=='0'||status == '2'?<Button success style={{padding:20}}  onPress={()=>{ this.setState({status:1,modalVisible:false}); this._httpList(data);}}><Title>Active</Title></Button>:<Text></Text>}</Left>
                                    <Body>{status=='0'||status == '1'?<Button danger onPress={()=>{ this.setState({status:2,modalVisible:false}); this._httpList(data);}} style={{padding:20}}><Title>Block</Title></Button>:<Text></Text>}</Body>
                                    
                                </CardItem>
                              
                            </Card>
                        </View>
                    

                    </Content>
                    </Modal>

                {/* Model close */}
            </Container>
        )
        return <Processing></Processing>
        
        
    }
}