import * as React from 'react';
import {Component} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import EmptyList from "./EmptyList/EmptyList";
import {request, storage, StorageActions} from "./loaderHelper";

interface ListStateInterface {
    loading: boolean,
    page: number,
    listItems: ListElement[],
    refreshing: boolean,
    saveDataToStorage: boolean,
}

interface ListElement {
    userId: string,
    id: string,
    title: string,
    body: string
}

export default class List extends Component<{}, ListStateInterface> {

    constructor(props: {}) {
        super(props);
        this.state = {
            loading: false,
            page: 1,
            listItems: [],
            refreshing: false,
            saveDataToStorage: true,
        };
    }

    componentDidMount(): void {
        this.getData().then();
        this.saveToStorage();
        this.getItemsFromStorage()
    }

    saveToStorage(){
        if(this.state.saveDataToStorage){
            storage(StorageActions.SAVE, 'list', this.state.listItems)
        }
    }
    getItemsFromStorage(){
        // if(this.state.saveDataToStorage){
        //     storageGet( 'list').then((result)=>{
        //
        //         console.warn('result', result);
        //
        //     });
        // }
    }
    clearStorage(){
        if(!this.state.saveDataToStorage){
            storage(StorageActions.DELETE, 'list')
        }
    }

    getData = async () => {
        request(this.state.page).then(response => {
            const listItems = this.state.refreshing? response : this.state.listItems.concat(response);
            this.setState({
                listItems,
                loading: false,
                refreshing: false,
            });
            this.saveToStorage();
        })
    };

    // @ts-ignore
    renderRow = ({item}) => {
        return (
            <View style={styles.item}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemBody}>{item.body}</Text>
            </View>
        )
    };

    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1,
            loading: true,
        }, this.getData)
    };

    renderFooter = () => {
        return (
            this.state.loading ?
                <View style={styles.loader}>
                    <ActivityIndicator size='large'/>
                </View>
                :
                null
        )
    };

    pressCheckBox = () => {
        this.setState({
            saveDataToStorage:!this.state.saveDataToStorage
        });
        if(this.state.saveDataToStorage){
            this.saveToStorage();
        }else{
            this.clearStorage();
        }
    };

    renderHeader = () => {
        const text = this.state.saveDataToStorage? 'Сохранять данные при выходе': 'Не сохранять данные при выходе';
        return (
            <TouchableOpacity style={styles.header} onPress={() => {this.pressCheckBox()}}>
                <Text style={styles.headerText}>
                   {text}
                </Text>
            </TouchableOpacity>
        )
    };
    handleRefresh = () => {
        this.setState({
            //сделал так чтобы хоть что-то менялось визуально
            page: this.state.page + 1,
            refreshing: true,
        }, this.getData)
    };
    render() {

        return (
            this.state.listItems.length ?
                <View>


                    {this.renderHeader()}
                    <FlatList
                        style={styles.container}
                        data={this.state.listItems}
                        renderItem={this.renderRow}
                        // @ts-ignore
                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={this.handleLoadMore}
                        onEndReachedThereshold={0}
                        refreshing={this.state.refreshing}
                        ListFooterComponent={this.renderFooter}
                        onRefresh={this.handleRefresh}
                    />
                </View>

                :
                <EmptyList/>
        );
    }
}

const styles = StyleSheet.create({
    header:{
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    container: {
        marginTop: 20,
        backgroundColor: '#a3cad1'
    },
    loader:{
        marginTop: 10,
        alignItems: 'center'
    },
    item:{
        borderBottomColor: '#ececec',
        borderBottomWidth: 1,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'column'
    },
    itemTitle:{
        height:30,
        paddingLeft: 30,
        fontSize: 14,
        fontWeight: 'bold',
    },
    itemBody:{
        fontSize: 14,
        padding:5,
    }


});