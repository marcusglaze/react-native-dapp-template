import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Button,
    TouchableOpacity,
    Linking,
    Image
} from 'react-native';
import Blockies from 'react-native-blockies';

import { useSelector, useDispatch } from 'react-redux';
import { loadAccount, disconnectWallet } from '../store/actions';

const Home = ({ navigation }) => {

  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(true);

  const connector = useSelector(store => store.connector.connector);
  //const account = useSelector(store => store.connector.account);
  //const chainId = useSelector(store => store.connector.chainId);
  //const peerMeta = useSelector(store => store.connector.peerMeta);

  const account = connector.accounts[0];
  const chainId = connector.chainId;
  const peerMeta = connector.peerMeta;

  const disconnectWalletHandler = async () => {
    const success = await disconnectWallet(connector, dispatch);
    setIsConnected(!success);
  }

  useEffect(() => {
    if (!isConnected) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  }, [isConnected])

  if (!connector.connected) { return null; }

  return (
    <SafeAreaView>
        <View className="items-center h-screen">
          <View className='mt-10'>
            <Text className="text-3xl font-bold">My Account</Text>
          </View>

          <View className='items-center justify-center flex-center h-1/2'>
              <Text className='text-lg'>{`Connected with ${peerMeta.name}`}</Text>
              <Text className='text-lg'>on</Text>
              <Text className='text-lg'>{chainId === 5 && 'Goerli Test Network'}</Text>
            {/* For template purposes, will be hardcoding url */}
            <TouchableOpacity 
              className='p-4 items-center justify-center flex-center h-1/2'
              onPress={() => Linking.openURL(`https://goerli.etherscan.io/address/${account}`)}
            >
              <Blockies
                  blockies={account}
                  size={200}
                  style={{width:55, height:55}}
              />
              <View className='p-4'>
                <Text className='text-2xl text-blue-500'>
                  {account.slice(0,5) + '...' + account.slice(38,42)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View className='bg-blue-300 rounded-full p-4'>
            <Button 
              title="Disconnect wallet" 
              onPress={disconnectWalletHandler}
            />
          </View>
        </View>
    </SafeAreaView>
  )
}

export default Home;
