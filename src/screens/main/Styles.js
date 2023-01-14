import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../utilities/Colors';

export const styles = StyleSheet.create({
  loader: {
    alignSelf: 'center',
    flex: 1,
  },
  screenBox: {
    flex: 1,
    paddingHorizontal: scale(15),
    backgroundColor: COLORS.black,
  },
  screenTitle: {
    fontSize: moderateScale(40),
    fontWeight: '700',
    marginVertical: verticalScale(20),
    color: COLORS.white,
    flexShrink: -1,
  },
  albumCard: {
    flex: 1,
    marginLeft: scale(1),
    marginRight: scale(11),
    marginBottom: verticalScale(20),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: COLORS.muted600,
    paddingBottom: verticalScale(20),
  },
  albumImg: {
    width: '100%',
    borderWidth: moderateScale(4),
    borderColor: COLORS.white,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: COLORS.white,
    marginLeft: moderateScale(8),
    marginVertical: verticalScale(10),
    flexShrink: -1,
  },
  albumtracks: {
    fontSize: moderateScale(10),
    fontWeight: '400',
    color: COLORS.white,
    marginLeft: moderateScale(8),
  },
  albumArtist: {
    fontSize: moderateScale(10),
    fontWeight: '300',
    color: COLORS.white,
    marginLeft: moderateScale(8),
    flexShrink: -1,
  },
  albumReleased: {
    fontSize: moderateScale(10),
    fontWeight: '300',
    color: COLORS.white,
    marginLeft: moderateScale(8),
  },
});
