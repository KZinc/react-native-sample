/* eslint-disable react-native/no-color-literals,react-native/no-inline-styles */
import React, { ReactElement, useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView, Text, View,
} from 'react-native';
import Sound from 'react-native-sound';
import formatNumToSeconds from '../Playback/helpers/helpers';
import Playback from '../Playback/Playback';
import Proximity from 'react-native-proximity';

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
    flex: 1,
    minWidth: 50,
    flexShrink: 0,
    fontSize: 15,
    fontWeight: 'bold',
  },
  playbackContainer: {
    flex: 1,
    height: 28,
  },
});

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
  const [timeout, setTimeoutValue] = useState(0);
  const [isListened, setIsListened] = useState(false);
  const [voice] = useState(
    new Sound(message, () => {
      const duration = Math.round(voice.getDuration());
      if (duration !== trackLength) {
        setTrackLength(duration);
        setCounter(duration);
      }
    }),
  );
  // ACHTUNG DAS FIRED AN DIE JEDEN RENDER!!!!!!!!!
  const proximityListener = ({ proximity }: {proximity: boolean}) => {
    if (proximity) {
      Sound.setCategory('Voice');
    } else {
      Sound.setCategory('Playback');
    }
  };

  Proximity.addListener(proximityListener);


  const stop = (): void => {
    if (voice) voice.pause();
    if (timeout) {
      clearInterval(timeout);
      setTimeoutValue(0);
    }
  };

  const play = (): void => {
    if (!timeout) {
      setTimeoutValue(setInterval(() => {
        voice.getCurrentTime((pos) => {
          setCounter(Math.floor(voice.getDuration() - pos));
        });
      }, 500));
    }
    setIsListened(true);
    voice.play(() => {
      setCounter(trackLength);
      setIsListened(false);
      setPlaying(false);
      stop();
      voice.setCurrentTime(0);
    });
  };

  useEffect(() => {
    if (isPlaying) {
      play();
    } else {
      stop();
    }
  }, [isPlaying, message]);

  useEffect(() => {
    return () => {
      if (timeout) clearInterval(timeout);
      if (voice) voice.release();
    };
  }, [message]);

  const percent = isListened ? (Math.round((counter / trackLength) * 100) - 100) * -1 : 100;

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
        <Text
          style={{ ...styles.counter, color: '#e1e1e1' }}
          numberOfLines={1}
        >{formatNumToSeconds(Math.round(counter))}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default PlayRecord;
