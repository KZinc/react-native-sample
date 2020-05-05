import React, { Component, ReactElement } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
} from 'react-native';
import Card from './components/Card/Card';
import Colors from './helpers/assets/Colors';
import getData, { CovidData } from './helpers/getDataRequest.helper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.borderAccent,
    borderRadius: 10,
    fontWeight: 'bold',
    padding: 10,
    margin: 10,
    fontSize: 16,
  },
});

class App extends Component {
  state = {
    data: [],
    loading: true,
  };

  componentDidMount(): void {
    this.getData();
  }

  getData = async (): Promise<void> => {
    const { loading } = this.state;
    if (!loading) this.setState({ loading: true });
    getData().then((data: CovidData[]) => {
      this.setState({ data, loading: false });
    });
  }

  renderItem = ({
    screenshot, state, stateShortcut, totalTests,
  }: CovidData): ReactElement => (
    <Card
      screenshot={screenshot}
      stateShortcut={stateShortcut}
      state={state}
      totalTests={totalTests}
    />
  )

  render(): ReactElement {
    const { data, loading } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}> Актуальная информация о коронавирусной инфекции в США</Text>
        <FlatList
          data={data}
          refreshing={loading}
          onRefresh={() => this.getData()}
          renderItem={({ item }: { item: CovidData }) => this.renderItem(item)}
          keyExtractor={(item: CovidData) => item.state}
        />
      </SafeAreaView>
    );
  }
}

export default App;
