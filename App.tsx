/* eslint-disable react-native/no-color-literals,global-require */
import React, { ReactElement } from 'react';
import {
  StyleSheet,
  SafeAreaView, Image, View,
} from 'react-native';
import PlayRecord from './components/PlayRecord/PlayRecord';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 0,
    minHeight: 120,
    width: 286,
    marginHorizontal: 50,
    marginVertical: 100,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#aeaeae',
  },
});

const App = (): ReactElement => (
  <SafeAreaView style={styles.container}>
    <View style={{ height: 70 }}>
      <PlayRecord
        message={require('./components/Playback/assets/12.aac')}
        isMinified={false}
        isMy={false}
        listened
        backgroundColor="blue"
        index={0}
      />
    </View>
    <View style={{ height: 40, marginTop: 'auto', width: 255 }}>
      <Image source={require('./example2.png')} />
    </View>
  </SafeAreaView>
);

export default App;
