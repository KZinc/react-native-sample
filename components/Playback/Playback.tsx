/* eslint-disable global-require */
import React, { ReactElement } from 'react';
import {
  Image, View, StyleSheet, ImageSourcePropType, TouchableOpacity,
} from 'react-native';

interface PlaybackProps {
  backgroundColor: string;
  index: number;
  isMinified: boolean;
  isMy: boolean;
  isPlaying: boolean;
  onPlayPressed: () => void;
  percent: number;
}

const iconsRequire: IconsRequireTypes = {
  play: {
    playWhite: require('./assets/playWhite.png'),
    playPink: require('./assets/playPink.png'),
    playGold: require('./assets/playGold.png'),
    playGrey: require('./assets/playGrey.png'),
  },
  wave: {
    waveWhite: require('./assets/waveWhite.png'),
    wavePink: require('./assets/wavePink.png'),
    waveGold: require('./assets/waveGold.png'),
    waveGrey: require('./assets/waveGrey.png'),
  },
  pause: {
    pauseWhite: require('./assets/pauseWhite.png'),
    pausePink: require('./assets/pausePink.png'),
    pauseGrey: require('./assets/pauseGrey.png'),
    pauseGold: require('./assets/pauseGold.png'),
  },
};

interface IconsRequireTypes {
  pause: {
    pauseGold: string;
    pauseGrey: string;
    pausePink: string;
    pauseWhite: string;
  },
  play: {
    playGold: string;
    playGrey: string;
    playPink: string;
    playWhite: string;
  },
  wave: {
    waveGold: string;
    waveGrey: string;
    wavePink: string;
    waveWhite: string;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  play: {
    width: 28,
    marginRight: 5,
    height: 28,
  },
  waveContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wave: {
    width: '100%',
  },
  coverView: {
    marginLeft: 'auto',
    height: 30,
  },
});

const Playback = ({
                    isMy, index, isMinified, isPlaying, percent, onPlayPressed, backgroundColor,
                  }: PlaybackProps): ReactElement => {
  const getIcon = (type: keyof IconsRequireTypes): ImageSourcePropType => {
    if (isMinified || (isMy && index !== 1)) return iconsRequire[type][`${type}White`];
    if (isMy && index === 1) return iconsRequire[type][`${type}Grey`];
    if (!isMy && index === 2) return iconsRequire[type][`${type}Gold`];
    return iconsRequire[type][`${type}Pink`];
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPlayPressed()}>
        <Image
          source={getIcon(isPlaying ? 'pause' : 'play')}
          resizeMode="contain"
          style={styles.play}
        />
      </TouchableOpacity>
      {percent > 0
        ? (
          <View style={styles.waveContainer}>
            <Image
              source={getIcon('wave')}
              resizeMode="contain"
              style={styles.wave}
            />
            <View style={{ ...styles.coverView, width: `${100 - percent}%`, backgroundColor }} />
          </View>
        )
        : <View />}
    </View>
  );
};

export default Playback;
