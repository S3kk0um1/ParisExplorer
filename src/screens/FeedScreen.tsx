import { Link } from 'expo-router';
import { useContext, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, Text, TextInput, View } from "react-native";
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
            <Link href="/favorites">Mes Favoris ⭐</Link>
            <TextInput value={searchQuery} onChangeText={setSearchQuery} placeholder="Search locations"/>
            <FlatList 
                data= {filteredLocations}
                renderItem={({item})=><LocationCard  {...item} isFavorite = {favorites.includes(item.id.toString())} toggleFavorite={toggleFavorite}></LocationCard> }
                keyExtractor={(item) => item.id.toString()} 
                refreshControl= {<RefreshControl refreshing ={isRefreshing} onRefresh={handleRefresh} />}
                ListEmptyComponent = {<Text>No locations found.</Text>}
                onEndReached = {loadMore}
                ListFooterComponent= { isLoading ? <ActivityIndicator size="large"/>:null}
                >
            </FlatList>

                
        </View>
    )
    }   else{

        return <View><ActivityIndicator/></View>
    }
}