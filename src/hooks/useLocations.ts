import { useEffect, useState } from 'react';

type LocationData = {
  id: number | string,
  name: string,
  rating: number,
  imageUrl: string
};
export function useLocations(){
    const [locations,setLocations]= useState<LocationData[]>([] );
    const [isLoading,setIsLoading]= useState(true)
    const [error,setError]= useState<null|string>(null)
    
    const  fetchLocations = ()=> {
        return  fetch("https://jsonplaceholder.typicode.com/users").
                then(response => response.json()).
                then((data) =>{let tempLocations = data.map(
                    (item : {id : number , name : string}) => ({...item,rating : 4,imageUrl:`https://picsum.photos/seed/${item.id}/400/200`}))
                    setLocations(tempLocations);setIsLoading(false)
                }).catch(err =>{
                    setError("Failed to fetch data")
                    setIsLoading(false)
                })
    }
    useEffect(()=>{fetchLocations()},[])
    return {locations,isLoading,error,fetchLocations  }
        
}