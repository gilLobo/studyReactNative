import React, { useState, useEffect }  from 'react';
import { SafeAreaView, View, AsyncStorage, Image, StyleSheet } from 'react-native';

import SpotList from '../components/SpotList'
import logo from '../../assets/logo.png';

export default function List() {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(techs => {
            const techsArray = storageTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <SpotList tech="ReactJS" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 30,
    }
});