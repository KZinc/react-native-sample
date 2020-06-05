/* eslint-disable global-require */
import React, { ReactElement } from 'react';
import {
  Image, View, StyleSheet, ImageSourcePropType, TouchableOpacity,
} from 'react-native';
import Colors from '../../helpers/assets/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.mainBackground,
    alignItems: 'center',
  },
  play: {
    width: 30,
    marginRight: 11,
    height: 30,
  },
  wave: {
    height: 22,
  },
});

// const index = {
//   0: 'розовая',
//   1: 'цветная',
//   2: 'золотая',
// };

interface PlaybackProps {
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
    pauseGold:string;
    pauseGrey:string;
    pausePink:string;
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
    waveWhite:string;
  }
}

const Playback = ({
  isMy, index, isPlaying, isMinified, percent, onPlayPressed,
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
          style={styles.play}
        />
      </TouchableOpacity>
      <Image
        source={getIcon('wave')}
        style={{ ...styles.wave, width: 230 * (percent * 0.01) }}
      />
    </View>
  );
};

export default Playback;
