import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = ({ navigation }) => {

  return (
    <SafeAreaView>
        <View className="flex-center items-center justify-center h-full">
            <Text className="text-3xl font-bold">Home</Text>
            <Icon name="home" size={30} color="black" />
        </View>
    </SafeAreaView>
  )
}

export default Home;
