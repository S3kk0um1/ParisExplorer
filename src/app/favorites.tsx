import { useContext } from 'react';
import { FlatList, Text } from "react-native";
import { FavoritesContext } from "../app/_layout";
import LocationCard from "../components/LocationCard";
import { useLocations } from '../hooks/useLocations';

export default function FavoritesScreen(){
    const { favorites, toggleFavorite } = useContext(FavoritesContext);
    const {locations,isLoading,error,fetchLocations,loadMore,setOffset,setError} = useLocations()

    const favoritesLocations = locations.filter(el => favorites.includes(el.id.toString()))

    return <FlatList
    data = {favoritesLocations}
    renderItem={({item})=><LocationCard  {...item} isFavorite = {favorites.includes(item.id.toString())} toggleFavorite={toggleFavorite}></LocationCard> }
    keyExtractor={(item) => item.id.toString()} 
    ListEmptyComponent = {<Text>No favorites found.</Text>}
    >

    </FlatList>
}