import React, { Component } from 'react'

import { Container, Content, Card, CardItem,Text, Left, Thumbnail, Body,View } from "native-base";

export default class ProfileViewScreen extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            isLoading:false,

            pic:"",

            name:'Nishant Kumar',
            status:'0',
            resume:'',
            address:{},
            contact:'9939224274',
            post:'Developer',

            bank:{},
            email:'nishnatraj656@gmail.com',

            
        }

    }

    render()
    {
        const {name,post,contact,email} =this.state;
        return(
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail large source={{uri:'http://attendance.depixed.in/uplaod/default.png'}}/>
                            </Left>
                            <Body>
                                <Text style={{fontSize:20,fontWeight:'900'}}>{name}</Text>
                                <Text style={{fontSize:15,fontWeight:'300',fontStyle:'italic',color:'#bdbfbe'}}>{post}</Text>
                            </Body>
                        </CardItem>
                    </Card>

                    <View style={{padding:5,paddingHorizontal:5,backgroundColor:'#ededed',justifyContent:'space-between',flexDirection:'row',borderColor:'#000000' }}>
                    <View>
                  
                        <Text>{contact}</Text>
                    </View>
                    <View>
                        <Text>{email}</Text>
                    </View>

                    </View>
                </Content>
            </Container>
        )
    }
}