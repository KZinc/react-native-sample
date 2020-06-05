import React, { ReactElement, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Sound from 'react-native-sound';
import Playback from './components/Playback/Playback';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface VoiceMessagePlayer {
  messageUrl: string;
}

const App = ({ messageUrl }): ReactElement => {
  const [isPlaying, setPlaying] = useState(false);
  const voice = new Sound(
    require('./components/Playback/assets/12.aac'),
    (error, sound) => {
      console.log('sound => ', sound);
      if (error) {
        alert(`error${error.message}`);
        return;
      }
      // voice.play(() => {
      //   voice.release();
      // });
    },
  );
  //voice.play();

  return (
    <SafeAreaView style={styles.container}>
      <Playback
        index={1}
        isMy={false}
        isPlaying={isPlaying}
        isMinified={false}
        percent={50}
        onPlayPressed={() => {
          setPlaying(!isPlaying);
          if (isPlaying) {
            voice.play();
          } else {
            voice.stop();
          }
        }}
      />
    </SafeAreaView>
  );
};

export default App;
