import { useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, TextInput, View } from "react-native";
import LocationCard from "../components/LocationCard";
import { useLocations } from '../hooks/useLocations';

type LocationData = {
  id: number | string,
  title: string,
  description : string,
  eventUrl : string,
  startDate : string,
  endDate : string,
  imageUrl: string,
  address : string
};




export default function FeedScreen(){
    const {locations,isLoading,error,fetchLocations} = useLocations()

    const [searchQuery,setSearchQuery] = useState("")
    
    const [isRefreshing,setIsRefreshing] = useState(false)
    
    async function  handleRefresh(){
        setIsRefreshing(true);
        await fetchLocations();
        setIsRefreshing(false);
    }
    const filteredLocations = locations.filter(el => el.title.toLowerCase().includes(searchQuery.toLowerCase()))

    if(error){
        return <View>
          <Text>{error}</Text>  
        </View>
    }

    if(!isLoading){

    return (
        <View>
            <TextInput value={searchQuery} onChangeText={setSearchQuery} placeholder="Search locations"/>
                <FlatList 
                data= {filteredLocations}
                renderItem={({item})=><LocationCard  {...item}></LocationCard> }
                keyExtractor={(item) => item.id.toString()} 
                refreshControl= {<RefreshControl refreshing ={isRefreshing} onRefresh={handleRefresh} />}
                ListEmptyComponent = {<Text>No locations found.</Text>}
                >

                </FlatList>
        </View>
    )
    }   else{

        return <View><ActivityIndicator/></View>
    }
}