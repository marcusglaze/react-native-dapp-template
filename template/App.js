/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Button
} from 'react-native';

import './shim';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WalletConnectProvider } from '@walletconnect/react-native-dapp/dist/providers';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { 
  Login,
  Home 
} from './src/components';

const Stack = createStackNavigator();

const WalletConnectExample = () => {

  const [isConnected, setIsConnected] = useState(false);

  const connector = useWalletConnect();

  const authenticateUser = async () => {
    try {
      if (connector.connected) {
        setIsConnected(true);
      } else {
        const session = await connector.connect();
        setIsConnected(true);
      }  
    } catch (error) {
      console.log(error);
    }
  }

  const logUserOut = async () => {
    await connector.killSession();
    setIsConnected(false);
  }

  return (
    <SafeAreaView>
      {!isConnected ? (
        <Button title="Connect" onPress={authenticateUser} />
      ) :  (
        <Button title="Disconnect" onPress={logUserOut}
        />
      )}
    </SafeAreaView>
  );
};

const App: () => Node = () => {
  return (
    <WalletConnectProvider
      redirectUrl={Platform.OS === 'web' ? window.location.origin : 'yourappscheme://'}
      storageOptions= {{
        asyncStorage: AsyncStorage,
      }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Home" component={Home}/>
          </Stack.Navigator>
        </NavigationContainer>
    </WalletConnectProvider>
  )
};

export default App;
