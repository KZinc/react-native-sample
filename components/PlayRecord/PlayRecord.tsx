/* eslint-disable react-native/no-color-literals,react-native/no-inline-styles */
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
  const [voice] = useState(
    new Sound(message, () => {
      if (!timeout) {
        setTimeoutValue(setInterval(() => {
          voice.getCurrentTime((pos) => {
            setCounter(Math.floor((voice.getDuration() - pos) * 10));
          });
        }, 500));
      }
    }),
  );

  const play = (): void => {
    voice.play(() => voice.release());
  };

  const stop = (): void => {
    if (voice) voice.pause();
    if (timeout) {
      clearInterval(timeout);
      setTimeoutValue(0);
    }
  };


  useEffect(() => {
    if (isPlaying) {
      play();
    } else {
      stop();
    }
  }, [isPlaying, message]);

  useEffect(() => {
    if (counter < 1) {
      stop();
    }
  }, [counter]);

  useEffect(() => {
    const init = new Sound(message, () => {
      const duration = Math.round(init.getDuration());
      setTrackLength(duration);
      setCounter(duration * 10);
    });
    return () => { if (timeout) clearInterval(timeout); };
  }, [message]);

  const percent = (Math.round((counter / (trackLength * 10)) * 100) - 100) * -1;

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
        >{formatNumToSeconds(Math.round(counter / 10))}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default PlayRecord;
