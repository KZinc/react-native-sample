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
    minHeight: 160,
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
    {/* eslint-disable-next-line global-require */}
    <View style={{height: 70}}>
      <PlayRecord message={require('./components/Playback/assets/12.aac')} isMinified={false} />
    </View>
    <View style={{height: 70, marginTop: 'auto'}}>
      <Image source={require('./example.png')} />
    </View>
  </SafeAreaView>
);

export default App;
