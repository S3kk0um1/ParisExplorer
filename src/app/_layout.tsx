import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { createContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

SplashScreen.preventAutoHideAsync();
type FavoritesContextType = {
    favorites : string[],
    toggleFavorite : (id:string)=>void
}
export const FavoritesContext = createContext<FavoritesContextType>({favorites:[],toggleFavorite :()=>{}});


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const[favorites,setFavorites] = useState<string[]>([]);
  function toggleFavorite(id : string){
        if(favorites.includes(id)){
            setFavorites(favorites.filter(el=> el != id ))
        }else{
            setFavorites([...favorites,id])
        }
    }
    useEffect(()=>{AsyncStorage.setItem("favorites", JSON.stringify(favorites))},[favorites])
    useEffect(()=>{AsyncStorage.getItem("favorites").then((elements)=>{setFavorites(JSON.parse(elements ?elements:"[]"))})},[])


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <FavoritesContext.Provider value = {{ favorites, toggleFavorite }}><Stack /></FavoritesContext.Provider>
    </ThemeProvider>
  );
}
