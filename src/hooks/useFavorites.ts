// hooks/useFavorites.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function useFavorites() {
    const[favorites,setFavorites] = useState<string[]>([]);
    const [isLoading,setIsLoading]= useState(true)
    function toggleFavorite(id : string){
        if(favorites.includes(id)){
            setFavorites(favorites.filter(el=> el != id ))
        }else{
            setFavorites([...favorites,id])
        }
    }
    useEffect(()=>{if(!isLoading) AsyncStorage.setItem("favorites", JSON.stringify(favorites))},[favorites,isLoading])
    useEffect(()=>{
        AsyncStorage.getItem("favorites").then((elements)=>{setFavorites(JSON.parse(elements ?elements:"[]"));setIsLoading(false)});
         
},[])
    return {favorites,toggleFavorite,isLoading}
}