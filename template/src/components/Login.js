import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Button
} from 'react-native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

const Login = ({ navigation }) => {

    const [isConnected, setIsConnected] = useState(false);

    const connector = useWalletConnect();
  
    const authenticateUser = async () => {
      try {
        if (connector.connected) {
          setIsConnected(true);
          navigation.navigate("Home");
        } else {
          const session = await connector.connect();
          setIsConnected(true);
          navigation.navigate("Home");
        }  
      } catch (error) {
        console.log(error);
      }
    }

    {/* add disconnect button here to not over complicate the template */}
    const logUserOut = async () => {
        await connector.killSession();
        setIsConnected(false);
    }
  
    return (
      <SafeAreaView>
        <View className="flex-center items-center justify-center h-screen">
            <View className="-mt-40">
                <Text className="text-3xl font-bold">React Native Dapp Login</Text>
            </View>
            <View className="p-4 mt-10 bg-blue-300 rounded-full">
                {!isConnected ? (
                    <Button title="Connect wallet" onPress={authenticateUser} />
                ) : (
                    <Button title="Disconnect" onPress={logUserOut} />
                )}
            </View>
        </View>
      </SafeAreaView>
    );
}

export default Login