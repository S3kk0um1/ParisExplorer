import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { createContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import useFavorites from '../hooks/useFavorites';

SplashScreen.preventAutoHideAsync();
type FavoritesContextType = {
    favorites : string[],
    toggleFavorite : (id:string)=>void
}
export const FavoritesContext = createContext<FavoritesContextType>({favorites:[],toggleFavorite :()=>{}});


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {favorites, toggleFavorite,isLoading} = useFavorites();
  useEffect(()=>{if(!isLoading){SplashScreen.hideAsync()}},[isLoading]) 

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <FavoritesContext.Provider value = {{ favorites, toggleFavorite }}><Stack /></FavoritesContext.Provider>
    </ThemeProvider>
  );
}
