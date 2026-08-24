import { useContext, useEffect, useState } from 'react';
import { FavoritesContext } from "../app/_layout";

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
export function useLocations(){
    const [locations,setLocations]= useState<LocationData[]>([] );
    const [isLoading,setIsLoading]= useState(true)
    const [error,setError]= useState<null|string>(null)
    const [offset,setOffset]= useState(0)
    const { favorites, toggleFavorite } = useContext(FavoritesContext);
    function loadMore() {
        console.log("loadMore")
        setOffset(offset+20)
    }
    
    const  fetchLocations = ()=> {
        setIsLoading(true);
        
        return  fetch(`https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20&offset=${offset}`).
                then(response => response.json()).
                then((data) =>{let tempLocations =
                    data["results"].map((item :any) =>
                        ({id :item.id,title:item.title,description : item.lead_text,eventUrl:item.url,startDate : item.date_start,endDate : item.date_end,imageUrl:item.cover_url,address : item.address_street+" "+item.address_zipcode+" "+item.address_city }));
                    if(offset!=0){
                    setLocations(prevLocations=>[...prevLocations, ...tempLocations]);setIsLoading(false)}
                    else{
                        setLocations([...tempLocations]);setIsLoading(false)
                    }


                }).catch(err =>{
                    setError("Failed to fetch data")
                    setIsLoading(false)
                })
    }
    useEffect(()=>{fetchLocations()},[offset])

    
    return {locations,isLoading,error,fetchLocations,loadMore,setOffset,setError  }
        
}