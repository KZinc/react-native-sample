/* eslint-disable react-native/no-color-literals,global-require */
import React, { ReactElement, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import Proximity from 'react-native-proximity';
import Sound from 'react-native-sound';
import PlayRecord from './components/PlayRecord/PlayRecord';
import InCallManager from 'react-native-incall-manager';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 0,
    minHeight: 140,
    width: 286,
    backgroundColor: 'white',
    marginHorizontal: 50,
    marginVertical: 100,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
});

const App = (): ReactElement => {
  const [soundCategory, setSoundCategory] = useState('Playback');

  const proximityListener = ({ proximity }: { proximity: boolean }): void => {
    if (proximity) {
      Sound.setCategory('Voice');
      setSoundCategory('Voice');
      InCallManager.turnScreenOff();
    } else {
      Sound.setCategory('Playback');
      setSoundCategory('Playback');
      InCallManager.turnScreenOn();
    }
  };

  useEffect(() => {
    // положил сюда, потому что иначе базовое значение яркости для события не успевает сохраниться
    Proximity.addListener(proximityListener);
    return () => {
      if (proximityListener) Proximity.removeListener(proximityListener);
    };
  }, [soundCategory]);

  return (
    <SafeAreaView style={soundCategory === 'Playback' ? styles.container : {}}>
      <View style={soundCategory === 'Playback' ? styles.showContainer : {}}>
        <View style={{ height: 70 }}>
          <PlayRecord
            message={require('./components/Playback/assets/kiss.aac')}
            id="zita"
            soundCategory={soundCategory as 'Playback' | 'Voice'}
            isMinified={false}
            isMy={false}
            listened
            backgroundColor="white"
            index={0}
          />
        </View>
        <View style={{ height: 70 }}>
          <PlayRecord
            message={require('./components/Playback/assets/14.aac')}
            isMinified={false}
            id="gita"
            soundCategory={soundCategory as 'Playback' | 'Voice'}
            isMy={false}
            listened
            backgroundColor="white"
            index={0}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
