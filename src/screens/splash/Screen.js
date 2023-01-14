import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {styles} from './Styles';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const initialLaunchTimer = setTimeout(() => {
      navigation.replace('Main');
    }, 3000);

    return () => {
      clearTimeout(initialLaunchTimer);
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Music App</Text>
    </View>
  );
};

export default SplashScreen;
