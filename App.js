import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import ListPizza from './components/ListPizza';
import PizzaDetail from './components/PizzaDetail';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import { USER_KEY, getData, TOKEN_KEY } from './service/storageService';

const Stack = createNativeStackNavigator()



export const UserContext = React.createContext({
  token: {
    value: '',
    setValue: (value) => { }
  },
  username: {
    value: '',
    setValue: (value) => { }
  }
})

export default function App() {
  const [token, setToken] = React.useState('')
  const [username, setUsername] = React.useState('')
  const contextValue = {
    token: {
      value: token,
      setValue: setToken
    },
    username: {
      value: username,
      setValue: setUsername
    }
  }

  React.useEffect(async () => {
    const usernameStorage = await getData(USER_KEY)
    const tokenStorage = await getData(TOKEN_KEY)
    setUsername(usernameStorage)
    setToken(tokenStorage)
  }, [])

  return (
    <NavigationContainer>
      <UserContext.Provider value={contextValue}>
        <Stack.Navigator >
          {
            (token && username) ?
              (
                <>
                  <Stack.Screen name='home'>
                    {
                      (props) => {
                        return (
                          <SafeAreaView style={styles.container} >
                            <ListPizza {...props} />
                          </SafeAreaView>
                        )
                      }
                    }
                  </Stack.Screen>
                  <Stack.Screen name="pizzaDetail" component={PizzaDetail} />
                </>
              )

              :

              <Stack.Screen name="login" component={Login} />
          }
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  volume: {
    width: 50,
    height: 50,
    backgroundColor: 'black'
  }
});
