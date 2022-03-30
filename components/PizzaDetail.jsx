import React from 'react'
import { View, Text, Image, StyleSheet, Button } from 'react-native'

const PizzaDetail = ({ route, navigation }) => {
    const pizza = route.params.pizza
    return (
        <View style={styles.container}>
            <Image
                style={styles.img}
                source={{ uri: 'https://static.cuisineaz.com/400x320/i96018-pizza-reine.jpg' }}
            />
            <Text>Nom Pizza</Text>
            <Text>Prix: 11€</Text>
            <Text>Ingedients:</Text>
            <View style={[styles.main, styles.liste]}>
                {pizza.ingredients.map(
                    (ingredient, index) =>
                        <Text key={index}>{ingredient}</Text>
                )
                }
            </View>
            <Button title='Retour' onPress={() => navigation.goBack()} />
        </View>
    );

}
export default PizzaDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    liste: {
        borderWidth: 1,
        borderRadius: 30,
        borderColor: 'black',
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        flex: 0


    },
    img: {

        width: 50,
        height: 50
    }

})
