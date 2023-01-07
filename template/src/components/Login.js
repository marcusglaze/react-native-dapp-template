import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Button
} from 'react-native'
import { useDispatch } from 'react-redux';
import { 
  loadConnector,
  connectWallet
} from '../store/actions';

const Login = ({ navigation }) => {

    const dispatch = useDispatch();
    const [isConnected, setIsConnected] = useState(false);

    const connector = loadConnector(dispatch);
        
    const loadAccountHandler = async () => {
      const success = await connectWallet(connector, dispatch);
      setIsConnected(success);
    }

    useEffect(() => {
      if (isConnected) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }
    }, [isConnected])

    return (
      <SafeAreaView>
        <View className="flex-center items-center justify-center h-screen">
            <View className="-mt-40">
                <Text className="text-3xl font-bold">React Native Dapp Login</Text>
            </View>
            <View className="p-4 mt-10 bg-blue-300 rounded-full">
              <Button title="Connect wallet" onPress={loadAccountHandler} />
            </View>
        </View>
      </SafeAreaView>
    );
}

export default Login;
