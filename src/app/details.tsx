import { Stack, useLocalSearchParams } from 'expo-router';
import { useContext } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FavoritesContext } from "../app/_layout";

export default function DetailsScreen(){
    const { id,title,description,eventUrl,startDate,endDate,imageUrl,address }  = useLocalSearchParams();
    const { favorites, toggleFavorite } = useContext(FavoritesContext);
    return(
        <>
        <Stack.Screen options={{title : title.toString()}}/>
            <ScrollView style={styles.infoContainer}>
                <Text style={styles.title}>{ title}</Text>
                <TouchableOpacity onPress={()=>toggleFavorite(id.toString())}><Text>{favorites.includes(id.toString()) ? '❤️' : '🤍'}</Text></TouchableOpacity>
                
                <Image style={styles.image} source={{uri : imageUrl.toString()}}></Image>
                <Text style={styles.label}>Site web : </Text>
                <Text style={styles.details}>{eventUrl} </Text>
                <View style={styles.divider}/>
                <Text style={styles.label}>Date de début : </Text>
                <Text style={styles.details}>{ new Date(startDate.toString()).toLocaleDateString() } </Text>
                <View style={styles.divider}/>
                <Text style={styles.label}>Date de fin : </Text>
                <Text style={styles.details}>{new Date(endDate.toString()).toLocaleDateString() } </Text>
                <View style={styles.divider}/>

                <Text style={styles.label}>Adresse : </Text>
                <Text style={styles.details}>{address} </Text>
                <View style={styles.divider}/>

                <Text style={styles.label}>Description : </Text>
                <Text style = {styles.descriptionText}>{description}</Text>
        </ScrollView>
    </>
     )
        
    
};
const styles = StyleSheet.create({
    image: {
        width : '100%',
        height : 300,
        marginBottom : 20,
        borderRadius: 25
    },
    title: {
        fontSize :20,
        fontWeight :"bold",
         marginBottom : 10
    },
    infoContainer : {
        padding : 16
    },
    details : {
        
        marginBottom : 7
    },
    label : {
        fontWeight : 'bold'
    },
    divider : {
        height:1,
        backgroundColor : '#cccccc',
        
        marginBottom : 10
        
    },
    descriptionText : {
        lineHeight : 23
    }

})