import React, { Component } from 'react';
import {StatusBar } from 'react-native'
import { Header, Left, Body,View,Title } from 'native-base';
export default class Headers extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            title:this.props.title
        }
    }
    render()
    {
        return(
            <View>
                 <StatusBar
                            backgroundColor="blue"
                            barStyle="light-content"
                        />
                <View style={{height:StatusBar.currentHeight,backgroundColor:'#022cfa'}}></View>
                <View>

                </View>
                <Header>
                
                    <Left/>
                    <Body>
                        <Title>{this.state.title}</Title>
                    </Body>
                </Header>
            </View>
        )
    }
}