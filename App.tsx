import React, { Component, ReactElement } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  View,
  TextInput,
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
  input: {
    height: 40,
    flex: 1,
    borderRadius: 10,
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.borderAccent,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

class App extends Component {
  state = {
    data: [],
    loading: true,
    search: '',
  };

  componentDidMount(): void {
    this.getData();
  }

  getData = async (): Promise<void> => {
    const { loading } = this.state;
    if (!loading) this.setState({ loading: true });
    getData().then((data: CovidData[]) => {
      this.setState({ data, loading: false });
    }).catch(() => this.setState({ loading: false }));
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
    const {
      data, loading, search,
    } = this.state;
    const filteredData = data.filter((item: CovidData) => !search
    || item.state.toLowerCase().includes(search.toLowerCase()));

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}> Актуальная информация о коронавирусной инфекции в США</Text>
        <FlatList
          data={filteredData}
          refreshing={loading}
          onRefresh={() => this.getData()}
          renderItem={({ item }: { item: CovidData }) => this.renderItem(item)}
          keyExtractor={(item: CovidData) => item.state}
        />
        <View style={styles.inputContainer}>
          <View
            style={styles.inputContainer}
          >
            <TextInput
              style={styles.input}
              placeholder="Найти штат:"
              onChangeText={(value: string) => this.setState({ search: value })}
              value={search}
            />
          </View>

        </View>
      </SafeAreaView>
    );
  }
}

export default App;
