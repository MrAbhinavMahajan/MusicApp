/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
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
import {COLORS} from '../../utilities/Colors';
import {API_KEY} from '../../utilities/Constants';
import {navigate} from '../../app/Service';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {verticalScale} from 'react-native-size-matters';

const ListHeaderComponent =
  (total = 0) =>
  () =>
    (
      <Text style={styles.totalTracks}>
        {total} track{total > 1 ? 's' : ''}
      </Text>
    );

const ItemSeparatorComponent = () => <View style={styles.divider} />;

const SongsCard = ({item, index, songs}) => {
  const {title, artist} = item;
  const handleTrack = () => {
    navigate('Songs', {songs, index});
  };
  return (
    <TouchableHighlight
      underlayColor={COLORS.muted900}
      onPress={handleTrack}
      style={styles.albumCardWrapper}>
      <View style={styles.albumCard}>
        <View style={styles.albumImg}>
          <Icon name="compact-disc" size={verticalScale(45)} color="#900" />
        </View>
        <View>
          <Text numberOfLines={1} style={styles.albumTitle}>
            {title}
          </Text>
          <Text numberOfLines={1} style={styles.albumArtist}>
            {artist}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const AlbumTracks = ({
  route: {
    params: {albumID},
  },
}) => {
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const url = `http://api.napster.com/v2.2/albums/${albumID}/tracks?apikey=${API_KEY}`;
      Axios.get(url)
        .then(res => {
          setSongs(
            res.data.tracks.map(track => ({
              duration: track.playbackSeconds,
              title: track.name,
              artist: track.artistName,
              album: track.albumName,
              id: track.id,
              url: track.href,
              previewURL: track.previewURL,
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
      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" />
      ) : (
        <FlatList
          data={songs}
          renderItem={({item, index}) => SongsCard({item, index, songs})}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={ListHeaderComponent(songs?.length)}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      )}
    </View>
  );
};

export default AlbumTracks;
