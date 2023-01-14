import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './Service';
import SplashScreen from '../screens/splash/Screen';
import MainScreen from '../screens/main/Screen';
import AlbumScreen from '../screens/album/Screen';
import SongsScreen from '../screens/songs/Screen';

const {Navigator, Screen} = createNativeStackNavigator();

const RootStack = () => (
  <NavigationContainer ref={navigationRef}>
    <Navigator
      initialRouteName={'Splash'}
      screenOptions={{
        gestureEnabled: false,
        animation: 'fade_from_bottom',
        orientation: 'portrait',
        headerShown: false,
      }}>
      <Screen name={'Splash'} component={SplashScreen} />
      <Screen name={'Main'} component={MainScreen} />
      <Screen
        name={'Album'}
        component={AlbumScreen}
        options={({route}) => ({
          title: route.params?.title,
          headerShown: true,
          headerTitleAlign: 'center',
        })}
      />
      <Screen
        name={'Songs'}
        component={SongsScreen}
        options={({route}) => ({
          title: route.params?.songs?.title ?? 'Songs',
          headerShown: true,
          headerTitleAlign: 'center',
        })}
      />
    </Navigator>
  </NavigationContainer>
);

export default RootStack;
