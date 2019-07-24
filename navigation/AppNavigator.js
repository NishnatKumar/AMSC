import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import HomeScreen from '../screens/HomeScreen';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import AuthLoadScreen from '../screens/AuthLoadingScreen';



export default createAppContainer(
  createSwitchNavigator({
    
   // Main: MainTabNavigator,
  
    AuthLoading: AuthLoadScreen,
      App: AppStack,
      Auth:AuthStack ,
    },
    {
     initialRouteName: 'AuthLoading',
    }
  )
);

