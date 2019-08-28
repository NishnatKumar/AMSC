import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Container } from 'native-base';
import Headers from './Headers';

export default function SettingsScreen() {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  return (<Container><Headers/></Container>);
}

SettingsScreen.navigationOptions = {
  title: 'app.json',
};
