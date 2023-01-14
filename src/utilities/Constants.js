import {Dimensions, Platform} from 'react-native';
import deviceInfoModule from 'react-native-device-info';

export const {width: screenWidth, height: screenHeight} =
  Dimensions.get('window');

export const isAndroid = Platform.OS === 'android';

export const isiOS = Platform.OS === 'ios';

export const hasNotch = deviceInfoModule.hasNotch();

export const appThemeColor = 'black';

export const API_KEY = 'ZTYwMzE1YmMtMTIwZi00MDNmLTljMmItZTdmYjdhNzhkYTVm';
