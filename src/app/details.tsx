import { Stack, useLocalSearchParams } from 'expo-router';
import { useContext } from 'react';
import { Alert, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FavoritesContext } from "../app/_layout";

export default function DetailsScreen(){
    const { id,title,description,eventUrl,startDate,endDate,imageUrl,address }  = useLocalSearchParams();
    const { favorites, toggleFavorite } = useContext(FavoritesContext);
    const isFavorite=favorites.includes(id.toString())

    async function handleOpenWebsite(){
        if(typeof eventUrl ==='string' && eventUrl.length !=0){ 

            try{
                await Linking.openURL(eventUrl)
            } catch {
                Alert.alert("Impossible d’ouvrir le lien")
            }
        }
         
    }
    return(
        <>
        <Stack.Screen options={{title : "Détails"}}/>
            <ScrollView style={styles.infoContainer} contentContainerStyle={styles.infoContent}>
                <View style={styles.topContainer}>
                    <Text style={styles.title}>{ title}</Text>
                    <TouchableOpacity style={styles.favoriteButton} onPress={()=>toggleFavorite(id.toString())}><Text style={[styles.favoriteIcon, { color: isFavorite ? '#DC2626' : '#4B5563' }]}>{isFavorite ? '♥' : '♡'}</Text></TouchableOpacity>
                
                </View>
                
                <Image resizeMode="contain" style={styles.image} source={{uri : imageUrl.toString()}}></Image>
                <Text style={styles.label}>Site web : </Text>
                <View style={styles.details}>{eventUrl?
                 <TouchableOpacity onPress={handleOpenWebsite} style={{paddingVertical:12}}><Text style={{color:"#1D4ED8",fontWeight:"600"}}>{"Consulter le site de l’événement"}</Text></TouchableOpacity>
                 :<Text>Lien non disponible</Text>}</View>
                <View style={styles.divider}/>
                <Text style={styles.label}>Date de début : </Text>
                <Text style={styles.details}>{ startDate ? new Date(startDate.toString()).toLocaleDateString():"Date non renseignée" } </Text>
                <View style={styles.divider}/>
                <Text style={styles.label}>Date de fin : </Text>
                <Text style={styles.details}>{endDate? new Date(endDate.toString()).toLocaleDateString():"Date non renseignée" } </Text>
                <View style={styles.divider}/>

                <Text style={styles.label}>Adresse : </Text>
                <Text style={styles.details}>{address?address:"Adresse non renseignée"} </Text>
                <View style={styles.divider}/>

                <Text style={styles.label}>Description : </Text>
                <Text style = {styles.descriptionText}>{description ? description : "Aucune description disponible"}</Text>
            </ScrollView>
    </>
     )
        
    
};
const styles = StyleSheet.create({
    topContainer:{
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 16
    },
    image: {
        width : '100%',
        height : 300,
        marginBottom : 20,
        borderRadius: 25
    },
    title: {
        flex : 1,
        marginRight:12,
        fontSize :20,
        fontWeight :"bold"
        
    },
    favoriteButton : {
        borderRadius: 24,
        width:48,
        height:48,
        backgroundColor:'#FFFFFF',
        justifyContent:'center',
        alignItems:'center'

    },
    favoriteIcon:{
        fontSize: 26
    },
    infoContainer : {
        flex: 1
    },
    infoContent :{
        padding: 16,
        paddingBottom: 3

    },
    details : {
        
        marginBottom : 12
    },
    label : {
        fontWeight : 'bold',
        marginBottom: 4
    },
    divider : {
        height:1,
        backgroundColor : '#cccccc',
        
        marginBottom : 16
        
    },
    descriptionText : {
        lineHeight : 23
    }

})