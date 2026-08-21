import { useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";
import LocationCard from "../components/LocationCard";
import { useLocations } from '../hooks/useLocations';
const DUMMY_DATA = [
    { id: '1', name: 'Central Park', rating: 4.8, imageUrl: 'https://picsum.photos/400/200' },
    { id: '2', name: 'City Museum', rating: 4.5, imageUrl: 'https://picsum.photos/400/201' },
    { id: '3', name: 'Downtown Cafe', rating: 4.2, imageUrl: 'https://picsum.photos/400/202' },
    ];
type LocationData = {
    id: number | string,
    name: string,
    rating: number,
    imageUrl: string
    };


const {locations,isLoading,error,fetchLocations} = useLocations()
export default function FeedScreen(){
    
    const [isRefreshing,setIsRefreshing] = useState(false)
    

    

    async function  handleRefresh(){
        setIsRefreshing(true);
        await fetchLocations();
        setIsRefreshing(false);
    }

    if(error){
        return <View>
          <Text>{error}</Text>  
        </View>
    }

    if(!isLoading){

    return (
        <View>
            <FlatList 
            data= {locations}
            renderItem={({item})=><LocationCard name={item.name} rating={item.rating} imageUrl={item.imageUrl}></LocationCard> }
            keyExtractor={(item) => item.id.toString()} 
            refreshControl= {<RefreshControl refreshing ={isRefreshing} onRefresh={handleRefresh} />}
            >

            </FlatList>
        </View>
    )
    }   else{

        return <View><ActivityIndicator/></View>
    }
}