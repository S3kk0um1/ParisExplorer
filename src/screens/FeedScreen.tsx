import { Link } from 'expo-router';
import { useContext, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FavoritesContext } from "../app/_layout";
import LocationCard from "../components/LocationCard";
import { useLocations } from '../hooks/useLocations';
 





export default function FeedScreen(){
    const {locations,isLoading,error,fetchLocations,loadMore,setOffset,setError} = useLocations()

    const [searchQuery,setSearchQuery] = useState("")
    
    const [isRefreshing,setIsRefreshing] = useState(false)
    const { favorites, toggleFavorite } = useContext(FavoritesContext);

    
    async function  handleRefresh(){
        setIsRefreshing(true);
        setOffset(0)
        setError(null);
        await fetchLocations();
        setIsRefreshing(false);
    }
    const filteredLocations = locations.filter(el => el.title.toLowerCase().includes(searchQuery.toLowerCase()))

    if(error){
        return <ScrollView refreshControl= {<RefreshControl refreshing ={isRefreshing} onRefresh={handleRefresh} />}>
          <Text>{error}</Text>  
        </ScrollView>
    }

    if(!(isLoading && locations.length==0)){

    return (
        <View style={{ flex: 1 }}>
            <Link href="/favorites" style = {styles.favoritesLink}>Mes Favoris ⭐</Link>
            <TextInput  value={searchQuery} onChangeText={setSearchQuery} placeholder="Rechercher parmi les événements chargés" style={styles.searchInput}/>
            <FlatList 
                data= {filteredLocations}
                renderItem={({item})=><LocationCard  {...item} isFavorite = {favorites.includes(item.id.toString())} toggleFavorite={toggleFavorite}></LocationCard> }
                keyExtractor={(item) => item.id.toString()} 
                refreshControl= {<RefreshControl refreshing ={isRefreshing} onRefresh={handleRefresh} />}
                ListEmptyComponent = {<View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>Aucun résultat</Text>
                    <Text style={styles.emptyDescription}>Essaie un autre mot-clé parmi les événements chargés.</Text>
                    {searchQuery.length > 0 && <TouchableOpacity style={styles.clearButton} onPress={()=>setSearchQuery("")}><Text style={styles.clearButtonText}>Effacer la recherche</Text></TouchableOpacity>}
                    </View>
                }
                onEndReached = {loadMore}
                ListFooterComponent= { isLoading ? <ActivityIndicator size="large"/>:null}
                >
            </FlatList>

                
        </View>
    )
    }   else{

        return <View style={styles.loadingContainer}><ActivityIndicator/></View>
    }
};

const styles = StyleSheet.create({
    searchInput : {
        minHeight:48,
        margin: 16,
        padding : 12,
        backgroundColor :"white",
        borderWidth :1,
        borderColor : "#D1D5DB",
        borderRadius :12
        
    },
    favoritesLink : {
        color : "#1D4ED8",
        fontSize :16,
        marginHorizontal:16,
        padding : 12,
        fontWeight:"600"

    },
    emptyContainer:{
        padding:24
    },
    emptyTitle:{
        fontSize: 18,
        fontWeight: "600", 
        textAlign: "center"
    },
    emptyDescription:{
        fontSize: 14,
        color: "#4B5563", 
        textAlign: "center", 
        marginTop: 8
    },
    clearButton:{
        padding: 12, 
        marginTop: 8, 
        alignSelf: "center"
    },
    clearButtonText:{
        color: "#1D4ED8", 
        fontSize: 16, 
        fontWeight: "600"
    },
    loadingContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})