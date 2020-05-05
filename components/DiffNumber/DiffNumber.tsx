import React, { useState, useEffect, ReactElement } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const getHistorical = async (state: string, date: string): Promise<{ totalTestResults: string}> => (
  await fetch(`https://covidtracking.com/api/v1/states/${state}/${date}.json`)
).json();

const DiffNumber = ({
  state,
  date,
  totalNow,
}: { date: string, state: string, totalNow: number }): ReactElement => {
  const [changes, setChanges] = useState(0);
  const [loading, setLoaded] = useState(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const result = await getHistorical(state, date);
      setChanges(totalNow - +result.totalTestResults);
      setLoaded(false);
    };
    fetchData();
  }, [state, date, totalNow]);

  return (
    <View>
      <Text>Изменения за неделю: {changes}</Text>
      <ActivityIndicator
        animating={loading}
      />
    </View>
  );
};

export default DiffNumber;
