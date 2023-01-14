import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {appThemeColor} from '../../utilities/Constants';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appThemeColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: moderateScale(30),
    fontWeight: '900',
    color: '#FFF',
  },
});
