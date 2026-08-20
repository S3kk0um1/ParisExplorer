import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type LocationCardProps = {
    name: string;
    rating: number;
    imageUrl : string
};

export default function LocationCard({name,rating,imageUrl} : LocationCardProps){
    const router = useRouter();
    return (
        
        <TouchableOpacity style={styles.card} onPress={() =>{ console.log("Card was tapped!");router.push({pathname: "/details",
    params: { name, rating, imageUrl }})}}>
            <Image style={styles.image} source={{uri : imageUrl}}>
                
            </Image>
            <View style={styles.infoLocation}>
                <Text>
                    {name}
                </Text>
                <Text>
                    {rating}
                </Text>
            </View>
            
            
        </TouchableOpacity>
    )
    
};

const styles = StyleSheet.create({
    card : {
        
        
        backgroundColor: '#eeeeee',   
        padding: 16,
    },
    image : {
        width : '50%',
        height : 200
    },
    infoLocation:{
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
})