import React, { useState } from 'react';
import type {Node} from 'react';

import { Provider } from 'react-redux';

import './shim';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WalletConnectProvider } from '@walletconnect/react-native-dapp/dist/providers';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { 
  Login,
  Home 
} from './src/components';

import store from './src/store/store';

const Stack = createStackNavigator();

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <WalletConnectProvider
        redirectUrl={Platform.OS === 'web' ? window.location.origin : 'yourappscheme://'}
        storageOptions= {{
          asyncStorage: AsyncStorage,
        }}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{
                headerShown: false
              }}
            >
              <Stack.Screen name="Login" component={Login}/>
              <Stack.Screen name="Home" component={Home}/>
            </Stack.Navigator>
          </NavigationContainer>
      </WalletConnectProvider>
    </Provider>
  )
};

export default App;
