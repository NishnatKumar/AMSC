import React, { Component } from 'react';
import { WebView } from 'react-native';

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

        const data = navigation.getParam('uri', "d ");
        this.setState({uri:data});
    }
  render() {
    return (
      <WebView
        source={{ uri: this.state.uri }}
        style={{ marginTop: 20 }}
      />
    );
  }
}