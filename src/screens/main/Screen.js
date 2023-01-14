/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import {styles} from './Styles';
import {API_KEY} from '../../utilities/Constants';
import {COLORS} from '../../utilities/Colors';
import {navigate} from '../../app/Service';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {verticalScale} from 'react-native-size-matters';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const AlbumCard = ({item, index}) => {
  const {title, id, artist, trackCount, released} = item;
  const time = new Date(released);
  const month = time.getMonth();
  const year = time.getFullYear();
  const handleAlbum = () => {
    navigate('Album', {albumID: id, title});
  };

  return (
    <TouchableHighlight
      underlayColor={COLORS.muted900}
      onPress={handleAlbum}
      style={styles.albumCard}>
      <View>
        <View style={styles.albumImg}>
          <Icon name="compact-disc" size={verticalScale(45)} color="#900" />
        </View>
        <Text numberOfLines={1} style={styles.albumTitle}>
          {title}
        </Text>
        <Text numberOfLines={1} style={styles.albumtracks}>
          {trackCount} track{trackCount > 1 ? '' : 's'}
        </Text>
        <Text numberOfLines={1} style={styles.albumReleased}>
          {`${months[month]} ${year}`}
        </Text>
        <Text numberOfLines={1} style={styles.albumArtist}>
          {artist}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const Main = props => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const url = `http://api.napster.com/v2.2/albums/top?apikey=${API_KEY}`;
      Axios.get(url)
        .then(res => {
          setAlbums(
            res.data.albums.map(album => ({
              title: album.name,
              artist: album.artistName,
              id: album.id,
              url: album.href,
              released: album.released,
              trackCount: album.trackCount,
            })),
          );
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    };

    loadData();
  }, []);

  return (
    <View style={styles.screenBox}>
      <Text style={styles.screenTitle}>Albums</Text>

      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" />
      ) : (
        <FlatList
          data={albums}
          numColumns={2}
          renderItem={AlbumCard}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default Main;
