import { useEffect, useState } from 'react';

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
    
    const  fetchLocations = ()=> {
        return  fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20").
                then(response => response.json()).
                then((data) =>{let tempLocations = data["results"].map(
                    (item :any) => ({id :item.id,title:item.title,description : item.lead_text,eventUrl:item.url,startDate : item.date_start,endDate : item.date_end,imageUrl:item.cover_url,address : item.address_street+" "+item.address_zipcode+" "+item.address_city }));
                    setLocations(tempLocations);setIsLoading(false)
                }).catch(err =>{
                    setError("Failed to fetch data")
                    setIsLoading(false)
                })
    }
    useEffect(()=>{fetchLocations()},[])
    return {locations,isLoading,error,fetchLocations  }
        
}