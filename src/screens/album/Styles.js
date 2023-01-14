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
    fontSize: 40,
    fontWeight: '700',
    marginVertical: verticalScale(20),
    color: COLORS.white,
    flexShrink: -1,
  },
  albumCardWrapper: {
    marginBottom: verticalScale(15),
  },
  albumCard: {
    marginRight: scale(15),
    height: verticalScale(100),
    flexDirection: 'row',
    alignItems: 'center',
  },
  albumImgWrapper: {
    marginVertical: verticalScale(10),
    marginRight: scale(15),
  },
  albumImg: {
    height: '100%',
    borderWidth: moderateScale(4),
    borderColor: COLORS.white,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: verticalScale(2),
    marginLeft: moderateScale(15),
    flexShrink: -1,
  },
  albumArtist: {
    fontSize: moderateScale(10),
    fontWeight: '400',
    color: COLORS.white,
    marginLeft: moderateScale(15),
    flexShrink: -1,
  },
  totalTracks: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: COLORS.white,
    marginVertical: verticalScale(15),
  },
  divider: {
    borderBottomWidth: moderateScale(1),
    borderColor: COLORS.muted600,
    marginBottom: verticalScale(25),
  },
});
