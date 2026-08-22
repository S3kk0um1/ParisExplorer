import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

export default function LocationCard({id,title,description,eventUrl,startDate,endDate,imageUrl,address} : LocationData){
    const router = useRouter();
    return (
        
        <TouchableOpacity style={styles.card} onPress={() =>{ console.log("Card was tapped!");router.push({pathname: "/details",
    params: {id,title,description,eventUrl,startDate,endDate,imageUrl,address}})}}>
            <Image style={styles.image} source={{uri : imageUrl}}>
                
            </Image>
            <View style={styles.infoLocation}>
                <Text>
                    {title}
                </Text>
                
            </View>
            
            
        </TouchableOpacity>
    )
    
};

const styles = StyleSheet.create({
    card : {
        
        
        backgroundColor: '#eeeeee',
        elevation: 3,
        marginBottom: 20,
        borderRadius: 25,
       marginHorizontal: 10

    },
    image : {
        width : '100%',
        height : 200,
        borderRadius: 25,
        
    },
    infoLocation:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 16
    }
})