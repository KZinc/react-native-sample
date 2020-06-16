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
    backgroundColor: 'aqua',
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
  },
  dot: {
    backgroundColor: '#e1e1e1',
    marginRight: 5,
    height: 5,
    width: 5,
    borderRadius: 3,
  },
  counter: {
    minWidth: 20,
    fontSize: 15,
    fontWeight: 'bold',
  },
  playbackContainer: {
    flex: 1,
    height: 28,
  },
});

var voice: Sound;
let timeout: number;
let interval = 100;
const play = (url: string, setCounter) => {
  Sound.setActive(true);
  Sound.setSpeakerphoneOn(true);
  Sound.setCategory('Playback');
  Sound.setMode('VoiceChat');
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
    voice.stop(() => {
    });
  }
  if (timeout) {
    clearInterval(timeout);
    timeout = undefined;
    interval = Math.round(voice.getDuration());
  }
};

interface PlayRecordProps {
  backgroundColor: string;
  index: 0 | 1 | 2;
  isMinified: boolean;
  isMy: boolean;
  listened: boolean;
  message: string;
}

const PlayRecord = ({
  listened, message, isMinified, isMy, backgroundColor, index,
}: PlayRecordProps): ReactElement => {
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
      <View style={{ ...styles.playbackContainer, flexBasis: isMinified ? '80%' : '100%' }}>
        <Playback
          index={index}
          isMy={isMy}
          isPlaying={isPlaying}
          isMinified={isMinified}
          percent={percent}
          backgroundColor={backgroundColor}
          onPlayPressed={() => setPlaying(!isPlaying)}
        />
      </View>
      <View style={{ ...styles.counterContainer, paddingLeft: isMinified ? 10 : 36 }}>
        {
          isMinified || listened ? null : <View style={styles.dot} />
        }
        <Text style={{ ...styles.counter, color: '#e1e1e1' }}>{formatNumToSeconds(counter)}</Text>
      </View>
    </SafeAreaView>
  );
};

export default PlayRecord;
