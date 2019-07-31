import {AsyncStorage} from "react-native";

export function request(page: number){
    const url = 'https://jsonplaceholder.typicode.com/posts?_limit=10&_page='+page;
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((response) => response.json())
}

export enum StorageActions {
    SAVE = 'save',
    DELETE = 'delete',
    GET = 'get',
}

export function storage(action: StorageActions, key:string, value:any = null){
    switch(action){
        case StorageActions.SAVE:
             AsyncStorage.setItem(key, value).then();
             break;
        case StorageActions.DELETE:
            AsyncStorage.removeItem(key).then();
            break;
    }
}
export function storageGet(key:string){
    return AsyncStorage.getItem(key);
}