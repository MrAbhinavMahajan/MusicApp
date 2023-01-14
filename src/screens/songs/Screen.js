import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import TrackPlayer, {
  useTrackPlayerEvents,
  usePlaybackState,
  useProgress,
  Event,
  State,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';
import {setupPlayer, addTracks} from '../../../trackPlayerServices';
import {styles} from './Styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {COLORS} from '../../utilities/Colors';
import {verticalScale} from 'react-native-size-matters';

function Header() {
  const [info, setInfo] = useState({});
  useEffect(() => {
    setTrackInfo();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (event.state == State.nextTrack) {
      setTrackInfo();
    }
  });

  async function setTrackInfo() {
    const track = await TrackPlayer.getCurrentTrack();
    const info = await TrackPlayer.getTrack(track);
    setInfo(info);
  }

  return (
    <View>
      <View style={styles.albumImg}>
        <FontAwesome5
          name="compact-disc"
          size={verticalScale(120)}
          color="#900"
        />
      </View>
      <Text style={styles.songTitle} numberOfLines={1}>
        {info?.title}
      </Text>
      <Text style={styles.artistName} numberOfLines={1}>
        {info?.artist}
      </Text>
    </View>
  );
}

function TrackProgress() {
  const {position, duration} = useProgress(200);

  function format(seconds) {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  return (
    <View>
      <Text style={styles.trackProgress}>
        {format(position)} / {format(duration)}
      </Text>
    </View>
  );
}

function Playlist() {
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);

  async function loadPlaylist() {
    const queue = await TrackPlayer.getQueue();
    setQueue(queue);
  }

  useEffect(() => {
    loadPlaylist();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (event.state == State.nextTrack) {
      TrackPlayer.getCurrentTrack().then(index => setCurrentTrack(index));
    }
  });

  // eslint-disable-next-line react/no-unstable-nested-components
  function PlaylistItem({index, title, isCurrent}) {
    function handleItemPress() {
      TrackPlayer.skip(index);
    }
    return (
      <Text
        onPress={handleItemPress}
        style={{
          ...styles.playlistItem,
          ...{color: !isCurrent ? COLORS.muted600 : COLORS.white},
        }}>
        {title}
      </Text>
    );
  }

  async function handleShuffle() {
    let queue = await TrackPlayer.getQueue();
    await TrackPlayer.reset();
    queue.sort(() => Math.random() - 0.5);
    await TrackPlayer.add(queue);
    loadPlaylist();
  }

  return (
    <View style={{flex: 1}}>
      <Controls onShuffle={handleShuffle} />

      <View style={styles.playlist}>
        <FlatList
          data={queue}
          renderItem={({item, index}) => (
            <PlaylistItem
              index={index}
              title={item.title}
              isCurrent={currentTrack == index}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

function Controls({onShuffle}) {
  const playerState = usePlaybackState();

  async function handlePlayPress() {
    if ((await TrackPlayer.getState()) == State.Playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  }

  return (
    <View style={styles.controls}>
      <Icon.Button
        name="arrow-left"
        size={28}
        backgroundColor="transparent"
        onPress={() => TrackPlayer.skipToPrevious()}
      />
      <Icon.Button
        name={playerState == State.Playing ? 'pause' : 'play'}
        size={28}
        backgroundColor="transparent"
        onPress={handlePlayPress}
      />
      <Icon.Button
        name="arrow-right"
        size={28}
        backgroundColor="transparent"
        onPress={() => TrackPlayer.skipToNext()}
      />
      <Icon.Button
        name="random"
        size={28}
        backgroundColor="transparent"
        onPress={onShuffle}
      />
    </View>
  );
}

function SongsScreen({
  route: {
    params: {songs, index},
  },
}) {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();
      if (isSetup) {
        await addTracks(songs, index);
      }
      setIsPlayerReady(isSetup);
    }
    setup();
    return () => {
      TrackPlayer.reset();
    };
  }, [songs, index]);

  if (!isPlayerReady) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#bbb" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <TrackProgress />
      <Playlist />
    </SafeAreaView>
  );
}

export default SongsScreen;
