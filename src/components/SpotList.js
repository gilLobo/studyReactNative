import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';

import api  from '../services/api';

/* 
    import { withNavigation } from 'react-navigation' -> Foi necessário utilizar porque esse componente não
    é uma página. Por tanto por padrão não tem acesso a propriedade navigation dentro da função spotList()

    Para fazer a navegação basta importar o withNavigation e criar a função sem o export default e no final,
    exportar passando a função SpotList como parametro da withNavigation.

    Ex: export default withNavigation(SpotList);
*/
function SpotList({ tech, navigation }) {
    const [spots, setSpots] = useState([]);
    const ipLocal = '192.168.0.28';

    useEffect(() => {
        async function loadSpot() {
            const response = await api.get('/spots', {
                params: { tech }
            })

            setSpots(response.data);
        }

        loadSpot();
    }, []);

    /*Para passar parametros para outra tela.
        1. Criasse a função que recebe os parametros
        2. Passa os parametros como objeto na função navigate.
    */
    function handleNavigation(id) {
        navigation.navigate('Book', { id });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Empresas que usam <Text style={styles.bold}>{tech}</Text>
            </Text>

            {/* Componente para listagem do react */}
            <FlatList 
                style={styles.list}
                // Data contem o array para exibir a lista
                data={spots}
                // KeyExtractor recebe uma função, então indicamos o elemento unico de cada spot
                keyExtractor={spot => spot._id}
                // indica que sera uma listagem na horizontal
                horizontal
                // Não exibir a barra de rolagem
                showsHorizontalScrollIndicator={false}
                // Recebe uma função e podemos pegar o item desestruturando e retorno o jsx utilizando dentro do ()
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        {/* O source como recebe uma url é necessário passar como um objeto utilizando a key 'uri:' */}
                        <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url.replace('localhost', ipLocal) }} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'GRATUITO'}</Text>
                        {/* Para passar parametros para outra tela.
                            1. Criasse a função que chamará a função de navegação com os parametros sendo passado
                            quando for clicado no botão.
                        */}
                        <TouchableOpacity onPress={() => handleNavigation(item._id)} style={styles.button}>
                            <Text style={styles.buttonText}>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },

    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15,
    },

    bold: {
        fontWeight: 'bold'
    },

    list: {
        paddingHorizontal: 20,
    },

    listItem: {
        marginRight: 15,
    },

    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2,
    },

    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },

    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5,
    },

    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,
        marginBottom: 10,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    }
});

export default withNavigation(SpotList);
