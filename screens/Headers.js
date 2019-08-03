import React, { Component } from 'react';
import {StatusBar } from 'react-native'
import { Header, Left, Body,View,Title } from 'native-base';
import app from '../constants/app';
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
                            backgroundColor={app.bgPurple}
                            barStyle="light-content"
                        />
                <View style={[app.bgPurple,{height:StatusBar.currentHeight}]}></View>
                <View>

                </View>
                <Header style={app.bgPurple}>
                
                    <Left/>
                    <Body>
                        <Title>{this.state.title}</Title>
                    </Body>
                </Header>
            </View>
        )
    }
}