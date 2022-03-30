import AsyncStorage from '@react-native-async-storage/async-storage';

export const USER_KEY = 'user'
export const TOKEN_KEY = 'token'

export async function storeData(key, value) {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        console.log(e)
        return false
    }

    return true
}

export async function getData(key) {
    try {
        const valueStorage = await AsyncStorage.getItem(key)
        const jsonValue = JSON.parse(valueStorage)

        return jsonValue || null
    } catch (error) {
        console.log(error)
        return false
    }

}