import React from 'react'
import { StackActions } from '@react-navigation/native';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native'
import { USER_KEY, storeData, TOKEN_KEY } from '../service/storageService'
import { UserContext } from '../App';
import jwtDecode from 'jwt-decode'

export default function Login({ navigation }) {
    const [email, majEmail] = React.useState('user@ex.com')
    const [pwd, majPwd] = React.useState('user')
    const context = React.useContext(UserContext)
    console.log(email, pwd)
    const submit = () => {
        // const url = `http://10.113.129.188:3000/user?email=${email}&password=${pwd}`
        const url = `http://10.113.129.188:8000/api/login_check`
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({ username: email, password: pwd }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then(async (data) => {
                if (data && data.token) {
                    context.token.setValue(data.token)

                    const decoded = jwtDecode(data.token)
                    context.username.setValue(decoded.username)

                    await storeData(USER_KEY, decoded.username)
                    await storeData(TOKEN_KEY, data.token)

                    // navigation.dispatch(StackActions.replace('home'))
                } else {

                }
            })
    }
    return (
        <View>
            <Text>Login</Text>
            <TextInput
                style={styles.input}
                onChangeText={majEmail}
                value={email}
                keyboardType='email-address'
            />
            <TextInput
                style={styles.input}
                onChangeText={majPwd}
                value={pwd}
                secureTextEntry={true}
            />
            <Button title='Connexion' onPress={submit} />
            {
                (context.token.value) && (
                    <Button title='inscription' onPress={() => console.log('press')} />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderColor: 'black',
        borderWidth: 1,
        height: 30,
    }
})