/* eslint-disable global-require,@typescript-eslint/no-empty-function */
import React, { ReactElement, useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView, Text, View,
} from 'react-native';
import Sound from 'react-native-sound';
import formatNumToSeconds from '../Playback/helpers/helpers';
import Playback from '../Playback/Playback';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  containerBig: {
    flex: 1,
    paddingTop: 24,
    paddingBottom: 7,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'blue',
    paddingHorizontal: 12,
  },
  counterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 36,
  },
  dot: {
    backgroundColor: '#e1e1e1',
    marginRight: 5,
    height: 5,
    width: 5,
    borderRadius: 3,
  },
  counter: {
    fontSize: 14,
  },
  playbackContainer: {
    width: '100%',
    height: 28,
  },
});

var voice: Sound;
let timeout: number;
let interval = 100;
const play = (url: string, setCounter) => {
  voice = new Sound(url, (error) => {
    if (error) {
      console.log('Oh, trouble, trouble, disappointment (');
    }
    interval = Math.round(voice.getDuration());
    voice.play(() => voice.release());
    if (!timeout) {
      timeout = setInterval(() => {
        interval--;
        setCounter(interval);
      }, 1000);
    }

  });
};

const stop = () => {
  if (voice) {
    voice.stop(() => {});
  }
  if (timeout) {
    clearInterval(timeout);
    timeout = undefined;
    interval = Math.round(voice.getDuration());
  }
};

const PlayRecord = ({ message, isMinified }: { isMinified: boolean, message: string }): ReactElement => {
  const [trackLength, setTrackLength] = useState(1);
  const [counter, setCounter] = useState(trackLength);
  const [isPlaying, setPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      play(message, setCounter);
    } else {
      setCounter(trackLength);
      stop();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (counter < 1) {
      stop();
    }
  }, [counter]);

  useEffect(() => {
    const init = new Sound(message, (error) => {
      if (error) {
        console.log('Oh, trouble, trouble, disappointment (');
      }
      const duration = Math.round(init.getDuration());
      setTrackLength(duration);
      setCounter(duration);
    });
    return () => clearInterval(timeout);
  }, [message]);
  const percent = isPlaying ? (Math.round((counter / trackLength) * 100) - 100) * -1 : 100;
  return (
    <SafeAreaView style={isMinified ? styles.container : styles.containerBig}>
      <View style={styles.playbackContainer}>
        <Playback
          index={2}
          isMy={true}
          isPlaying={isPlaying}
          isMinified={isMinified}
          percent={percent}
          onPlayPressed={() => setPlaying(!isPlaying)}
        />
      </View>
      <View style={styles.counterContainer}>
        {
          isMinified ? null : <View style={styles.dot} />
        }
        <Text style={{ ...styles.counter, color: '#e1e1e1' }}>{formatNumToSeconds(counter)}</Text>
      </View>
    </SafeAreaView>
  );
};

export default PlayRecord;
