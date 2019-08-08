import React, { Component } from 'react';
import { WebView } from 'react-native';
import { Container } from 'native-base';

export default class DocumentViewScreen extends Component {

    constructor(props)
    {
        super(props)
        this.state={
            uri:this.props.uri
        }
        
    }
    
    componentWillMount()
    {
        const {navigation} = this.props;
        const data = navigation.getParam('uri', "https://www.google.com/");
        this.setState({uri:data});
    }
  render() {
    return (
      <Container><WebView
      source={{ uri: this.state.uri }}
      style={{ marginTop: 20 }}
    /></Container>
      
    );
  }
}