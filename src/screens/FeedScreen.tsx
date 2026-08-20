import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import LocationCard from "../components/LocationCard";
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

export default function FeedScreen(){
    const [locations,setLocations]= useState<LocationData[]>([] );
    const [isLoading,setIsLoading]= useState(true)
    const [error,setError]= useState<null|string>(null)
    useEffect(()=> {
        fetch("https://jsonplaceholder.typicode.com/users").
                then(response => response.json()).
                then((data) =>{let tempLocations = data.map(
                    (item : {id : number , name : string}) => ({...item,rating : 4,imageUrl:`https://picsum.photos/seed/${item.id}/400/200`}))
                    setLocations(tempLocations);setIsLoading(false)
                }).catch(err =>{
                    setError("Failed to fetch data")
                    setIsLoading(false)
                })
    },[])

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
            >

            </FlatList>
        </View>
    )
    }   else{

        return <View><ActivityIndicator/></View>
    }
}