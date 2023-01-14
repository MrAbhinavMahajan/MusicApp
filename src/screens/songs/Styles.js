import {StyleSheet} from 'react-native';
import {verticalScale, moderateScale, scale} from 'react-native-size-matters';
import {COLORS} from '../../utilities/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  albumImg: {
    width: '90%',
    borderWidth: moderateScale(4),
    borderColor: COLORS.muted600,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(30),
    alignSelf: 'center',
  },
  songTitle: {
    fontSize: moderateScale(30),
    fontWeight: '500',
    color: COLORS.white,
    marginHorizontal: '5%',
    marginTop: moderateScale(40),
  },
  artistName: {
    fontSize: moderateScale(18),
    fontWeight: '300',
    color: COLORS.muted400,
    marginHorizontal: '5%',
  },
  playlist: {
    flex: 1,
    backgroundColor: '#1c1917',
  },

  playlistItem: {
    fontSize: moderateScale(16),
    marginBottom: verticalScale(4),
    paddingHorizontal: scale(15),
  },
  trackProgress: {
    marginVertical: verticalScale(10),
    fontSize: moderateScale(24),
    color: '#eee',
    marginLeft: '5%',
  },
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    marginVertical: verticalScale(10),
  },
});
