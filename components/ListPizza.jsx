import React from 'react'
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Pizza from '../assets/pizzas.json'

const ListPizza = ({ navigation }) => {
    const renduListPizza = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.view}
                onPress={() => navigation.navigate('pizzaDetail')}
            >
                <Image style={styles.img} source={{ uri: item.imageUrl }} />
                <Text style={styles.txt}>{item.nom} {item.prix}€</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View>
            <FlatList
                data={Pizza}
                renderItem={renduListPizza}
                keyExtractor={item => item.nom}

            />
        </View>
    );

}
const styles = StyleSheet.create({
    img: {
        width: 50,
        height: 50
    },
    view: {
        flexDirection: 'row',
        padding: 10,
    },
    txt: {
        marginLeft: 20,
        paddingTop: 10
    }
});
export default ListPizza