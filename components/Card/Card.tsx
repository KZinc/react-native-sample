import React, { ReactElement } from 'react';
import {
  Image, View, Text, StyleSheet,
} from 'react-native';
import Colors from '../../helpers/assets/Colors';
import { CovidData } from '../../helpers/getDataRequest.helper';
import DiffNumber from '../DiffNumber/DiffNumber';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: Colors.mainBackground,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  textWrapper: {
    flex: 1,
  },
  state: {
    fontWeight: 'bold',
  },
});

const Card = ({
  state, stateShortcut, totalTests, screenshot,
}: CovidData): ReactElement => (
  <View style={styles.container}>
    <View style={styles.textWrapper}>
      <View>
        <Text style={styles.state}>{state}</Text>
      </View>
      <View>
        <Text>Tестов проведено: {totalTests} </Text>
        <DiffNumber state={stateShortcut} date="20200428" totalNow={totalTests} />
      </View>
    </View>
    <View>
      <Image
        fadeDuration={2000}
        source={{ uri: screenshot }}
        style={styles.image}
      />
    </View>
  </View>
);

export default Card;
